"use client"

import { useRef, useEffect, useCallback } from "react"

export function HeroGridBg() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  const updateGlow = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const { x, y } = mouseRef.current
    el.style.setProperty("--mx", `${x}px`)
    el.style.setProperty("--my", `${y}px`)
    rafRef.current = 0
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateGlow)
      }
    }
    const onLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateGlow)
      }
    }

    el.addEventListener("mousemove", onMove, { passive: true })
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [updateGlow])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none animate-[gridFadeIn_1.5s_ease-out_forwards]"
      style={{ "--mx": "-1000px", "--my": "-1000px", opacity: 0 } as React.CSSProperties}
    >
      {/* Primary grid — 1px lines, 60px spacing */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--foreground) 1px, transparent 1px),
            linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.06,
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 80%)",
        }}
      />
      {/* Secondary finer grid — half spacing */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--foreground) 1px, transparent 1px),
            linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          opacity: 0.025,
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 30%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 30%, black 20%, transparent 70%)",
        }}
      />
      {/* Mouse-following accent glow */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `
            radial-gradient(400px circle at var(--mx) var(--my), oklch(0.546 0.197 254.1 / 0.08), transparent 60%),
            radial-gradient(200px circle at var(--mx) var(--my), oklch(0.546 0.197 254.1 / 0.04), transparent 50%)
          `,
        }}
      />
      {/* Top fade for smooth transition */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
