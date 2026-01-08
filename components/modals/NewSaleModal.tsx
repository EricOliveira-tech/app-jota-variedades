"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchInput } from "@/components/search-input";

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
import { PaymentMethod, Product, Sale, SaleItem } from "@/models/product";
import { products } from "@/lib/mock-data";

interface NewSaleModalProps {
  open: boolean;
  onClose: () => void;
}

interface CartItem {
  product: Product;
  quantity: number;
}

type PaymentLabel = "Pix" | "Dinheiro" | "Cartão";

interface SaleItemModal {
  value: PaymentMethod;
  label: PaymentLabel;
  icon: any;
}

const NEW_SALE: SaleItemModal[] = [
  { value: "pix", label: "Pix", icon: Smartphone },
  {
    value: "cash",
    label: "Dinheiro",
    icon: Banknote,
  },
  {
    value: "card",
    label: "Cartão",
    icon: CreditCard,
  },
];

export function NewSaleModal({ open, onClose }: NewSaleModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null,
  );
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

    if (selectedProduct.stock_qty < quantity) {
      toast({
        title: "Atenção: Estoque insuficiente",
        description: `${selectedProduct.name} tem apenas ${selectedProduct.stock_qty} unidades em estoque.`,
        variant: "destructive",
      });
    }

    setSelectedProduct(null);
    setSearchTerm("");
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
  };

  const handleFinalize = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione pelo menos um produto para finalizar a venda.",
        variant: "destructive",
      });
      return;
    }

    if (!paymentMethod) {
      toast({
        title: "Forma de pagamento",
        description: "Selecione uma forma de pagamento.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Venda registrada!",
      description: `Total: R$ ${total.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })} via ${
        paymentMethod === "pix"
          ? "Pix"
          : paymentMethod === "cash"
          ? "Dinheiro"
          : "Cartão"
      }`,
    });

    setCartItems([]);
    setPaymentMethod(null);
    setSearchTerm("");
    onClose();
  };

  const handleClose = () => {
    setCartItems([]);
    setPaymentMethod(null);
    setSearchTerm("");
    onClose();
  };

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
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Buscar produto..."
              />

              {/* Search Results */}
              {searchTerm && (
                <div className="mt-2 max-h-48 overflow-y-auto rounded-lg border">
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
                            {typeof product.min_stock_qty === "number" &&
                              product.stock_qty <= product.min_stock_qty && (
                                <span className="ml-2 text-amber-600">
                                  ({product.stock_qty} em estoque)
                                </span>
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
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-muted-foreground">
                    Busque e adicione produtos
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {cartItems.map((item) => (
                    <Card key={item.product.id}>
                      <CardContent className="flex items-center justify-between p-3">
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity}x R${" "}
                            {item.product.price.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </p>
                          {item.product.stock_qty < item.quantity && (
                            <div className="mt-1 flex items-center gap-1 text-xs text-amber-600">
                              <AlertTriangle className="h-3 w-3" />
                              Estoque insuficiente
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
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

            {/* Payment & Total */}
            <div className="border-t bg-card p-4">
              <p className="mb-3 text-sm font-medium text-muted-foreground">
                Forma de Pagamento *
              </p>
              <div className="mb-4 grid grid-cols-3 gap-2">
                {NEW_SALE.map((method) => {
                  const Icon = method.icon;
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
                          paymentMethod === method.value
                            ? "text-primary"
                            : "text-muted-foreground",
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm font-medium",
                          paymentMethod === method.value
                            ? "text-primary"
                            : "text-muted-foreground",
                        )}
                      >
                        {method.label}
                      </span>
                    </button>
                  );
                })}
              </div>

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
                onClick={handleFinalize}
                disabled={cartItems.length === 0 || !paymentMethod}
              >
                <Check className="h-5 w-5" />
                Finalizar Venda
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
            {selectedProduct && selectedProduct.stock_qty < quantity && (
              <p className="mt-3 text-center text-sm text-amber-600">
                <AlertTriangle className="mr-1 inline h-4 w-4" />
                Apenas {selectedProduct.stock_qty} em estoque
              </p>
            )}
          </div>
          <Button size="lg" onClick={confirmAddProduct}>
            Adicionar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewSaleModal;
