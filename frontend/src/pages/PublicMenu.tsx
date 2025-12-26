import { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Search, X, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MenuItemCard } from '@/components/resto/MenuItemCard';
import { CategoryNav } from '@/components/resto/CategoryNav';
import { CartDrawer } from '@/components/resto/CartDrawer';
import { useCart } from '@/hooks/useCart';
import { sampleCategories, sampleMenuItems, sampleOutlet, sampleRestaurant } from '@/data/sampleMenu';
import { MenuItem } from '@/types/restaurant';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface PublicMenuProps {
  tableNumber?: string;
}

export default function PublicMenu({ tableNumber }: PublicMenuProps) {
  const [activeCategory, setActiveCategory] = useState(sampleCategories[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { toast } = useToast();

  const cart = useCart();

  // Filter menu items
  const filteredItems = searchQuery
    ? sampleMenuItems.filter(
        item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sampleMenuItems;

  // Group items by category
  const itemsByCategory = sampleCategories.map(category => ({
    ...category,
    items: filteredItems.filter(item => item.categoryId === category.id),
  }));

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    categoryRefs.current[categoryId]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleAddToCart = (item: MenuItem) => {
    cart.addItem(item, 1);
    toast({
      title: 'Added to cart',
      description: `${item.name} has been added to your order.`,
    });
  };

  const handleCheckout = () => {
    toast({
      title: 'Order placed!',
      description: 'Your order has been sent to the kitchen.',
    });
    cart.clearCart();
    setIsCartOpen(false);
  };

  // Intersection observer for active category
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );

    Object.values(categoryRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-card border-b border-border shadow-sm">
        <div className="container py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Restaurant Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-lg">
                {sampleRestaurant.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <h1 className="font-heading font-semibold text-foreground truncate">
                  {sampleRestaurant.name}
                </h1>
                <p className="text-xs text-muted-foreground truncate">
                  {sampleOutlet.name.split(' - ')[1]}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {tableNumber && (
                <Badge variant="secondary" size="lg" className="font-mono hidden sm:flex">
                  Table {tableNumber}
                </Badge>
              )}

              {/* Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={cn(isSearchOpen && "bg-accent")}
              >
                {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </Button>

              {/* Cart Button */}
              <Button
                variant="default"
                size="default"
                onClick={() => setIsCartOpen(true)}
                className="relative gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden sm:inline">Cart</span>
                {cart.itemCount > 0 && (
                  <Badge
                    variant="accent"
                    size="sm"
                    className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center"
                  >
                    {cart.itemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-[240ms] ease-out",
              isSearchOpen ? "max-h-16 mt-3" : "max-h-0"
            )}
          >
            <Input
              type="search"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full"
              autoFocus={isSearchOpen}
            />
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      {!searchQuery && (
        <CategoryNav
          categories={sampleCategories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      )}

      {/* Menu Content */}
      <main className="container py-6 pb-24">
        {searchQuery ? (
          // Search Results
          <div className="space-y-4 stagger-children">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                {filteredItems.length} results for "{searchQuery}"
              </p>
              <Button variant="ghost" size="sm" onClick={() => setSearchQuery('')}>
                Clear
              </Button>
            </div>
            {filteredItems.map(item => (
              <MenuItemCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
              />
            ))}
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No items found</p>
              </div>
            )}
          </div>
        ) : (
          // Category Sections
          <div className="space-y-8">
            {itemsByCategory.map(category => (
              <section
                key={category.id}
                id={category.id}
                ref={(el: HTMLDivElement | null) => { categoryRefs.current[category.id] = el; }}
                className="scroll-mt-28"
              >
                <div className="mb-4">
                  <h2 className="font-heading font-semibold text-xl text-foreground">
                    {category.name}
                  </h2>
                  {category.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.description}
                    </p>
                  )}
                </div>
                <div className="space-y-3 stagger-children">
                  {category.items.map(item => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Fixed Cart Summary (Mobile) */}
      {cart.itemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-gradient-to-t from-background via-background to-transparent">
          <Button
            variant="touch"
            size="xl"
            className="w-full shadow-lg"
            onClick={() => setIsCartOpen(true)}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Badge variant="accent" className="font-mono">
                  {cart.itemCount}
                </Badge>
                <span>View Cart</span>
              </div>
              <span className="font-semibold">{formatPrice(cart.total)}</span>
            </div>
          </Button>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart.items}
        subtotal={cart.subtotal}
        tax={cart.tax}
        total={cart.total}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeItem}
        onCheckout={handleCheckout}
        getItemTotal={cart.getItemTotal}
      />

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6 mt-auto">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {sampleOutlet.address}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {sampleOutlet.phone}
              </span>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-xs text-muted-foreground/70">
              Powered by <span className="font-semibold text-primary">Resto+</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
