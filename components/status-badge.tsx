import { cn } from "@/lib/utils"
import type { StatusEncomenda } from "@/lib/mock-data"

const statusConfig: Record<StatusEncomenda, { label: string; className: string }> = {
  pendente: { label: "Pendente", className: "bg-amber-100 text-amber-700 border-amber-200" },
  chegou: { label: "Chegou", className: "bg-blue-100 text-blue-700 border-blue-200" },
  separado: { label: "Separado", className: "bg-purple-100 text-purple-700 border-purple-200" },
  entregue: { label: "Entregue", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  cancelado: { label: "Cancelado", className: "bg-red-100 text-red-700 border-red-200" },
}

interface StatusBadgeProps {
  status: StatusEncomenda
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  )
}
