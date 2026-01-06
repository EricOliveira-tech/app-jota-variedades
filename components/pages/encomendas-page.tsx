"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Package, Phone } from "lucide-react"
import { encomendas, type StatusEncomenda, type Encomenda } from "@/lib/mock-data"
import { StatusBadge } from "@/components/status-badge"
import { SearchInput } from "@/components/search-input"
import { EmptyState } from "@/components/empty-state"
import { NovaEncomendaModal } from "@/components/modals/nova-encomenda-modal"
import { DetalheEncomendaModal } from "@/components/modals/detalhe-encomenda-modal"
import { cn } from "@/lib/utils"

const statusFilters: { value: StatusEncomenda | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "pendente", label: "Pendente" },
  { value: "chegou", label: "Chegou" },
  { value: "separado", label: "Separado" },
  { value: "entregue", label: "Entregue" },
  { value: "cancelado", label: "Cancelado" },
]

export function EncomendasPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusEncomenda | "todos">("todos")
  const [showNovaEncomenda, setShowNovaEncomenda] = useState(false)
  const [selectedEncomenda, setSelectedEncomenda] = useState<Encomenda | null>(null)

  const filteredEncomendas = encomendas.filter((e) => {
    const matchesSearch = e.cliente.toLowerCase().includes(search.toLowerCase()) || e.telefone.includes(search)
    const matchesStatus = statusFilter === "todos" || e.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const activeCount = encomendas.filter(
    (e) => e.status === "pendente" || e.status === "chegou" || e.status === "separado",
  ).length

  return (
    <div className="flex flex-col">
      <Header title="Encomendas" subtitle={`${activeCount} ativas`} />

      <div className="flex flex-col gap-4 p-4">
        <Button size="lg" className="h-14 gap-2" onClick={() => setShowNovaEncomenda(true)}>
          <Plus className="h-5 w-5" />
          <span className="font-semibold">Nova Encomenda</span>
        </Button>

        <SearchInput value={search} onChange={setSearch} placeholder="Buscar por nome ou telefone..." />

        <div className="flex gap-2 overflow-x-auto pb-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                statusFilter === filter.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {filteredEncomendas.length === 0 ? (
          <EmptyState
            icon={Package}
            title="Nenhuma encomenda encontrada"
            description={
              search || statusFilter !== "todos"
                ? "Tente ajustar os filtros de busca."
                : "Registre sua primeira encomenda clicando no botão acima."
            }
          />
        ) : (
          <div className="flex flex-col gap-3">
            {filteredEncomendas.map((encomenda) => (
              <Card key={encomenda.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => setSelectedEncomenda(encomenda)}
                    className="w-full p-4 text-left hover:bg-muted/50"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{encomenda.cliente}</p>
                        <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {encomenda.telefone}
                        </div>
                      </div>
                      <StatusBadge status={encomenda.status} />
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                      <p className="text-sm text-muted-foreground">
                        {encomenda.itens.length === 1
                          ? `${encomenda.itens[0].quantidade}x ${encomenda.itens[0].nome}`
                          : `${encomenda.itens.length} itens`}
                      </p>
                      <p className="font-semibold text-foreground">
                        R$ {encomenda.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <NovaEncomendaModal open={showNovaEncomenda} onClose={() => setShowNovaEncomenda(false)} />
      <DetalheEncomendaModal encomenda={selectedEncomenda} onClose={() => setSelectedEncomenda(null)} />
    </div>
  )
}
