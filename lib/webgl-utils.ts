/**
 * WebGL shader 编译和颜色转换工具
 */

export function createProgramWebGL1(
  gl: WebGLRenderingContext,
  vsSource: string,
  fsSource: string
): WebGLProgram {
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)
    if (!shader) throw new Error("Failed to create shader")
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader)
      gl.deleteShader(shader)
      throw new Error(`Shader compile error: ${info ?? "unknown"}`)
    }
    return shader
  }

  const vs = compile(gl.VERTEX_SHADER, vsSource)
  const fs = compile(gl.FRAGMENT_SHADER, fsSource)

  const program = gl.createProgram()
  if (!program) throw new Error("Failed to create program")

  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    gl.deleteShader(vs)
    gl.deleteShader(fs)
    throw new Error(`Program link error: ${info}`)
  }

  gl.deleteShader(vs)
  gl.deleteShader(fs)
  return program
}

/**
 * 从 CSS 变量读取颜色并转为线性 sRGB [0,1]
 * 使用隐藏 div 读 getComputedStyle，避免解析 oklch 字符串
 */
let hiddenDiv: HTMLDivElement | null = null

function getHiddenDiv(): HTMLDivElement {
  if (!hiddenDiv) {
    hiddenDiv = document.createElement("div")
    hiddenDiv.style.cssText =
      "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;visibility:hidden"
    document.body.appendChild(hiddenDiv)
  }
  return hiddenDiv
}

function srgbToLinear(v: number): number {
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
}

export function getCssColorAsLinearSrgb(
  property: string
): [number, number, number] {
  const div = getHiddenDiv()
  div.style.color = `var(${property})`
  const computed = getComputedStyle(div).color

  // 解析 "rgb(r, g, b)" 或 "rgba(r, g, b, a)"
  const match = computed.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/
  )
  if (match) {
    const r = srgbToLinear(parseFloat(match[1]) / 255)
    const g = srgbToLinear(parseFloat(match[2]) / 255)
    const b = srgbToLinear(parseFloat(match[3]) / 255)
    return [r, g, b]
  }

  // fallback: 黑色
  return [0, 0, 0]
}
