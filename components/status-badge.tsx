import { cn } from "@/lib/utils";
import { OrderStatus } from "@/models/product";

const statusConfig: Record<OrderStatus, { label: string; className: string }> =
  {
    pending: {
      label: "Pendente",
      className: "bg-amber-100 text-amber-700 border-amber-200",
    },
    arrived: {
      label: "Chegou",
      className: "bg-blue-100 text-blue-700 border-blue-200",
    },
    separated: {
      label: "Separado",
      className: "bg-purple-100 text-purple-700 border-purple-200",
    },
    delivered: {
      label: "Entregue",
      className: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
    cancelled: {
      label: "Cancelado",
      className: "bg-red-100 text-red-700 border-red-200",
    },
  };

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
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
  );
}
