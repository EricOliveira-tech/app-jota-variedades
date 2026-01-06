"use client"

import { Home, ShoppingCart, Package, Box, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TabType } from "@/app/page"

interface BottomNavProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const tabs = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "vendas" as const, label: "Vendas", icon: ShoppingCart },
  { id: "encomendas" as const, label: "Encomendas", icon: Package },
  { id: "produtos" as const, label: "Produtos", icon: Box },
  { id: "relatorios" as const, label: "Relatórios", icon: BarChart3 },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card safe-area-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-3 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className={cn("h-6 w-6", isActive && "text-primary")} />
              <span className={cn("text-xs font-medium", isActive && "text-primary")}>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
