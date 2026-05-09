"use client"

import type { ContributionDay } from "@/lib/github"

interface GitHubContributionsProps {
  contributions: ContributionDay[]
}

export function GitHubContributions({ contributions }: GitHubContributionsProps) {
  if (contributions.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground text-copy-14">
        暂无法加载贡献数据
      </div>
    )
  }

  // Group by week
  const weeks: ContributionDay[][] = []
  let currentWeek: ContributionDay[] = []

  contributions.forEach((day, i) => {
    const date = new Date(day.date)
    const dayOfWeek = date.getDay()

    if (i === 0 && dayOfWeek !== 0) {
      for (let j = 0; j < dayOfWeek; j++) {
        currentWeek.push({ date: "", count: -1, level: 0 })
      }
    }

    currentWeek.push(day)

    if (dayOfWeek === 6 || i === contributions.length - 1) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  })

  const totalContributions = contributions.reduce((sum, d) => sum + d.count, 0)

  const levelColors = [
    "bg-muted",
    "bg-accent/20",
    "bg-accent/40",
    "bg-accent/60",
    "bg-accent",
  ]

  const months = [
    "1月", "2月", "3月", "4月", "5月", "6月",
    "7月", "8月", "9月", "10月", "11月", "12月",
  ]

  return (
    <div className="space-y-3">
      {/* Stats */}
      <div className="flex items-center gap-4 text-label-14">
        <span className="text-foreground">
          <span className="tabular-nums font-medium">{totalContributions}</span>{" "}
          <span className="text-muted-foreground">contributions in the last year</span>
        </span>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto pb-2 -mx-1 px-1">
        <div className="inline-flex flex-col gap-[3px]">
          {/* Month labels */}
          <div className="flex gap-[3px] ml-7 mb-1">
            {months.map((month) => (
              <div
                key={month}
                className="text-label-11 text-muted-foreground w-[52px] text-center"
              >
                {month}
              </div>
            ))}
          </div>

          {/* Day rows */}
          {["日", "一", "二", "三", "四", "五", "六"].map(
            (dayName, dayIdx) => (
              <div key={dayIdx} className="flex items-center gap-[3px]">
                <span className="text-label-11 text-muted-foreground w-6 text-right pr-1">
                  {dayIdx % 2 === 1 ? dayName : ""}
                </span>
                {weeks.map((week, weekIdx) => {
                  const day = week[dayIdx]
                  if (!day || day.count === -1) {
                    return (
                      <div
                        key={weekIdx}
                        className="size-[11px] rounded-sm"
                      />
                    )
                  }
                  return (
                    <div
                      key={weekIdx}
                      title={`${day.date}: ${day.count} contributions`}
                      className={`size-[11px] rounded-sm ${levelColors[day.level]} transition-colors duration-100 hover:ring-1 hover:ring-foreground/20`}
                    />
                  )
                })}
              </div>
            )
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5 text-label-11 text-muted-foreground">
        <span>Less</span>
        {levelColors.map((color, i) => (
          <div key={i} className={`size-[11px] rounded-sm ${color}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}
