import { cn } from "@/lib/utils"
import { Smartphone, Banknote, CreditCard } from "lucide-react"

type PaymentType = "pix" | "dinheiro" | "cartao"

const paymentConfig: Record<PaymentType, { label: string; icon: typeof Smartphone; className: string }> = {
  pix: { label: "Pix", icon: Smartphone, className: "bg-teal-100 text-teal-700" },
  dinheiro: { label: "Dinheiro", icon: Banknote, className: "bg-emerald-100 text-emerald-700" },
  cartao: { label: "Cartão", icon: CreditCard, className: "bg-blue-100 text-blue-700" },
}

interface PaymentBadgeProps {
  type: PaymentType
  className?: string
}

export function PaymentBadge({ type, className }: PaymentBadgeProps) {
  const config = paymentConfig[type]
  const Icon = config.icon
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        config.className,
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  )
}
