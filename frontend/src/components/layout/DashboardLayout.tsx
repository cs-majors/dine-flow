import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ClipboardList, 
  Receipt, 
  Users, 
  Settings,
  ChefHat,
  TrendingUp,
  Package,
  CalendarDays,
  Truck,
  LogOut,
  Menu,
  X,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'orders', label: 'Orders', icon: ClipboardList, href: '/dashboard/orders', badge: 5 },
  { id: 'kds', label: 'Kitchen Display', icon: ChefHat, href: '/kds' },
  { id: 'menu', label: 'Menu', icon: UtensilsCrossed, href: '/dashboard/menu' },
  { id: 'tables', label: 'Tables', icon: Users, href: '/dashboard/tables' },
  { id: 'reservations', label: 'Reservations', icon: CalendarDays, href: '/dashboard/reservations' },
  { id: 'delivery', label: 'Delivery', icon: Truck, href: '/dashboard/delivery' },
  { id: 'inventory', label: 'Inventory', icon: Package, href: '/dashboard/inventory' },
  { id: 'reports', label: 'Reports', icon: TrendingUp, href: '/dashboard/reports' },
  { id: 'billing', label: 'Billing', icon: Receipt, href: '/dashboard/billing' },
];

export function DashboardLayout({ children, activeTab = 'overview' }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </Button>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-64",
          "flex flex-col",
          "bg-card text-foreground border-r border-border",
          "transition-transform duration-[240ms] ease-out lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-sidebar-foreground">
                Resto+
              </h1>
              <p className="text-xs text-sidebar-foreground/60">
                Restaurant Management
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <Link
                  key={item.id}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
                    "transition-colors duration-[160ms]",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge variant="accent" size="sm">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User & Settings */}
        <div className="p-2 border-t border-sidebar-border">
          <Link
            to="/dashboard/settings"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
              "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              "transition-colors duration-[160ms]"
            )}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
          <button
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium",
              "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              "transition-colors duration-[160ms]"
            )}
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
          <div className="lg:ml-0 ml-12">
            <h2 className="font-heading font-semibold text-lg text-foreground capitalize">
              {activeTab}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              JD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
