"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SearchInput } from "@/components/search-input"
import { produtos, type Produto } from "@/lib/mock-data"
import { X, Plus, Minus, Smartphone, Banknote, CreditCard, AlertTriangle, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface NovaVendaModalProps {
  open: boolean
  onClose: () => void
}

interface CartItem {
  produto: Produto
  quantidade: number
}

type PaymentMethod = "pix" | "dinheiro" | "cartao"

export function NovaVendaModal({ open, onClose }: NovaVendaModalProps) {
  const [search, setSearch] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
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

    if (showQuantityModal.estoque < quantity) {
      toast({
        title: "Atenção: Estoque insuficiente",
        description: `${showQuantityModal.nome} tem apenas ${showQuantityModal.estoque} unidades em estoque.`,
        variant: "destructive",
      })
    }

    setShowQuantityModal(null)
    setSearch("")
  }

  const removeFromCart = (produtoId: string) => {
    setCart(cart.filter((item) => item.produto.id !== produtoId))
  }

  const handleFinalize = () => {
    if (cart.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione pelo menos um produto para finalizar a venda.",
        variant: "destructive",
      })
      return
    }

    if (!paymentMethod) {
      toast({
        title: "Forma de pagamento",
        description: "Selecione uma forma de pagamento.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Venda registrada!",
      description: `Total: R$ ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} via ${paymentMethod === "pix" ? "Pix" : paymentMethod === "dinheiro" ? "Dinheiro" : "Cartão"}`,
    })

    setCart([])
    setPaymentMethod(null)
    setSearch("")
    onClose()
  }

  const handleClose = () => {
    setCart([])
    setPaymentMethod(null)
    setSearch("")
    onClose()
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="flex h-[90vh] max-w-lg flex-col p-0">
          <DialogHeader className="border-b p-4">
            <DialogTitle>Nova Venda</DialogTitle>
          </DialogHeader>

          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Search */}
            <div className="border-b p-4">
              <SearchInput value={search} onChange={setSearch} placeholder="Buscar produto..." />

              {/* Search Results */}
              {search && (
                <div className="mt-2 max-h-48 overflow-y-auto rounded-lg border">
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
                            {produto.estoque <= produto.minimo && (
                              <span className="ml-2 text-amber-600">({produto.estoque} em estoque)</span>
                            )}
                          </p>
                        </div>
                        <Plus className="h-5 w-5 text-primary" />
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-muted-foreground">Busque e adicione produtos</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {cart.map((item) => (
                    <Card key={item.produto.id}>
                      <CardContent className="flex items-center justify-between p-3">
                        <div className="flex-1">
                          <p className="font-medium">{item.produto.nome}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.quantidade}x R${" "}
                            {item.produto.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </p>
                          {item.produto.estoque < item.quantidade && (
                            <div className="mt-1 flex items-center gap-1 text-xs text-amber-600">
                              <AlertTriangle className="h-3 w-3" />
                              Estoque insuficiente
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
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

            {/* Payment & Total */}
            <div className="border-t bg-card p-4">
              <p className="mb-3 text-sm font-medium text-muted-foreground">Forma de Pagamento *</p>
              <div className="mb-4 grid grid-cols-3 gap-2">
                {[
                  { value: "pix" as const, label: "Pix", icon: Smartphone },
                  { value: "dinheiro" as const, label: "Dinheiro", icon: Banknote },
                  { value: "cartao" as const, label: "Cartão", icon: CreditCard },
                ].map((method) => {
                  const Icon = method.icon
                  return (
                    <button
                      key={method.value}
                      onClick={() => setPaymentMethod(method.value)}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-lg border-2 p-3 transition-colors",
                        paymentMethod === method.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5",
                          paymentMethod === method.value ? "text-primary" : "text-muted-foreground",
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm font-medium",
                          paymentMethod === method.value ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {method.label}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="mb-4 flex items-center justify-between">
                <span className="text-lg font-medium">Total</span>
                <span className="text-2xl font-bold text-primary">
                  R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>

              <Button
                size="lg"
                className="h-14 w-full gap-2"
                onClick={handleFinalize}
                disabled={cart.length === 0 || !paymentMethod}
              >
                <Check className="h-5 w-5" />
                Finalizar Venda
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
            {showQuantityModal && showQuantityModal.estoque < quantity && (
              <p className="mt-3 text-center text-sm text-amber-600">
                <AlertTriangle className="mr-1 inline h-4 w-4" />
                Apenas {showQuantityModal.estoque} em estoque
              </p>
            )}
          </div>
          <Button size="lg" onClick={confirmAddProduct}>
            Adicionar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
