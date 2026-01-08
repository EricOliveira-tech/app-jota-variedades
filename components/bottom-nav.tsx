"use client";

import { Home, ShoppingCart, Package, Box, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TabType } from "@/app/page";

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}
interface TabItem {
  id: TabType;
  label: string;
  icon: React.ElementType;
}

const tabs: TabItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "vendas", label: "Vendas", icon: ShoppingCart },
  { id: "encomendas", label: "Encomendas", icon: Package },
  { id: "produtos", label: "Produtos", icon: Box },
  { id: "relatorios", label: "Relatórios", icon: BarChart3 },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card"
      role="tablist"
      aria-label="Navegação inferior"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              role="tab"
              aria-selected={isActive}
              aria-label={label}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-3 transition-colors focus:outline-none",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
