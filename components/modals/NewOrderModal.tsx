"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/lib/mock-data";
import { SearchInput } from "@/components/search-input";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User, Phone, Plus, Minus, Check, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/models/product";

// Types shared across components
interface CartItem {
  product: Product;
  quantity: number;
}
interface NewOrderModalProps {
  open: boolean;
  onClose: () => void;
}

export function NewOrderModal({ open, onClose }: NewOrderModalProps) {
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const handleAddProduct = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const confirmAddProduct = () => {
    if (!selectedProduct) return;

    const existing = cartItems.find(
      (item) => item.product.id === selectedProduct.id,
    );
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.product.id === selectedProduct.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
    } else {
      setCartItems([...cartItems, { product: selectedProduct, quantity }]);
    }

    setSelectedProduct(null);
    setSearchTerm("");
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
  };

  const handleSave = () => {
    if (!customer.trim()) {
      toast({
        title: "Nome do cliente",
        description: "Informe o nome do cliente.",
        variant: "destructive",
      });
      return;
    }

    if (!phone.trim()) {
      toast({
        title: "Telefone",
        description: "Informe o telefone do cliente.",
        variant: "destructive",
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Itens",
        description: "Adicione pelo menos um produto à encomenda.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Encomenda registrada!",
      description: `Encomenda de ${customer} criada como PENDENTE.`,
    });

    resetForm();
    onClose();
  };

  const resetForm = () => {
    setCustomer("");
    setPhone("");
    setNote("");
    setCartItems([]);
    setSearchTerm("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

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
                  <Label
                    htmlFor="customer"
                    className="mb-1.5 flex items-center gap-1"
                  >
                    <User className="h-4 w-4" />
                    Nome do Cliente *
                  </Label>
                  <Input
                    id="customer"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    placeholder="Ex: Maria Silva"
                    className="h-12"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="phone"
                    className="mb-1.5 flex items-center gap-1"
                  >
                    <Phone className="h-4 w-4" />
                    Telefone *
                  </Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="h-12"
                  />
                </div>
              </div>

              {/* Products */}
              <div className="mb-4">
                <Label className="mb-1.5">Produtos *</Label>
                <SearchInput
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Buscar produto..."
                />

                {searchTerm && (
                  <div className="mt-2 max-h-36 overflow-y-auto rounded-lg border">
                    {filteredProducts.length === 0 ? (
                      <p className="p-3 text-center text-sm text-muted-foreground">
                        Nenhum produto encontrado
                      </p>
                    ) : (
                      filteredProducts.slice(0, 5).map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleAddProduct(product)}
                          className="flex w-full items-center justify-between p-3 text-left hover:bg-muted"
                        >
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              R${" "}
                              {product.price.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </p>
                          </div>
                          <Plus className="h-5 w-5 text-primary" />
                        </button>
                      ))
                    )}
                  </div>
                )}

                {cartItems.length > 0 && (
                  <div className="mt-3 flex flex-col gap-2">
                    {cartItems.map((item) => (
                      <Card key={item.product.id}>
                        <CardContent className="flex items-center justify-between p-3">
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.quantity}x R${" "}
                              {item.product.price.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">
                              R${" "}
                              {(
                                item.product.price * item.quantity
                              ).toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </p>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
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
                <Label htmlFor="note" className="mb-1.5">
                  Observação
                </Label>
                <Textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
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
                  R${" "}
                  {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>

              <Button
                size="lg"
                className="h-14 w-full gap-2"
                onClick={handleSave}
                disabled={
                  !customer.trim() || !phone.trim() || cartItems.length === 0
                }
              >
                <Check className="h-5 w-5" />
                Salvar Encomenda
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quantity Modal */}
      <Dialog
        open={!!selectedProduct}
        onOpenChange={() => setSelectedProduct(null)}
      >
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-center">Quantidade</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4 text-center font-medium">
              {selectedProduct?.name}
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-muted"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="w-16 text-center text-3xl font-bold">
                {quantity}
              </span>
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
  );
}

export default NewOrderModal;
