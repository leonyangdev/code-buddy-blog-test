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

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const els = {
      badge: container.querySelector("[data-anim=badge]"),
      title: container.querySelector("[data-anim=title]"),
      subtitle: container.querySelector("[data-anim=subtitle]"),
      cta: container.querySelectorAll("[data-anim=cta]"),
      stats: container.querySelectorAll("[data-anim=stat]"),
    }

    if (reducedMotion) {
      gsap.set([els.badge, els.title, els.subtitle, ...els.cta, ...els.stats], {
        opacity: 1,
        y: 0,
      })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from(els.badge, { opacity: 0, y: 16, duration: 0.5 })
        .from(els.title, { opacity: 0, y: 24, duration: 0.6 }, "-=0.3")
        .from(els.subtitle, { opacity: 0, y: 16, duration: 0.5 }, "-=0.35")
        .from(els.cta, { opacity: 0, y: 16, duration: 0.4, stagger: 0.08 }, "-=0.3")
        .from(els.stats, { opacity: 0, y: 12, duration: 0.4, stagger: 0.06 }, "-=0.2")
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
        <span className="text-label-13 text-muted-foreground">
          持续更新中
        </span>
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
        专注于 Web 开发、前端工程化和用户体验设计
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
          { value: "50+", label: "文章" },
          { value: "10+", label: "项目" },
          { value: "20+", label: "技术栈" },
          { value: "1K+", label: "读者" },
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
