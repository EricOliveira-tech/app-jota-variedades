"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/status-badge"
import type { Encomenda, StatusEncomenda } from "@/lib/mock-data"
import { Phone, MessageCircle, Package, Check, X, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DetalheEncomendaModalProps {
  encomenda: Encomenda | null
  onClose: () => void
}

export function DetalheEncomendaModal({ encomenda, onClose }: DetalheEncomendaModalProps) {
  const { toast } = useToast()

  if (!encomenda) return null

  const handleStatusChange = (newStatus: StatusEncomenda) => {
    const statusLabels: Record<StatusEncomenda, string> = {
      pendente: "Pendente",
      chegou: "Chegou",
      separado: "Separado",
      entregue: "Entregue",
      cancelado: "Cancelado",
    }

    toast({
      title: "Status atualizado!",
      description: `Encomenda marcada como ${statusLabels[newStatus]}.`,
    })
  }

  const handleWhatsApp = () => {
    const phone = encomenda.telefone.replace(/\D/g, "")
    const message = encodeURIComponent(
      `Olá ${encomenda.cliente}! Sua encomenda na J Variedades está pronta para retirada.`,
    )
    window.open(`https://wa.me/55${phone}?text=${message}`, "_blank")
  }

  const handleCall = () => {
    const phone = encomenda.telefone.replace(/\D/g, "")
    window.open(`tel:${phone}`)
  }

  const getAvailableActions = () => {
    switch (encomenda.status) {
      case "pendente":
        return [
          { status: "chegou" as const, label: "Marcar Chegou", variant: "default" as const },
          { status: "cancelado" as const, label: "Cancelar", variant: "destructive" as const },
        ]
      case "chegou":
        return [
          { status: "separado" as const, label: "Marcar Separado", variant: "default" as const },
          { status: "entregue" as const, label: "Entregar", variant: "default" as const },
        ]
      case "separado":
        return [{ status: "entregue" as const, label: "Entregar", variant: "default" as const }]
      default:
        return []
    }
  }

  const actions = getAvailableActions()

  return (
    <Dialog open={!!encomenda} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalhes da Encomenda</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Client & Status */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-lg font-semibold">{encomenda.cliente}</p>
              <p className="text-muted-foreground">{encomenda.telefone}</p>
            </div>
            <StatusBadge status={encomenda.status} />
          </div>

          {/* Contact Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="gap-2 bg-transparent" onClick={handleWhatsApp}>
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent" onClick={handleCall}>
              <Phone className="h-4 w-4" />
              Ligar
            </Button>
          </div>

          {/* Items */}
          <Card>
            <CardContent className="divide-y divide-border p-0">
              {encomenda.itens.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <Package className="h-4 w-4 text-muted-foreground" />
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

          {/* Observation */}
          {encomenda.observacao && (
            <div className="rounded-lg bg-muted p-3">
              <p className="mb-1 text-xs font-medium text-muted-foreground">Observação</p>
              <p className="text-sm">{encomenda.observacao}</p>
            </div>
          )}

          {/* Dates */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Criada em {new Date(encomenda.dataCriacao).toLocaleDateString("pt-BR")}</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between rounded-lg bg-muted p-4">
            <span className="text-lg font-medium">Total</span>
            <span className="text-2xl font-bold text-primary">
              R$ {encomenda.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Status Actions */}
          {actions.length > 0 && (
            <div className="flex flex-col gap-2">
              {actions.map((action) => (
                <Button
                  key={action.status}
                  variant={action.variant}
                  size="lg"
                  className="gap-2"
                  onClick={() => handleStatusChange(action.status)}
                >
                  {action.status === "entregue" && <Check className="h-5 w-5" />}
                  {action.status === "cancelado" && <X className="h-5 w-5" />}
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
