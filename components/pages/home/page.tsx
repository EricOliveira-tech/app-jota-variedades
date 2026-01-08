"use client";

import React, { useState, useCallback, useMemo, memo } from "react";

import { Header } from "@/components/header";
import {
  getSalesSummary,
  getLowStockProducts,
  getPendingOrders,
  LATEST_SALES,
} from "@/lib/mock-data";
import type { TabType } from "@/app/page";
import { NovaVendaModal as NewSaleModal } from "@/components/modals/nova-venda-modal";
import { NovaEncomendaModal as NewOrderModal } from "@/components/modals/nova-encomenda-modal";
import LowStockAlert from "./components/LowStockAlert";
import DailySummary from "./components/DailySummary";
import PendingOrdersAlert from "./components/PendingOrdersAlert";
import LatestSales from "./components/LatestSales";
import QuickActions from "./components/QuickActions";

interface HomePageProps {
  onNavigate: (tab: TabType) => void;
}

const MemoQuickActions = memo(QuickActions);
const MemoDailySummary = memo(DailySummary);
const MemoLowStockAlert = memo(LowStockAlert);
const MemoPendingOrdersAlert = memo(PendingOrdersAlert);
const MemoLatestSales = memo(LatestSales);

interface HomePageProps {
  onNavigate: (tab: TabType) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  // Precompute summaries and counts once on mount
  const summary = useMemo(() => getSalesSummary(), []);
  const lowStockProducts = useMemo(() => getLowStockProducts(), []);
  const pendingOrders = useMemo(() => getPendingOrders(), []);

  // Maintain modal visibility state
  const [showNewSaleModal, setShowNewSaleModal] = useState(false);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);

  // Compute the localized date string once
  const todayString = useMemo(() => {
    const now = new Date();
    return now.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }, []);

  // Handlers to open/close the new sale modal
  const openNewSaleModal = useCallback(() => {
    setShowNewSaleModal(true);
  }, []);
  const closeNewSaleModal = useCallback(() => {
    setShowNewSaleModal(false);
  }, []);

  // Handlers to open/close the new order modal
  const openNewOrderModal = useCallback(() => {
    setShowNewOrderModal(true);
  }, []);
  const closeNewOrderModal = useCallback(() => {
    setShowNewOrderModal(false);
  }, []);

  // Navigation handlers for each tab
  const navigateToProducts = useCallback(() => {
    onNavigate("produtos");
  }, [onNavigate]);
  const navigateToOrders = useCallback(() => {
    onNavigate("encomendas");
  }, [onNavigate]);
  const navigateToSales = useCallback(() => {
    onNavigate("vendas");
  }, [onNavigate]);

  return (
    <div className="flex flex-col">
      <Header title="J Variedades" subtitle={`Hoje, ${todayString}`} />
      <div className="flex flex-col gap-4 p-4">
        <MemoQuickActions
          onNewSale={openNewSaleModal}
          onNewOrder={openNewOrderModal}
        />
        <MemoDailySummary summary={summary} />
        {lowStockProducts.length > 0 && (
          <MemoLowStockAlert
            count={lowStockProducts.length}
            onClick={navigateToProducts}
          />
        )}
        {pendingOrders.length > 0 && (
          <MemoPendingOrdersAlert
            count={pendingOrders.length}
            onClick={navigateToOrders}
          />
        )}
        <MemoLatestSales sales={LATEST_SALES} onViewAll={navigateToSales} />
      </div>
      <NewSaleModal open={showNewSaleModal} onClose={closeNewSaleModal} />
      <NewOrderModal open={showNewOrderModal} onClose={closeNewOrderModal} />
    </div>
  );
}

export default HomePage;
