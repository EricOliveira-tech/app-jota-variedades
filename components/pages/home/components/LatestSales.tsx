import { Card, CardContent } from "@/components/ui/card";
import { LatestSale } from "@/models/product";
import { ShoppingCart } from "lucide-react";

interface LatestSalesProps {
  sales: LatestSale[];
  onViewAll: () => void;
}

function LatestSales({ sales, onViewAll }: LatestSalesProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold text-foreground">Últimas Vendas</h2>
        <button
          onClick={onViewAll}
          className="text-sm font-medium text-primary"
          aria-label="Navegar para todas as vendas"
        >
          Ver todas
        </button>
      </div>
      <Card>
        <CardContent className="divide-y divide-border p-0">
          {sales.map((sale) => (
            <div
              key={sale.id}
              className="flex items-center justify-between p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{sale.product}</p>
                  <p className="text-xs text-muted-foreground">
                    {sale.time} • {sale.payment}
                  </p>
                </div>
              </div>
              <p className="font-semibold text-foreground">
                R${" "}
                {sale.price.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default LatestSales;
