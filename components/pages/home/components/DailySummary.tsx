import { Card, CardContent } from "@/components/ui/card";
import { Banknote, CreditCard, Smartphone, TrendingUp } from "lucide-react";

interface SalesSummary {
  total: number;
  quantity: number;
  pix: number;
  cash: number;
  card: number;
}

interface DailySummaryProps {
  summary: SalesSummary;
}

function DailySummary({ summary }: DailySummaryProps) {
  return (
    <Card className="border-0 bg-linear-to-br from-emerald-500 to-emerald-600 text-white">
      <CardContent className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          <span className="font-medium">Resumo do Dia</span>
        </div>
        <div className="mb-4">
          <p className="text-3xl font-bold">
            R${" "}
            {summary.total.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </p>
          <p className="text-emerald-100">
            {summary.quantity} vendas realizadas
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-white/20 p-2 text-center">
            <Smartphone className="mx-auto mb-1 h-4 w-4" />
            <p className="text-lg font-bold">{summary.pix}</p>
            <p className="text-xs text-emerald-100">Pix</p>
          </div>
          <div className="rounded-lg bg-white/20 p-2 text-center">
            <Banknote className="mx-auto mb-1 h-4 w-4" />
            <p className="text-lg font-bold">{summary.cash}</p>
            <p className="text-xs text-emerald-100">Dinheiro</p>
          </div>
          <div className="rounded-lg bg-white/20 p-2 text-center">
            <CreditCard className="mx-auto mb-1 h-4 w-4" />
            <p className="text-lg font-bold">{summary.card}</p>
            <p className="text-xs text-emerald-100">Cartão</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DailySummary;
