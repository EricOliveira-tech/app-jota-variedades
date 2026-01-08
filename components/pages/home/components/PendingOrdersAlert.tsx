import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { AlertProps } from "./LowStockAlert";

function PendingOrdersAlert({ count, onClick }: AlertProps) {
  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <button
          onClick={onClick}
          className="flex w-full items-center justify-between text-left"
          aria-label="Navegar para encomendas pendentes"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-2">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-blue-800">Encomendas Ativas</p>
              <p className="text-sm text-blue-600">
                {count} encomendas aguardando
              </p>
            </div>
          </div>
          <span className="text-blue-600">Ver</span>
        </button>
      </CardContent>
    </Card>
  );
}

export default PendingOrdersAlert;
