import { cn } from "@/lib/utils"
import { AlertTriangle } from "lucide-react"

interface EstoqueBadgeProps {
  estoque: number
  minimo: number
  className?: string
}

export function EstoqueBadge({ estoque, minimo, className }: EstoqueBadgeProps) {
  const isBaixo = estoque <= minimo
  const isZero = estoque === 0

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {isBaixo && <AlertTriangle className={cn("h-4 w-4", isZero ? "text-red-500" : "text-amber-500")} />}
      <span
        className={cn(
          "rounded-full px-2 py-0.5 text-xs font-semibold",
          isZero
            ? "bg-red-100 text-red-700"
            : isBaixo
              ? "bg-amber-100 text-amber-700"
              : "bg-emerald-100 text-emerald-700",
        )}
      >
        {estoque} un.
      </span>
    </div>
  )
}
