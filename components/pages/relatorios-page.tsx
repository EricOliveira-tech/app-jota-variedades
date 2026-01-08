"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Smartphone,
  Banknote,
  CreditCard,
  Package,
  ShoppingCart,
  ClipboardList,
} from "lucide-react";
import { getSalesSummary, getLowStockProducts, sales } from "@/lib/mock-data";
import { ListaReposicaoModal } from "@/components/modals/lista-reposicao-modal";

export function RelatoriosPage() {
  const resumo = getSalesSummary();
  const produtosBaixos = getLowStockProducts();
  const [showReposicao, setShowReposicao] = useState(false);

  // Calculate products sold today with quantities
  const hoje = new Date().toISOString().split("T")[0];
  const vendasHoje = sales.filter((v) => v.date === hoje);
  const produtosVendidos = vendasHoje.reduce((acc, venda) => {
    venda.items.forEach((item) => {
      if (acc[item.product_name]) {
        acc[item.product_name] += item.qty;
      } else {
        acc[item.product_name] = item.qty;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  const topProdutos = Object.entries(produtosVendidos)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="flex flex-col">
      <Header
        title="Relatórios"
        subtitle={new Date().toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      />

      <div className="flex flex-col gap-4 p-4">
        {/* Daily Summary */}
        <Card className="border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium">Total do Dia</span>
            </div>
            <p className="mb-1 text-4xl font-bold">
              R${" "}
              {resumo.total.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
            <p className="text-emerald-100">
              {resumo.quantity} vendas realizadas
            </p>
          </CardContent>
        </Card>

        {/* Payment Split */}
        <div>
          <h2 className="mb-3 font-semibold text-foreground">
            Por Forma de Pagamento
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-teal-50">
              <CardContent className="p-3 text-center">
                <Smartphone className="mx-auto mb-2 h-6 w-6 text-teal-600" />
                <p className="text-2xl font-bold text-teal-700">{resumo.pix}</p>
                <p className="text-xs text-teal-600">vendas</p>
                <p className="mt-1 text-sm font-semibold text-teal-700">
                  R${" "}
                  {resumo.totalPix.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-emerald-50">
              <CardContent className="p-3 text-center">
                <Banknote className="mx-auto mb-2 h-6 w-6 text-emerald-600" />
                <p className="text-2xl font-bold text-emerald-700">
                  {resumo.cash}
                </p>
                <p className="text-xs text-emerald-600">vendas</p>
                <p className="mt-1 text-sm font-semibold text-emerald-700">
                  R${" "}
                  {resumo.totalCash.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardContent className="p-3 text-center">
                <CreditCard className="mx-auto mb-2 h-6 w-6 text-blue-600" />
                <p className="text-2xl font-bold text-blue-700">
                  {resumo.card}
                </p>
                <p className="text-xs text-blue-600">vendas</p>
                <p className="mt-1 text-sm font-semibold text-blue-700">
                  R${" "}
                  {resumo.totalCard.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Top Products */}
        <div>
          <h2 className="mb-3 font-semibold text-foreground">
            Produtos Mais Vendidos
          </h2>
          {topProdutos.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center py-8 text-center">
                <ShoppingCart className="mb-2 h-8 w-8 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Nenhuma venda registrada hoje
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="divide-y divide-border p-0">
                {topProdutos.map(
                  ([nome, quantity]: [string, number], index: number) => (
                    <div
                      key={nome}
                      className="flex items-center justify-between p-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {index + 1}
                        </span>
                        <span className="font-medium text-foreground">
                          {nome}
                        </span>
                      </div>
                      <span className="rounded-full bg-muted px-3 py-1 text-sm font-semibold">
                        {quantity} un.
                      </span>
                    </div>
                  ),
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Replenishment Button */}
        <Button
          size="lg"
          variant="outline"
          className="h-14 gap-2 border-2 bg-transparent"
          onClick={() => setShowReposicao(true)}
        >
          <ClipboardList className="h-5 w-5" />
          <span className="font-semibold">Lista de Reposição</span>
          {produtosBaixos.length > 0 && (
            <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-white">
              {produtosBaixos.length}
            </span>
          )}
        </Button>

        {/* Stock Alerts Summary */}
        {produtosBaixos.length > 0 && (
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-amber-600" />
                <p className="font-semibold text-amber-800">
                  {produtosBaixos.length} produtos precisam reposição
                </p>
              </div>
              <p className="mt-1 text-sm text-amber-600">
                {produtosBaixos.filter((p) => p.stock_qty === 0).length} em
                falta total
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <ListaReposicaoModal
        open={showReposicao}
        onClose={() => setShowReposicao(false)}
      />
    </div>
  );
}
