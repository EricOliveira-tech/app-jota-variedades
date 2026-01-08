// components/icons.tsx
import {
  Plus as PlusIcon,
  ShoppingCart as ShoppingCartIcon,
  Package as PackageIcon,
  AlertTriangle as AlertTriangleIcon,
  TrendingUp as TrendingUpIcon,
  Smartphone as SmartphoneIcon,
  Banknote as BanknoteIcon,
  CreditCard as CreditCardIcon,
} from "lucide-react";

// Centralized export: easier to modify or extend later
export const icons = {
  plus: PlusIcon,
  shoppingCart: ShoppingCartIcon,
  package: PackageIcon,
  alertTriangle: AlertTriangleIcon,
  trendingUp: TrendingUpIcon,
  smartphone: SmartphoneIcon,
  banknote: BanknoteIcon,
  creditCard: CreditCardIcon,
};

interface IconProps {
  name: keyof typeof icons;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const IconComponent = icons[name];
  return <IconComponent className={className} />;
}
