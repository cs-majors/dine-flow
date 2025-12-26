import { Plus, Leaf, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MenuItem } from '@/types/restaurant';
import { cn } from '@/lib/utils';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  className?: string;
}

export function MenuItemCard({ item, onAddToCart, className }: MenuItemCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className={cn(
        "group flex gap-4 p-4 bg-card rounded-lg border border-border/50",
        "transition-all duration-[160ms] ease-out",
        "hover:border-primary/20 hover:shadow-md",
        className
      )}
    >
      {/* Image */}
      {item.image ? (
        <div className="relative flex-shrink-0 w-24 h-24 rounded-md overflow-hidden bg-muted">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="flex-shrink-0 w-24 h-24 rounded-md bg-muted flex items-center justify-center">
          <span className="text-3xl opacity-50">🍽️</span>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* Veg/Non-Veg indicator */}
            <span
              className={cn(
                "flex-shrink-0 w-4 h-4 rounded-sm border-2 flex items-center justify-center",
                item.isVeg
                  ? "border-success"
                  : "border-destructive"
              )}
            >
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  item.isVeg ? "bg-success" : "bg-destructive"
                )}
              />
            </span>
            <h3 className="font-semibold text-foreground truncate">
              {item.name}
            </h3>
          </div>
          {item.isVegan && (
            <Badge variant="vegan" size="sm" className="flex-shrink-0">
              <Leaf className="w-3 h-3 mr-1" />
              Vegan
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Meta info */}
        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          {item.calories && <span>{item.calories} cal</span>}
          {item.prepTime && <span>~{item.prepTime} min</span>}
          {item.allergens && item.allergens.length > 0 && (
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-warning" />
              {item.allergens.slice(0, 2).join(', ')}
              {item.allergens.length > 2 && '...'}
            </span>
          )}
        </div>

        {/* Price & Add button */}
        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold text-foreground">
            {formatPrice(item.price)}
          </span>
          <Button
            size="sm"
            variant={item.isAvailable ? "default" : "secondary"}
            disabled={!item.isAvailable}
            onClick={() => onAddToCart(item)}
            className="gap-1"
          >
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
