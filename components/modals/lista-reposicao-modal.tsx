"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { getProdutosBaixoEstoque } from "@/lib/mock-data"
import { Share, Copy, Check, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface ListaReposicaoModalProps {
  open: boolean
  onClose: () => void
}

export function ListaReposicaoModal({ open, onClose }: ListaReposicaoModalProps) {
  const produtosBaixos = getProdutosBaixoEstoque()
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  const toggleItem = (id: string) => {
    const newSet = new Set(checkedItems)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setCheckedItems(newSet)
  }

  const handleCopy = () => {
    const unchecked = produtosBaixos.filter((p) => !checkedItems.has(p.id))
    const text = unchecked.map((p) => `• ${p.nome} (atual: ${p.estoque}, mínimo: ${p.minimo})`).join("\n")

    navigator.clipboard.writeText(`Lista de Reposição - J Variedades\n\n${text}`)

    toast({
      title: "Lista copiada!",
      description: "A lista foi copiada para a área de transferência.",
    })
  }

  const handleShare = async () => {
    const unchecked = produtosBaixos.filter((p) => !checkedItems.has(p.id))
    const text = unchecked.map((p) => `• ${p.nome} (atual: ${p.estoque}, mínimo: ${p.minimo})`).join("\n")

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Lista de Reposição - J Variedades",
          text: `Lista de Reposição - J Variedades\n\n${text}`,
        })
      } catch {
        handleCopy()
      }
    } else {
      handleCopy()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Lista de Reposição</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {produtosBaixos.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <Check className="mb-2 h-12 w-12 text-emerald-500" />
              <p className="font-semibold text-foreground">Estoque em dia!</p>
              <p className="text-sm text-muted-foreground">Todos os produtos estão acima do estoque mínimo.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                {produtosBaixos.length} produtos precisam de reposição. Marque os itens já providenciados.
              </p>

              <Card>
                <CardContent className="divide-y divide-border p-0">
                  {produtosBaixos.map((produto) => {
                    const isChecked = checkedItems.has(produto.id)
                    const isZero = produto.estoque === 0

                    return (
                      <label
                        key={produto.id}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 p-3 transition-colors hover:bg-muted/50",
                          isChecked && "bg-muted/30",
                        )}
                      >
                        <Checkbox checked={isChecked} onCheckedChange={() => toggleItem(produto.id)} />
                        <div className="flex-1">
                          <p className={cn("font-medium", isChecked && "text-muted-foreground line-through")}>
                            {produto.nome}
                          </p>
                          <div className="flex items-center gap-2">
                            {isZero && (
                              <span className="flex items-center gap-1 text-xs text-red-600">
                                <AlertTriangle className="h-3 w-3" />
                                Em falta
                              </span>
                            )}
                            <span className="text-xs text-muted-foreground">
                              Atual: {produto.estoque} | Mínimo: {produto.minimo}
                            </span>
                          </div>
                        </div>
                      </label>
                    )
                  })}
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="gap-2 bg-transparent" onClick={handleCopy}>
                  <Copy className="h-4 w-4" />
                  Copiar Lista
                </Button>
                <Button className="gap-2" onClick={handleShare}>
                  <Share className="h-4 w-4" />
                  Compartilhar
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
