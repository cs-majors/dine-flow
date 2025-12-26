import { useState, useEffect } from 'react';
import { Clock, CheckCircle, ChefHat, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { KOT, OrderItem } from '@/types/restaurant';
import { cn } from '@/lib/utils';

interface KDSOrderCardProps {
  kot: KOT;
  onAccept: (kotId: string) => void;
  onMarkReady: (kotId: string) => void;
}

export function KDSOrderCard({ kot, onAccept, onMarkReady }: KDSOrderCardProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const start = kot.acceptedAt || kot.createdAt;
      const elapsed = Math.floor((Date.now() - new Date(start).getTime()) / 1000);
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [kot.acceptedAt, kot.createdAt]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isOverdue = elapsedTime > 600; // 10 minutes
  const isWarning = elapsedTime > 300 && !isOverdue; // 5-10 minutes

  const getStatusStyles = () => {
    if (kot.status === 'ready') return 'border-success bg-success/5';
    if (isOverdue) return 'border-destructive bg-destructive/5';
    if (isWarning) return 'border-warning bg-warning/5';
    if (kot.status === 'pending') return 'border-info bg-info/5';
    return 'border-primary/20';
  };

  return (
    <Card
      className={cn(
        "transition-all duration-[160ms] ease-out",
        getStatusStyles(),
        kot.priority === 'rush' && 'ring-2 ring-warning'
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {kot.tableNumber && (
              <Badge variant="default" size="lg" className="font-mono">
                T{kot.tableNumber}
              </Badge>
            )}
            {kot.priority === 'rush' && (
              <Badge variant="warning" size="sm" className="gap-1">
                <AlertTriangle className="w-3 h-3" />
                Rush
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-md text-sm font-mono",
                isOverdue && "bg-destructive/10 text-destructive",
                isWarning && !isOverdue && "bg-warning/10 text-warning-foreground",
                !isWarning && !isOverdue && "bg-muted text-muted-foreground"
              )}
            >
              <Clock className="w-4 h-4" />
              {formatTime(elapsedTime)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary" size="sm" className="capitalize">
            {kot.station}
          </Badge>
          <span className="text-xs text-muted-foreground">
            #{kot.id.slice(-6).toUpperCase()}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        {/* Order Items */}
        <div className="space-y-2">
          {kot.items.map((item, index) => (
            <div
              key={item.id || index}
              className={cn(
                "flex items-start gap-2 p-2 rounded-md bg-background",
                item.status === 'ready' && 'line-through opacity-60'
              )}
            >
              <span
                className={cn(
                  "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold",
                  "bg-primary/10 text-primary"
                )}
              >
                {item.quantity}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{item.menuItem.name}</p>
                {item.modifiers && item.modifiers.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {item.modifiers.map(m => m.name).join(', ')}
                  </p>
                )}
                {item.notes && (
                  <p className="text-xs text-warning mt-1 italic">
                    ⚠️ {item.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          {kot.status === 'pending' && (
            <Button
              variant="kds"
              className="flex-1"
              onClick={() => onAccept(kot.id)}
            >
              <ChefHat className="w-4 h-4 mr-1" />
              Accept
            </Button>
          )}

          {(kot.status === 'accepted' || kot.status === 'preparing') && (
            <Button
              variant="success"
              className="flex-1"
              onClick={() => onMarkReady(kot.id)}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Ready
            </Button>
          )}

          {kot.status === 'ready' && (
            <div className="flex-1 flex items-center justify-center py-2 text-success font-medium">
              <CheckCircle className="w-5 h-5 mr-2" />
              Ready for pickup
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
