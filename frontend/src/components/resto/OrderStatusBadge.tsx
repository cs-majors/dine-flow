import { Badge } from '@/components/ui/badge';
import { OrderStatus } from '@/types/restaurant';
import { Clock, ChefHat, CheckCircle, UtensilsCrossed, Receipt, XCircle, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  size?: 'default' | 'sm' | 'lg';
  showIcon?: boolean;
}

const statusConfig: Record<OrderStatus, {
  label: string;
  variant: 'status-new' | 'status-preparing' | 'status-ready' | 'status-served' | 'status-cancelled' | 'secondary';
  icon: typeof Clock;
}> = {
  created: { label: 'New', variant: 'status-new', icon: Clock },
  sent: { label: 'Sent', variant: 'status-new', icon: Send },
  pending: { label: 'Pending', variant: 'status-new', icon: Clock },
  preparing: { label: 'Preparing', variant: 'status-preparing', icon: ChefHat },
  ready: { label: 'Ready', variant: 'status-ready', icon: CheckCircle },
  served: { label: 'Served', variant: 'status-served', icon: UtensilsCrossed },
  billed: { label: 'Billed', variant: 'secondary', icon: Receipt },
  cancelled: { label: 'Cancelled', variant: 'status-cancelled', icon: XCircle },
};

export function OrderStatusBadge({ status, size = 'default', showIcon = true }: OrderStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} size={size} className={cn("gap-1", showIcon && "pl-1.5")}>
      {showIcon && <Icon className={cn("w-3 h-3", size === 'lg' && "w-4 h-4")} />}
      {config.label}
    </Badge>
  );
}
