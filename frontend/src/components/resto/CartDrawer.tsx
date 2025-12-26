import { Minus, Plus, Trash2, ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/types/restaurant';
import { cn } from '@/lib/utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
  getItemTotal: (item: CartItem) => number;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  subtotal,
  tax,
  total,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  getItemTotal,
}: CartDrawerProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm",
          "transition-opacity duration-[240ms]",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-full max-w-md",
          "bg-background border-l border-border shadow-lg",
          "flex flex-col",
          "transition-transform duration-[240ms] ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-semibold text-lg">Your Order</h2>
            <Badge variant="secondary" size="sm">
              {items.reduce((sum, item) => sum + item.quantity, 0)} items
            </Badge>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Add items from the menu to get started
              </p>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.menuItem.id}-${index}`}
                className="flex gap-3 p-3 bg-card rounded-lg border border-border/50 animate-fade-up"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "flex-shrink-0 w-3 h-3 rounded-sm border-2",
                          item.menuItem.isVeg ? "border-success bg-success/20" : "border-destructive bg-destructive/20"
                        )}
                      />
                      <h4 className="font-medium text-sm truncate">
                        {item.menuItem.name}
                      </h4>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => onRemoveItem(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Modifiers */}
                  {item.modifiers && item.modifiers.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.modifiers.map(m => m.name).join(', ')}
                    </p>
                  )}

                  {/* Notes */}
                  {item.notes && (
                    <p className="text-xs text-muted-foreground/70 mt-1 italic">
                      Note: {item.notes}
                    </p>
                  )}

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className="h-7 w-7"
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-6 text-center font-medium text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className="h-7 w-7"
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <span className="font-semibold text-sm">
                      {formatPrice(getItemTotal(item))}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with totals */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 bg-card">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST (5%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>

            <Button
              className="w-full mt-4"
              size="lg"
              variant="touch"
              onClick={onCheckout}
            >
              Place Order
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
