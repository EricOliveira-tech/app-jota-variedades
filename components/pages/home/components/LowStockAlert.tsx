import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export interface AlertProps {
  count: number;
  onClick: () => void;
}

function LowStockAlert({ count, onClick }: AlertProps) {
  return (
    <Card className="border-amber-200 bg-amber-50">
      <CardContent className="p-4">
        <button
          onClick={onClick}
          className="flex w-full items-center justify-between text-left"
          aria-label="Navegar para produtos com baixo estoque"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-amber-100 p-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="font-semibold text-amber-800">Estoque Baixo</p>
              <p className="text-sm text-amber-600">
                {count} produtos precisam reposição
              </p>
            </div>
          </div>
          <span className="text-amber-600">Ver</span>
        </button>
      </CardContent>
    </Card>
  );
}

export default LowStockAlert;
