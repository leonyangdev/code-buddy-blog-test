"use client"

import { HeroContent } from "./hero-content"
import { HeroGridBg } from "./hero-grid-bg"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <HeroGridBg />
      <HeroContent />
    </section>
  )
}
