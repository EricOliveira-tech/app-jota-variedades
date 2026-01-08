import { cn } from "@/lib/utils";
import { PaymentMethod } from "@/models/product";
import { Smartphone, Banknote, CreditCard } from "lucide-react";

const paymentConfig: Record<
  PaymentMethod,
  { label: string; icon: typeof Smartphone; className: string }
> = {
  pix: {
    label: "Pix",
    icon: Smartphone,
    className: "bg-teal-100 text-teal-700",
  },
  cash: {
    label: "Dinheiro",
    icon: Banknote,
    className: "bg-emerald-100 text-emerald-700",
  },
  card: {
    label: "Cartão",
    icon: CreditCard,
    className: "bg-blue-100 text-blue-700",
  },
  mixed: {
    label: "Cartão/Dinheiro",
    icon: CreditCard,
    className: "bg-blue-100 text-blue-700",
  },
};

interface PaymentBadgeProps {
  type: PaymentMethod;
  className?: string;
}

export function PaymentBadge({ type, className }: PaymentBadgeProps) {
  const config = paymentConfig[type];

  // If the type is not recognized, render nothing or a default
  if (!config) {
    return null;
  }

  const Icon = config.icon;
  console.log(config);
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
  );
}
