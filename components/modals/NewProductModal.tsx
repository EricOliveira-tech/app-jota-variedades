"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  X,
  Plus,
  Minus,
  Smartphone,
  Banknote,
  CreditCard,
  AlertTriangle,
  Check,
  User,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// New Product Modal
interface NewProductModalProps {
  open: boolean;
  onClose: () => void;
}

const categories = [
  "Capinhas",
  "Películas",
  "Cabos",
  "Carregadores",
  "Fones",
  "Smartwatch",
  "Outros",
];

export function NewProductModal({ open, onClose }: NewProductModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [minimum, setMinimum] = useState("");
  const [category, setCategory] = useState("");
  const { toast } = useToast();

  const handleSave = () => {
    if (!name.trim()) {
      toast({ title: "Nome obrigatório", variant: "destructive" });
      return;
    }
    if (!price || Number(price) <= 0) {
      toast({ title: "Preço inválido", variant: "destructive" });
      return;
    }
    if (!category) {
      toast({ title: "Categoria obrigatória", variant: "destructive" });
      return;
    }

    toast({
      title: "Produto cadastrado!",
      description: `${name} adicionado ao catálogo.`,
    });

    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setStock("");
    setMinimum("");
    setCategory("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        resetForm();
        onClose();
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name" className="mb-1.5">
              Nome do Produto *
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Capinha iPhone 15"
              className="h-12"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="price" className="mb-1.5">
                Preço (R$) *
              </Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0,00"
                className="h-12"
              />
            </div>
            <div>
              <Label htmlFor="category" className="mb-1.5">
                Categoria *
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
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
              <Label htmlFor="stock" className="mb-1.5">
                Estoque Inicial
              </Label>
              <Input
                id="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
                className="h-12"
              />
            </div>
            <div>
              <Label htmlFor="minimum" className="mb-1.5">
                Estoque Mínimo
              </Label>
              <Input
                id="minimum"
                type="number"
                value={minimum}
                onChange={(e) => setMinimum(e.target.value)}
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
  );
}
