"use client"

import { useRef, useEffect, type ReactNode } from "react"
import gsap from "gsap"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce"
    ).matches

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    gsap.set(el, { opacity: 0, y: 30 })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay,
            ease: "power3.out",
          })
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: "-40px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
