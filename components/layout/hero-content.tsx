"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"
import gsap from "gsap"

export function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const els = {
      badge: container.querySelector("[data-anim=badge]"),
      title: container.querySelector("[data-anim=title]"),
      subtitle: container.querySelector("[data-anim=subtitle]"),
      cta: container.querySelectorAll("[data-anim=cta]"),
      stats: container.querySelectorAll("[data-anim=stat]"),
    }

    const allElements = [
      els.badge,
      els.title,
      els.subtitle,
      ...Array.from(els.cta),
      ...Array.from(els.stats),
    ].filter(Boolean)

    if (reducedMotion) {
      gsap.set(allElements, { opacity: 1, y: 0 })
      return
    }

    // Set initial state
    gsap.set(allElements, { opacity: 0, y: 20 })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          // Ensure final state is maintained
          gsap.set(allElements, { opacity: 1, y: 0 })
        },
      })

      tl.to(els.badge, { opacity: 1, y: 0, duration: 0.5 })
        .to(els.title, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
        .to(els.subtitle, { opacity: 1, y: 0, duration: 0.5 }, "-=0.35")
        .to(els.cta, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, "-=0.3")
        .to(els.stats, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 }, "-=0.2")
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative z-10 text-center max-w-3xl mx-auto px-6 md:px-8"
    >
      {/* Status badge */}
      <div
        data-anim="badge"
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-background/60 backdrop-blur-sm mb-8"
      >
        <span className="size-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-label-13 text-muted-foreground">持续更新中</span>
      </div>

      {/* Main heading */}
      <h1 data-anim="title" className="mb-6">
        <span className="block text-heading-48 md:text-heading-64 lg:text-heading-72 text-foreground">
          探索编程世界
        </span>
        <span className="block text-heading-48 md:text-heading-64 lg:text-heading-72 text-foreground/30 mt-1">
          分享技术见解
        </span>
      </h1>

      {/* Subtitle */}
      <p
        data-anim="subtitle"
        className="text-copy-18 md:text-copy-20 text-muted-foreground max-w-xl mx-auto mb-10"
      >
        从 9 年前端经验出发，探索 AI 全栈的无限可能
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
        <Link
          data-anim="cta"
          href="/blog"
          className={buttonVariants({ size: "lg" }) + " gap-2 px-6 text-button-16"}
        >
          <BookOpen className="size-4" />
          开始阅读
        </Link>
        <Link
          data-anim="cta"
          href="/projects"
          className={
            buttonVariants({ variant: "outline", size: "lg" }) +
            " gap-2 px-6 text-button-16"
          }
        >
          查看项目
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* Stats row */}
      <div className="flex justify-center gap-8 md:gap-12">
        {[
          { value: "9+", label: "年经验" },
          { value: "150+", label: "仓库" },
          { value: "600+", label: "Stars" },
          { value: "AI", label: "全栈" },
        ].map((stat) => (
          <div key={stat.label} data-anim="stat" className="text-center">
            <div className="text-heading-24 md:text-heading-32 text-foreground tabular-nums">
              {stat.value}
            </div>
            <div className="text-label-13 text-muted-foreground mt-0.5">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
