"use client";

import { useState } from "react";
import { BottomNav } from "@/components/bottom-nav";
import { VendasPage } from "@/components/pages/vendas-page";
import { EncomendasPage } from "@/components/pages/encomendas-page";
import { ProdutosPage } from "@/components/pages/produtos-page";
import { RelatoriosPage } from "@/components/pages/relatorios-page";
import { Toaster } from "@/components/ui/toaster";
import { HomePage } from "@/components/pages/home-page";

export type TabType =
  | "home"
  | "vendas"
  | "encomendas"
  | "produtos"
  | "relatorios";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage onNavigate={setActiveTab} />;
      case "vendas":
        return <VendasPage />;
      case "encomendas":
        return <EncomendasPage />;
      case "produtos":
        return <ProdutosPage />;
      case "relatorios":
        return <RelatoriosPage />;
      default:
        return <HomePage onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <main>{renderPage()}</main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      <Toaster />
    </div>
  );
}
