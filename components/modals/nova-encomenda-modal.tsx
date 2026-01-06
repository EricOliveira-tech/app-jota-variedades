"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { SearchInput } from "@/components/search-input"
import { produtos, type Produto } from "@/lib/mock-data"
import { X, Plus, Minus, Check, User, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface NovaEncomendaModalProps {
  open: boolean
  onClose: () => void
}

interface CartItem {
  produto: Produto
  quantidade: number
}

export function NovaEncomendaModal({ open, onClose }: NovaEncomendaModalProps) {
  const [cliente, setCliente] = useState("")
  const [telefone, setTelefone] = useState("")
  const [observacao, setObservacao] = useState("")
  const [search, setSearch] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [showQuantityModal, setShowQuantityModal] = useState<Produto | null>(null)
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()

  const filteredProdutos = produtos.filter((p) => p.nome.toLowerCase().includes(search.toLowerCase()))

  const total = cart.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0)

  const handleAddProduct = (produto: Produto) => {
    setShowQuantityModal(produto)
    setQuantity(1)
  }

  const confirmAddProduct = () => {
    if (!showQuantityModal) return

    const existing = cart.find((item) => item.produto.id === showQuantityModal.id)
    if (existing) {
      setCart(
        cart.map((item) =>
          item.produto.id === showQuantityModal.id ? { ...item, quantidade: item.quantidade + quantity } : item,
        ),
      )
    } else {
      setCart([...cart, { produto: showQuantityModal, quantidade: quantity }])
    }

    setShowQuantityModal(null)
    setSearch("")
  }

  const removeFromCart = (produtoId: string) => {
    setCart(cart.filter((item) => item.produto.id !== produtoId))
  }

  const handleSave = () => {
    if (!cliente.trim()) {
      toast({
        title: "Nome do cliente",
        description: "Informe o nome do cliente.",
        variant: "destructive",
      })
      return
    }

    if (!telefone.trim()) {
      toast({
        title: "Telefone",
        description: "Informe o telefone do cliente.",
        variant: "destructive",
      })
      return
    }

    if (cart.length === 0) {
      toast({
        title: "Itens",
        description: "Adicione pelo menos um produto à encomenda.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Encomenda registrada!",
      description: `Encomenda de ${cliente} criada como PENDENTE.`,
    })

    resetForm()
    onClose()
  }

  const resetForm = () => {
    setCliente("")
    setTelefone("")
    setObservacao("")
    setCart([])
    setSearch("")
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="flex h-[90vh] max-w-lg flex-col p-0">
          <DialogHeader className="border-b p-4">
            <DialogTitle>Nova Encomenda</DialogTitle>
          </DialogHeader>

          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4">
              {/* Client Info */}
              <div className="mb-4 flex flex-col gap-3">
                <div>
                  <Label htmlFor="cliente" className="mb-1.5 flex items-center gap-1">
                    <User className="h-4 w-4" />
                    Nome do Cliente *
                  </Label>
                  <Input
                    id="cliente"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                    placeholder="Ex: Maria Silva"
                    className="h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="telefone" className="mb-1.5 flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    Telefone *
                  </Label>
                  <Input
                    id="telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="h-12"
                  />
                </div>
              </div>

              {/* Products */}
              <div className="mb-4">
                <Label className="mb-1.5">Produtos *</Label>
                <SearchInput value={search} onChange={setSearch} placeholder="Buscar produto..." />

                {search && (
                  <div className="mt-2 max-h-36 overflow-y-auto rounded-lg border">
                    {filteredProdutos.length === 0 ? (
                      <p className="p-3 text-center text-sm text-muted-foreground">Nenhum produto encontrado</p>
                    ) : (
                      filteredProdutos.slice(0, 5).map((produto) => (
                        <button
                          key={produto.id}
                          onClick={() => handleAddProduct(produto)}
                          className="flex w-full items-center justify-between p-3 text-left hover:bg-muted"
                        >
                          <div>
                            <p className="font-medium">{produto.nome}</p>
                            <p className="text-sm text-muted-foreground">
                              R$ {produto.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                          <Plus className="h-5 w-5 text-primary" />
                        </button>
                      ))
                    )}
                  </div>
                )}

                {cart.length > 0 && (
                  <div className="mt-3 flex flex-col gap-2">
                    {cart.map((item) => (
                      <Card key={item.produto.id}>
                        <CardContent className="flex items-center justify-between p-3">
                          <div>
                            <p className="font-medium">{item.produto.nome}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.quantidade}x R${" "}
                              {item.produto.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">
                              R${" "}
                              {(item.produto.preco * item.quantidade).toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </p>
                            <button
                              onClick={() => removeFromCart(item.produto.id)}
                              className="rounded-full p-1 hover:bg-muted"
                            >
                              <X className="h-4 w-4 text-muted-foreground" />
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="observacao" className="mb-1.5">
                  Observação
                </Label>
                <Textarea
                  id="observacao"
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  placeholder="Ex: Cliente vai buscar sexta-feira"
                  rows={3}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t bg-card p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-lg font-medium">Total</span>
                <span className="text-2xl font-bold text-primary">
                  R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>

              <Button
                size="lg"
                className="h-14 w-full gap-2"
                onClick={handleSave}
                disabled={!cliente.trim() || !telefone.trim() || cart.length === 0}
              >
                <Check className="h-5 w-5" />
                Salvar Encomenda
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quantity Modal */}
      <Dialog open={!!showQuantityModal} onOpenChange={() => setShowQuantityModal(null)}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-center">Quantidade</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4 text-center font-medium">{showQuantityModal?.nome}</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-muted"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="w-16 text-center text-3xl font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
          <Button size="lg" onClick={confirmAddProduct}>
            Adicionar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
