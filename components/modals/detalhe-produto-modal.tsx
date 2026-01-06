"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { EstoqueBadge } from "@/components/estoque-badge"
import { StatusBadge } from "@/components/status-badge"
import type { Produto } from "@/lib/mock-data"
import { encomendas } from "@/lib/mock-data"
import { Plus, Minus, RotateCcw, Package, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface DetalheProdutoModalProps {
  produto: Produto | null
  onClose: () => void
}

type AjusteType = "entrada" | "saida" | "ajuste"

export function DetalheProdutoModal({ produto, onClose }: DetalheProdutoModalProps) {
  const [ajusteType, setAjusteType] = useState<AjusteType>("entrada")
  const [quantidade, setQuantidade] = useState("")
  const { toast } = useToast()

  if (!produto) return null

  // Find related pending orders
  const encomendasRelacionadas = encomendas.filter(
    (e) =>
      (e.status === "pendente" || e.status === "chegou" || e.status === "separado") &&
      e.itens.some((item) => item.produtoId === produto.id),
  )

  const handleAjuste = () => {
    if (!quantidade || Number(quantidade) <= 0) {
      toast({ title: "Quantidade inválida", variant: "destructive" })
      return
    }

    const labels: Record<AjusteType, string> = {
      entrada: "Entrada registrada",
      saida: "Saída registrada",
      ajuste: "Estoque ajustado",
    }

    toast({
      title: labels[ajusteType],
      description: `${quantidade} unidades de ${produto.nome}.`,
    })

    setQuantidade("")
  }

  const isBaixo = produto.estoque <= produto.minimo

  return (
    <Dialog open={!!produto} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalhes do Produto</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Product Info */}
          <div>
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-lg font-semibold">{produto.nome}</p>
                <p className="text-muted-foreground">{produto.categoria}</p>
              </div>
              <p className="text-xl font-bold text-primary">
                R$ {produto.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Estoque:</span>
                <EstoqueBadge estoque={produto.estoque} minimo={produto.minimo} />
              </div>
              <div className="text-sm text-muted-foreground">Mínimo: {produto.minimo} un.</div>
            </div>

            {isBaixo && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-amber-700">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {produto.estoque === 0 ? "Produto em falta!" : "Estoque abaixo do mínimo"}
                </span>
              </div>
            )}
          </div>

          {/* Stock Adjustment */}
          <Card>
            <CardContent className="p-4">
              <p className="mb-3 font-medium">Ajustar Estoque</p>

              <div className="mb-3 grid grid-cols-3 gap-2">
                {[
                  { type: "entrada" as const, label: "Entrada", icon: Plus },
                  { type: "saida" as const, label: "Saída", icon: Minus },
                  { type: "ajuste" as const, label: "Ajuste", icon: RotateCcw },
                ].map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.type}
                      onClick={() => setAjusteType(option.type)}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-lg border-2 p-2 transition-colors",
                        ajusteType === option.type
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <Icon
                        className={cn("h-4 w-4", ajusteType === option.type ? "text-primary" : "text-muted-foreground")}
                      />
                      <span
                        className={cn(
                          "text-xs font-medium",
                          ajusteType === option.type ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {option.label}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="quantidade" className="sr-only">
                    Quantidade
                  </Label>
                  <Input
                    id="quantidade"
                    type="number"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    placeholder="Quantidade"
                    className="h-12"
                  />
                </div>
                <Button size="lg" className="h-12" onClick={handleAjuste}>
                  Confirmar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Related Orders */}
          {encomendasRelacionadas.length > 0 && (
            <div>
              <p className="mb-2 font-medium">Encomendas Relacionadas</p>
              <Card>
                <CardContent className="divide-y divide-border p-0">
                  {encomendasRelacionadas.map((encomenda) => (
                    <div key={encomenda.id} className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <Package className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{encomenda.cliente}</p>
                          <p className="text-xs text-muted-foreground">{encomenda.telefone}</p>
                        </div>
                      </div>
                      <StatusBadge status={encomenda.status} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
