import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  ShoppingCart, 
  Users, 
  Clock,
  ChefHat,
  UtensilsCrossed,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { OrderStatusBadge } from '@/components/resto/OrderStatusBadge';
import { cn } from '@/lib/utils';

// Mock data for dashboard
const stats = [
  {
    title: 'Today\'s Revenue',
    value: '₹42,580',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Orders',
    value: '64',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
  },
  {
    title: 'Avg. Order Value',
    value: '₹665',
    change: '-2.3%',
    trend: 'down',
    icon: TrendingUp,
  },
  {
    title: 'Avg. Prep Time',
    value: '18 min',
    change: '-15%',
    trend: 'up',
    icon: Clock,
  },
];

const recentOrders = [
  { id: 'ORD-001', table: '5', items: 4, total: 1245, status: 'preparing' as const, time: '2 min ago' },
  { id: 'ORD-002', table: '3', items: 2, total: 680, status: 'ready' as const, time: '5 min ago' },
  { id: 'ORD-003', table: 'D-12', items: 6, total: 2100, status: 'sent' as const, time: '8 min ago' },
  { id: 'ORD-004', table: '8', items: 3, total: 890, status: 'served' as const, time: '12 min ago' },
];

const kitchenAlerts = [
  { station: 'Grill', pendingItems: 8, avgTime: '12 min' },
  { station: 'Main', pendingItems: 5, avgTime: '15 min' },
  { station: 'Cold', pendingItems: 3, avgTime: '8 min' },
  { station: 'Drinks', pendingItems: 4, avgTime: '3 min' },
];

const lowStockItems = [
  { name: 'Salmon Fillet', stock: 2, unit: 'portions' },
  { name: 'Fresh Cream', stock: 500, unit: 'ml' },
  { name: 'Paneer', stock: 400, unit: 'g' },
];

export default function Dashboard() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <DashboardLayout activeTab="overview">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
            
            return (
              <Card key={stat.title} className="hover-lift">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-heading font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={cn(
                      "p-2 rounded-lg",
                      stat.trend === 'up' ? "bg-success/10" : "bg-destructive/10"
                    )}>
                      <Icon className={cn(
                        "w-5 h-5",
                        stat.trend === 'up' ? "text-success" : "text-destructive"
                      )} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendIcon className={cn(
                      "w-4 h-4",
                      stat.trend === 'up' ? "text-success" : "text-destructive"
                    )} />
                    <span className={cn(
                      "text-sm font-medium",
                      stat.trend === 'up' ? "text-success" : "text-destructive"
                    )}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-muted-foreground">vs yesterday</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg font-heading">Recent Orders</CardTitle>
                <CardDescription>Latest orders from all channels</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/orders" className="gap-1">
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOrders.map(order => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-[160ms]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <UtensilsCrossed className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{order.id}</span>
                          <Badge variant="secondary" size="sm">
                            {order.table.startsWith('D') ? 'Delivery' : `Table ${order.table}`}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.items} items • {order.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <OrderStatusBadge status={order.status} />
                      <span className="font-semibold">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Kitchen Status */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg font-heading">Kitchen Status</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {kitchenAlerts.map(station => (
                    <div
                      key={station.station}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="w-16 justify-center">
                          {station.station}
                        </Badge>
                        <span className="text-sm">
                          <span className="font-medium">{station.pendingItems}</span> pending
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ~{station.avgTime}
                      </span>
                    </div>
                  ))}
                </div>
                <Button variant="kds" className="w-full mt-4" asChild>
                  <Link to="/kds">
                    Open Kitchen Display
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Low Stock Alert */}
            <Card className="border-warning/50 bg-warning/5">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <CardTitle className="text-lg font-heading">Low Stock Alert</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lowStockItems.map(item => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                    >
                      <span className="text-sm font-medium">{item.name}</span>
                      <Badge variant="warning" size="sm">
                        {item.stock} {item.unit}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3" asChild>
                  <Link to="/dashboard/inventory">
                    Manage Inventory
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-heading">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" asChild>
                <Link to="/menu">
                  <UtensilsCrossed className="w-4 h-4 mr-2" />
                  View Public Menu
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/kds">
                  <ChefHat className="w-4 h-4 mr-2" />
                  Kitchen Display
                </Link>
              </Button>
              <Button variant="outline">
                <Users className="w-4 h-4 mr-2" />
                New Reservation
              </Button>
              <Button variant="outline">
                <DollarSign className="w-4 h-4 mr-2" />
                POS Checkout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
