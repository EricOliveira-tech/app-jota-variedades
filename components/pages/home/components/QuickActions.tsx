import { Button } from "@/components/ui/button";
import { Package, Plus } from "lucide-react";

interface QuickActionsProps {
  onNewSale: () => void;
  onNewOrder: () => void;
}

function QuickActions({ onNewSale, onNewOrder }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        size="lg"
        className="h-16 gap-2 bg-primary text-primary-foreground"
        onClick={onNewSale}
        aria-label="Abrir modal de nova venda"
      >
        <Plus className="h-5 w-5" />
        <span className="font-semibold">Nova Venda</span>
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="h-16 gap-2 border-2 bg-transparent"
        onClick={onNewOrder}
        aria-label="Abrir modal de nova encomenda"
      >
        <Package className="h-5 w-5" />
        <span className="font-semibold">Nova Encomenda</span>
      </Button>
    </div>
  );
}

export default QuickActions;
