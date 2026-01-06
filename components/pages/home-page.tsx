"use client"

import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ShoppingCart, Package, AlertTriangle, TrendingUp, Smartphone, Banknote, CreditCard } from "lucide-react"
import { getResumoVendas, getProdutosBaixoEstoque, getEncomendasPendentes } from "@/lib/mock-data"
import type { TabType } from "@/app/page"
import { useState } from "react"
import { NovaVendaModal } from "@/components/modals/nova-venda-modal"
import { NovaEncomendaModal } from "@/components/modals/nova-encomenda-modal"

interface HomePageProps {
  onNavigate: (tab: TabType) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  const resumo = getResumoVendas()
  const produtosBaixos = getProdutosBaixoEstoque()
  const encomendasPendentes = getEncomendasPendentes()
  const [showNovaVenda, setShowNovaVenda] = useState(false)
  const [showNovaEncomenda, setShowNovaEncomenda] = useState(false)

  return (
    <div className="flex flex-col">
      <Header
        title="J Variedades"
        subtitle={`Hoje, ${new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}`}
      />

      <div className="flex flex-col gap-4 p-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            size="lg"
            className="h-16 gap-2 bg-primary text-primary-foreground"
            onClick={() => setShowNovaVenda(true)}
          >
            <Plus className="h-5 w-5" />
            <span className="font-semibold">Nova Venda</span>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-16 gap-2 border-2 bg-transparent"
            onClick={() => setShowNovaEncomenda(true)}
          >
            <Package className="h-5 w-5" />
            <span className="font-semibold">Nova Encomenda</span>
          </Button>
        </div>

        {/* Daily Summary */}
        <Card className="border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium">Resumo do Dia</span>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-bold">
                R$ {resumo.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-emerald-100">{resumo.quantidade} vendas realizadas</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-white/20 p-2 text-center">
                <Smartphone className="mx-auto mb-1 h-4 w-4" />
                <p className="text-lg font-bold">{resumo.pix}</p>
                <p className="text-xs text-emerald-100">Pix</p>
              </div>
              <div className="rounded-lg bg-white/20 p-2 text-center">
                <Banknote className="mx-auto mb-1 h-4 w-4" />
                <p className="text-lg font-bold">{resumo.dinheiro}</p>
                <p className="text-xs text-emerald-100">Dinheiro</p>
              </div>
              <div className="rounded-lg bg-white/20 p-2 text-center">
                <CreditCard className="mx-auto mb-1 h-4 w-4" />
                <p className="text-lg font-bold">{resumo.cartao}</p>
                <p className="text-xs text-emerald-100">Cartão</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        {produtosBaixos.length > 0 && (
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <button
                onClick={() => onNavigate("produtos")}
                className="flex w-full items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-amber-100 p-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-800">Estoque Baixo</p>
                    <p className="text-sm text-amber-600">{produtosBaixos.length} produtos precisam reposição</p>
                  </div>
                </div>
                <span className="text-amber-600">Ver</span>
              </button>
            </CardContent>
          </Card>
        )}

        {encomendasPendentes.length > 0 && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <button
                onClick={() => onNavigate("encomendas")}
                className="flex w-full items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 p-2">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-800">Encomendas Ativas</p>
                    <p className="text-sm text-blue-600">{encomendasPendentes.length} encomendas aguardando</p>
                  </div>
                </div>
                <span className="text-blue-600">Ver</span>
              </button>
            </CardContent>
          </Card>
        )}

        {/* Recent Sales */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Últimas Vendas</h2>
            <button onClick={() => onNavigate("vendas")} className="text-sm font-medium text-primary">
              Ver todas
            </button>
          </div>
          <Card>
            <CardContent className="divide-y divide-border p-0">
              {[
                { id: 1, produto: "Smartwatch D20", valor: 89, hora: "19:30", pagamento: "Pix" },
                { id: 2, produto: "Capinha Samsung A54", valor: 30, hora: "19:00", pagamento: "Pix" },
                { id: 3, produto: "Cabo Type-C 1m", valor: 20, hora: "18:30", pagamento: "Dinheiro" },
              ].map((venda) => (
                <div key={venda.id} className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{venda.produto}</p>
                      <p className="text-xs text-muted-foreground">
                        {venda.hora} • {venda.pagamento}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-foreground">
                    R$ {venda.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <NovaVendaModal open={showNovaVenda} onClose={() => setShowNovaVenda(false)} />
      <NovaEncomendaModal open={showNovaEncomenda} onClose={() => setShowNovaEncomenda(false)} />
    </div>
  )
}
