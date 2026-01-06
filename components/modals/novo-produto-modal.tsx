"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface NovoProdutoModalProps {
  open: boolean
  onClose: () => void
}

const categorias = ["Capinhas", "Películas", "Cabos", "Carregadores", "Fones", "Smartwatch", "Outros"]

export function NovoProdutoModal({ open, onClose }: NovoProdutoModalProps) {
  const [nome, setNome] = useState("")
  const [preco, setPreco] = useState("")
  const [estoque, setEstoque] = useState("")
  const [minimo, setMinimo] = useState("")
  const [categoria, setCategoria] = useState("")
  const { toast } = useToast()

  const handleSave = () => {
    if (!nome.trim()) {
      toast({ title: "Nome obrigatório", variant: "destructive" })
      return
    }
    if (!preco || Number(preco) <= 0) {
      toast({ title: "Preço inválido", variant: "destructive" })
      return
    }
    if (!categoria) {
      toast({ title: "Categoria obrigatória", variant: "destructive" })
      return
    }

    toast({
      title: "Produto cadastrado!",
      description: `${nome} adicionado ao catálogo.`,
    })

    resetForm()
    onClose()
  }

  const resetForm = () => {
    setNome("")
    setPreco("")
    setEstoque("")
    setMinimo("")
    setCategoria("")
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        resetForm()
        onClose()
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="nome" className="mb-1.5">
              Nome do Produto *
            </Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Capinha iPhone 15"
              className="h-12"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="preco" className="mb-1.5">
                Preço (R$) *
              </Label>
              <Input
                id="preco"
                type="number"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="0,00"
                className="h-12"
              />
            </div>
            <div>
              <Label htmlFor="categoria" className="mb-1.5">
                Categoria *
              </Label>
              <Select value={categoria} onValueChange={setCategoria}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="estoque" className="mb-1.5">
                Estoque Inicial
              </Label>
              <Input
                id="estoque"
                type="number"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
                placeholder="0"
                className="h-12"
              />
            </div>
            <div>
              <Label htmlFor="minimo" className="mb-1.5">
                Estoque Mínimo
              </Label>
              <Input
                id="minimo"
                type="number"
                value={minimo}
                onChange={(e) => setMinimo(e.target.value)}
                placeholder="0"
                className="h-12"
              />
            </div>
          </div>

          <Button size="lg" className="mt-2 h-14 gap-2" onClick={handleSave}>
            <Check className="h-5 w-5" />
            Cadastrar Produto
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
