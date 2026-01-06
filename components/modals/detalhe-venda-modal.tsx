"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { PaymentBadge } from "@/components/payment-badge"
import type { Venda } from "@/lib/mock-data"
import { Clock, ShoppingCart } from "lucide-react"

interface DetalheVendaModalProps {
  venda: Venda | null
  onClose: () => void
}

export function DetalheVendaModal({ venda, onClose }: DetalheVendaModalProps) {
  if (!venda) return null

  return (
    <Dialog open={!!venda} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalhes da Venda</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{venda.horario}</span>
            </div>
            <PaymentBadge type={venda.formaPagamento} />
          </div>

          {/* Items */}
          <Card>
            <CardContent className="divide-y divide-border p-0">
              {venda.itens.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{item.nome}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantidade}x R$ {item.precoUnitario.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    R${" "}
                    {(item.quantidade * item.precoUnitario).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Total */}
          <div className="flex items-center justify-between rounded-lg bg-muted p-4">
            <span className="text-lg font-medium">Total</span>
            <span className="text-2xl font-bold text-primary">
              R$ {venda.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
