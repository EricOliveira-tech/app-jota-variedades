"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ShoppingCart } from "lucide-react";
import { PaymentBadge } from "@/components/payment-badge";
import { EmptyState } from "@/components/empty-state";
import { NovaVendaModal } from "@/components/modals/nova-venda-modal";
import { DetalheVendaModal } from "@/components/modals/detalhe-venda-modal";
import { sales } from "@/lib/mock-data";
import { Order, SaleItem } from "@/models/product";

export function VendasPage() {
  const [showNovaVenda, setShowNovaVenda] = useState(false);
  const [selectedVenda, setSelectedVenda] = useState<SaleItem | null>(null);

  const hoje = new Date().toISOString().split("T")[0];
  const vendasHoje = sales.filter((v) => v.date === hoje);

  return (
    <div className="flex flex-col">
      <Header title="Vendas" subtitle={`${vendasHoje.length} vendas hoje`} />

      <div className="flex flex-col gap-4 p-4">
        <Button
          size="lg"
          className="h-14 gap-2"
          onClick={() => setShowNovaVenda(true)}
        >
          <Plus className="h-5 w-5" />
          <span className="font-semibold">Nova Venda</span>
        </Button>

        {vendasHoje.length === 0 ? (
          <EmptyState
            icon={ShoppingCart}
            title="Nenhuma venda hoje"
            description="Registre sua primeira venda do dia clicando no botão acima."
          />
        ) : (
          <Card>
            <CardContent className="divide-y divide-border p-0">
              {vendasHoje
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((venda) => (
                  <button
                    key={venda.id}
                    onClick={() => {
                      // Adapt venda to match SaleItem type
                      if (venda.items && venda.items.length > 0) {
                        // Example: open modal with first SaleItem,
                        // or you could map all itens , here is one approach
                        setSelectedVenda({
                          ...venda.items[0],
                          sale_id: venda.id,
                        });
                      }
                    }}
                    className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {venda.items.length === 1
                            ? venda.items[0].product_name
                            : `${venda.items[0].product_name} +${
                                venda.items.length - 1
                              }`}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {venda.date}
                          </span>
                          <PaymentBadge type={venda.payment_method} />
                        </div>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-foreground">
                      R${" "}
                      {venda.total.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </button>
                ))}
            </CardContent>
          </Card>
        )}
      </div>

      <NovaVendaModal
        open={showNovaVenda}
        onClose={() => setShowNovaVenda(false)}
      />
      <DetalheVendaModal
        venda={selectedVenda}
        onClose={() => setSelectedVenda(null)}
      />
    </div>
  );
}
