const RATE_LIMITS: Record<string, { windowMs: number; max: number }[]> = {
  "/api/contact": [
    { windowMs: 60 * 60 * 1000, max: 3 },   // 3 per hour
    { windowMs: 24 * 60 * 60 * 1000, max: 10 }, // 10 per day
  ],
  "/api/newsletter": [
    { windowMs: 60 * 60 * 1000, max: 5 },   // 5 per hour
  ],
}

export interface RateLimitResult {
  allowed: boolean
  retryAfter?: number
}

export async function checkRateLimit(
  ip: string,
  endpoint: string
): Promise<RateLimitResult> {
  const limits = RATE_LIMITS[endpoint]
  if (!limits) return { allowed: true }

  try {
    const { prisma } = await import("@/lib/prisma")

    for (const limit of limits) {
      const windowStart = new Date(Date.now() - limit.windowMs)
      const count = await prisma.rateLimit.count({
        where: {
          ip,
          endpoint,
          createdAt: { gte: windowStart },
        },
      })

      if (count > limit.max) {
        const oldestInWindow = await prisma.rateLimit.findFirst({
          where: { ip, endpoint, createdAt: { gte: windowStart } },
          orderBy: { createdAt: "asc" },
          select: { createdAt: true },
        })

        const retryAfter = oldestInWindow
          ? Math.ceil((oldestInWindow.createdAt.getTime() + limit.windowMs - Date.now()) / 1000)
          : Math.ceil(limit.windowMs / 1000)

        return { allowed: false, retryAfter }
      }
    }

    // Record this request
    await prisma.rateLimit.create({
      data: { ip, endpoint },
    })

    // Probabilistic cleanup: 5% chance to delete records older than 7 days
    if (Math.random() < 0.05) {
      const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      await prisma.rateLimit.deleteMany({
        where: { createdAt: { lt: cutoff } },
      })
    }

    return { allowed: true }
  } catch {
    // If rate limiting fails (DB unavailable), allow the request
    return { allowed: true }
  }
}
