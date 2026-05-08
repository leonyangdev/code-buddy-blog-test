import { Card, CardContent } from "@/components/ui/card"
import { type LucideIcon } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon
  value: string
  label: string
}

export function StatCard({ icon: Icon, value, label }: StatCardProps) {
  return (
    <Card variant="elevated" className="text-center">
      <CardContent className="pt-6">
        <Icon className="size-8 mx-auto mb-2 text-accent" />
        <div className="text-heading-32 text-foreground tabular-nums">{value}</div>
        <div className="text-label-14 text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  )
}
