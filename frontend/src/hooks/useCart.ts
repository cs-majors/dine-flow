import { useState, useCallback, useMemo } from 'react';
import { CartItem, MenuItem } from '@/types/restaurant';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((menuItem: MenuItem, quantity: number = 1, modifiers?: CartItem['modifiers'], notes?: string) => {
    setItems(prev => {
      // Check if item with same modifiers already exists
      const existingIndex = prev.findIndex(
        item => 
          item.menuItem.id === menuItem.id && 
          JSON.stringify(item.modifiers) === JSON.stringify(modifiers)
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      return [...prev, { menuItem, quantity, modifiers, notes }];
    });
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateQuantity = useCallback((index: number, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter((_, i) => i !== index));
      return;
    }
    
    setItems(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], quantity };
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getItemTotal = useCallback((item: CartItem): number => {
    const modifiersTotal = item.modifiers?.reduce((sum, mod) => sum + mod.price, 0) || 0;
    return (item.menuItem.price + modifiersTotal) * item.quantity;
  }, []);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + getItemTotal(item), 0);
    const tax = Math.round(subtotal * 0.05); // 5% GST simplified
    const total = subtotal + tax;
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    return { subtotal, tax, total, itemCount };
  }, [items, getItemTotal]);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemTotal,
    ...totals,
  };
}
