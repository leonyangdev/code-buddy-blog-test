"use client"

import { useRef, useEffect, useState } from "react"
import { createProgramWebGL1, getCssColorAsLinearSrgb } from "@/lib/webgl-utils"

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_fg;
uniform vec3 u_accent;

void main() {
  vec2 pixel = v_uv * u_resolution;
  float scale = u_resolution.x < 600.0 ? 45.0 : 60.0;
  vec2 uv = (pixel - u_resolution * 0.5) / scale;

  vec2 r = vec2(1.0, 1.732);
  vec2 h = r * 0.5;
  vec2 a = mod(uv, r) - h;
  vec2 b = mod(uv - h, r) - h;
  vec2 gv = dot(a, a) < dot(b, b) ? a : b;

  vec2 p = abs(gv);
  float d = max(dot(p, vec2(0.57735, 1.0)), p.x);
  float edge = 1.0 - smoothstep(0.35, 0.5, d);

  vec2 mPixel = u_mouse * u_resolution;
  float mDist = length(pixel - mPixel);
  float radius = u_resolution.x < 600.0 ? 180.0 : 280.0;
  float influence = 1.0 - smoothstep(0.0, radius, mDist);
  influence *= influence;

  float baseAlpha = 0.18;
  vec3 lineColor = mix(u_fg, u_accent, influence);
  float lineAlpha = baseAlpha + influence * 0.6;

  vec3 color = lineColor * edge * lineAlpha;
  color += u_accent * influence * 0.08;
  color += u_accent * influence * 0.1 * (1.0 - edge);

  gl_FragColor = vec4(color, max(edge * lineAlpha, influence * 0.1));
}
`

export function HeroWebGLGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false })
    if (!gl) {
      setError("WebGL not supported")
      return
    }

    let program: WebGLProgram
    try {
      program = createProgramWebGL1(gl, VERT, FRAG)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Shader compile failed")
      return
    }
    gl.useProgram(program)

    // 全屏四边形
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const aPos = gl.getAttribLocation(program, "a_pos")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, "u_resolution")
    const uMouse = gl.getUniformLocation(program, "u_mouse")
    const uFg = gl.getUniformLocation(program, "u_fg")
    const uAccent = gl.getUniformLocation(program, "u_accent")

    // 鼠标状态（不经过 React）
    let mouseX = -1
    let mouseY = -1
    let hasMouse = false

    const parent = canvas.parentElement
    if (!parent) return

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      mouseX = (e.clientX - rect.left) / rect.width
      mouseY = (e.clientY - rect.top) / rect.height
      hasMouse = true
    }
    const onLeave = () => {
      hasMouse = false
    }
    parent.addEventListener("mousemove", onMove)
    parent.addEventListener("mouseleave", onLeave)

    // 尺寸
    let w = 0
    let h = 0
    const resize = () => {
      const rect = parent.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
    }
    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    resize()

    // 颜色缓存（节流更新）
    let fgColor: [number, number, number] = [0, 0, 0]
    let accentColor: [number, number, number] = [0.4, 0.4, 1]
    let lastColorUpdate = 0
    const updateColors = () => {
      const now = performance.now()
      if (now - lastColorUpdate < 200) return
      lastColorUpdate = now
      fgColor = getCssColorAsLinearSrgb("--foreground")
      accentColor = getCssColorAsLinearSrgb("--accent")
    }
    updateColors()

    // 暗色模式监听
    const themeObserver = new MutationObserver(updateColors)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    // 渲染循环
    let raf: number
    let paused = false

    const onVisibility = () => {
      paused = document.hidden
    }
    document.addEventListener("visibilitychange", onVisibility)

    const render = () => {
      raf = requestAnimationFrame(render)
      if (paused) return

      gl!.viewport(0, 0, canvas!.width, canvas!.height)
      gl!.clearColor(0, 0, 0, 0)
      gl!.clear(gl!.COLOR_BUFFER_BIT)
      gl!.enable(gl!.BLEND)
      gl!.blendFunc(gl!.SRC_ALPHA, gl!.ONE_MINUS_SRC_ALPHA)

      gl!.uniform2f(uResolution, w, h)
      gl!.uniform2f(uMouse, hasMouse ? mouseX : -1, hasMouse ? mouseY : -1)
      gl!.uniform3f(uFg, fgColor[0], fgColor[1], fgColor[2])
      gl!.uniform3f(uAccent, accentColor[0], accentColor[1], accentColor[2])

      gl!.drawArrays(gl!.TRIANGLES, 0, 6)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      parent.removeEventListener("mousemove", onMove)
      parent.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("visibilitychange", onVisibility)
      observer.disconnect()
      themeObserver.disconnect()
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 1 }}
      />
      {error && (
        <div className="absolute top-4 right-4 z-50 bg-red-500/10 border border-red-500/30 text-red-600 text-xs px-3 py-2 rounded-md font-mono">
          WebGL: {error}
        </div>
      )}
    </>
  )
}
