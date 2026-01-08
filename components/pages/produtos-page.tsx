"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Box, AlertTriangle } from "lucide-react";
import { EstoqueBadge } from "@/components/estoque-badge";
import { SearchInput } from "@/components/search-input";
import { EmptyState } from "@/components/empty-state";
import { NovoProdutoModal } from "@/components/modals/novo-produto-modal";
import { DetalheProdutoModal } from "@/components/modals/detalhe-produto-modal";
import { Product } from "@/models/product";
import { products } from "@/lib/mock-data";

export function ProdutosPage() {
  const [search, setSearch] = useState("");
  const [showNovoProduto, setShowNovoProduto] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState<Product | null>(null);

  const produtosBaixos = products.filter((p) => p.stock_qty <= p.min_stock_qty);
  const filteredProdutos = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredproducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col">
      <Header title="Produtos" subtitle={`${products.length} cadastrados`} />

      <div className="flex flex-col gap-4 p-4">
        <Button
          size="lg"
          className="h-14 gap-2"
          onClick={() => setShowNovoProduto(true)}
        >
          <Plus className="h-5 w-5" />
          <span className="font-semibold">Novo Produto</span>
        </Button>

        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Buscar produto..."
        />

        {/* Low Stock Section */}
        {produtosBaixos.length > 0 && !search && (
          <div>
            <div className="mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <h2 className="font-semibold text-amber-700">Estoque Baixo</h2>
            </div>
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="divide-y divide-amber-200 p-0">
                {produtosBaixos.map((produto) => (
                  <button
                    key={produto.id}
                    onClick={() => setSelectedProduto(produto)}
                    className="flex w-full items-center justify-between p-3 text-left hover:bg-amber-100/50"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {produto.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Mínimo: {produto.min_stock_qty} un.
                      </p>
                    </div>
                    <EstoqueBadge
                      estoque={produto.stock_qty}
                      minimo={produto.min_stock_qty}
                    />
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* All Products */}
        <div>
          {!search && (
            <h2 className="mb-2 font-semibold text-foreground">
              Todos os Produtos
            </h2>
          )}
          {filteredproducts.length === 0 ? (
            <EmptyState
              icon={Box}
              title="Nenhum produto encontrado"
              description={
                search
                  ? "Tente buscar com outros termos."
                  : "Cadastre seu primeiro produto clicando no botão acima."
              }
            />
          ) : (
            <Card>
              <CardContent className="divide-y divide-border p-0">
                {filteredproducts.map((produto) => (
                  <button
                    key={produto.id}
                    onClick={() => setSelectedProduto(produto)}
                    className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {produto.name}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {produto.category}
                        </span>
                        <span className="text-sm font-semibold text-primary">
                          R${" "}
                          {produto.price.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                    <EstoqueBadge
                      estoque={produto.stock_qty}
                      minimo={produto.stock_qty}
                    />
                  </button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <NovoProdutoModal
        open={showNovoProduto}
        onClose={() => setShowNovoProduto(false)}
      />
      <DetalheProdutoModal
        produto={selectedProduto}
        onClose={() => setSelectedProduto(null)}
      />
    </div>
  );
}
