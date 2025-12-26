import { useState } from 'react';
import { Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { KDSOrderCard } from '@/components/resto/KDSOrderCard';
import { KOT, KitchenStation } from '@/types/restaurant';
import { sampleMenuItems } from '@/data/sampleMenu';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Generate sample KOTs
const generateSampleKOTs = (): KOT[] => {
  const now = new Date();
  
  return [
    {
      id: 'kot-001',
      orderId: 'ord-001',
      tableNumber: '5',
      station: 'grill',
      items: [
        {
          id: 'item-1',
          menuItem: sampleMenuItems[1], // Tandoori Chicken
          quantity: 2,
          modifiers: [{ groupId: 'mod-1', optionId: 'opt-2', name: 'Medium', price: 0 }],
          status: 'preparing',
          station: 'grill',
        },
        {
          id: 'item-2',
          menuItem: sampleMenuItems[2], // Paneer Satay
          quantity: 1,
          notes: 'Extra peanut sauce',
          status: 'preparing',
          station: 'grill',
        },
      ],
      status: 'preparing',
      priority: 'normal',
      createdAt: new Date(now.getTime() - 8 * 60000),
      acceptedAt: new Date(now.getTime() - 6 * 60000),
    },
    {
      id: 'kot-002',
      orderId: 'ord-002',
      tableNumber: '3',
      station: 'main',
      items: [
        {
          id: 'item-3',
          menuItem: sampleMenuItems[5], // Butter Chicken
          quantity: 1,
          status: 'preparing',
          station: 'main',
        },
        {
          id: 'item-4',
          menuItem: sampleMenuItems[6], // Dal Makhani
          quantity: 1,
          status: 'preparing',
          station: 'main',
        },
      ],
      status: 'pending',
      priority: 'rush',
      createdAt: new Date(now.getTime() - 2 * 60000),
    },
    {
      id: 'kot-003',
      orderId: 'ord-003',
      tableNumber: 'P1',
      station: 'cold',
      items: [
        {
          id: 'item-5',
          menuItem: sampleMenuItems[0], // Spring Rolls
          quantity: 2,
          status: 'ready',
          station: 'cold',
        },
        {
          id: 'item-6',
          menuItem: sampleMenuItems[4], // Quinoa Bowl
          quantity: 1,
          notes: 'No olives',
          status: 'ready',
          station: 'cold',
        },
      ],
      status: 'ready',
      priority: 'normal',
      createdAt: new Date(now.getTime() - 12 * 60000),
      acceptedAt: new Date(now.getTime() - 10 * 60000),
      readyAt: new Date(now.getTime() - 1 * 60000),
    },
    {
      id: 'kot-004',
      orderId: 'ord-004',
      tableNumber: '8',
      station: 'drinks',
      items: [
        {
          id: 'item-7',
          menuItem: sampleMenuItems[12], // Fresh Lime Soda
          quantity: 2,
          modifiers: [{ groupId: 'mod-3', optionId: 'opt-7', name: 'Sweet', price: 0 }],
          status: 'pending',
          station: 'drinks',
        },
        {
          id: 'item-8',
          menuItem: sampleMenuItems[13], // Mango Lassi
          quantity: 2,
          status: 'pending',
          station: 'drinks',
        },
      ],
      status: 'pending',
      priority: 'normal',
      createdAt: new Date(now.getTime() - 1 * 60000),
    },
    {
      id: 'kot-005',
      orderId: 'ord-005',
      tableNumber: '2',
      station: 'pastry',
      items: [
        {
          id: 'item-9',
          menuItem: sampleMenuItems[10], // Molten Chocolate Cake
          quantity: 1,
          status: 'preparing',
          station: 'pastry',
        },
      ],
      status: 'accepted',
      priority: 'normal',
      createdAt: new Date(now.getTime() - 5 * 60000),
      acceptedAt: new Date(now.getTime() - 4 * 60000),
    },
  ];
};

const stations: { id: KitchenStation | 'all'; label: string }[] = [
  { id: 'all', label: 'All Stations' },
  { id: 'grill', label: 'Grill' },
  { id: 'main', label: 'Main Kitchen' },
  { id: 'cold', label: 'Cold Station' },
  { id: 'pastry', label: 'Pastry' },
  { id: 'drinks', label: 'Drinks' },
];

export default function KitchenDisplay() {
  const [kots, setKots] = useState<KOT[]>(generateSampleKOTs);
  const [activeStation, setActiveStation] = useState<KitchenStation | 'all'>('all');
  const { toast } = useToast();

  const filteredKots = activeStation === 'all'
    ? kots
    : kots.filter(kot => kot.station === activeStation);

  const handleAccept = (kotId: string) => {
    setKots(prev =>
      prev.map(kot =>
        kot.id === kotId
          ? { ...kot, status: 'accepted', acceptedAt: new Date() }
          : kot
      )
    );
    toast({
      title: 'Order Accepted',
      description: 'Order is now being prepared.',
    });
  };

  const handleMarkReady = (kotId: string) => {
    setKots(prev =>
      prev.map(kot =>
        kot.id === kotId
          ? { ...kot, status: 'ready', readyAt: new Date() }
          : kot
      )
    );
    toast({
      title: 'Order Ready',
      description: 'Waiter has been notified.',
    });
  };

  const getStationCount = (station: KitchenStation | 'all') => {
    if (station === 'all') return kots.filter(k => k.status !== 'ready').length;
    return kots.filter(k => k.station === station && k.status !== 'ready').length;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-card border-b border-border">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-xl">👨‍🍳</span>
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl">Kitchen Display</h1>
                <p className="text-sm text-muted-foreground">
                  {filteredKots.filter(k => k.status !== 'ready').length} active orders
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      {/* Station Filter */}
      <div className="sticky top-[65px] z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container py-2">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {stations.map(station => {
              const count = getStationCount(station.id);
              return (
                <button
                  key={station.id}
                  onClick={() => setActiveStation(station.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                    "transition-all duration-[160ms] ease-out flex-shrink-0",
                    activeStation === station.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {station.label}
                  {count > 0 && (
                    <Badge
                      variant={activeStation === station.id ? "secondary" : "default"}
                      size="sm"
                    >
                      {count}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* KOT Grid */}
      <main className="container py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 stagger-children">
          {filteredKots.map(kot => (
            <KDSOrderCard
              key={kot.id}
              kot={kot}
              onAccept={handleAccept}
              onMarkReady={handleMarkReady}
            />
          ))}
        </div>

        {filteredKots.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-6xl mb-4">🎉</span>
            <h2 className="font-heading font-semibold text-xl">All caught up!</h2>
            <p className="text-muted-foreground mt-2">
              No pending orders for this station.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
