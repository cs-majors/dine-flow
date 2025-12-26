// Resto+ Type Definitions

export type UserRole = 
  | 'owner'
  | 'admin'
  | 'manager'
  | 'chef'
  | 'waiter'
  | 'cashier'
  | 'rider'
  | 'customer';

export type OrderStatus = 
  | 'created'
  | 'sent'
  | 'pending'
  | 'preparing'
  | 'ready'
  | 'served'
  | 'billed'
  | 'cancelled';

export type OrderType = 
  | 'dine-in'
  | 'takeaway'
  | 'delivery'
  | 'catering';

export type KitchenStation = 
  | 'grill'
  | 'cold'
  | 'pastry'
  | 'drinks'
  | 'main';

export interface Restaurant {
  id: string;
  name: string;
  gstin?: string;
  logo?: string;
  locations: Outlet[];
}

export interface Outlet {
  id: string;
  restaurantId: string;
  name: string;
  address: string;
  phone: string;
  timezone: string;
  tables: Table[];
  isActive: boolean;
}

export interface Table {
  id: string;
  number: string;
  seats: number;
  section: string;
  qrCode: string;
  status: 'available' | 'occupied' | 'reserved';
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isVeg: boolean;
  isVegan?: boolean;
  allergens?: string[];
  calories?: number;
  prepTime?: number;
  station: KitchenStation;
  modifiers?: ModifierGroup[];
  isAvailable: boolean;
  tags?: string[];
}

export interface ModifierGroup {
  id: string;
  name: string;
  required: boolean;
  maxSelect: number;
  options: ModifierOption[];
}

export interface ModifierOption {
  id: string;
  name: string;
  price: number;
}

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  modifiers?: { groupId: string; optionId: string; name: string; price: number }[];
  notes?: string;
  status: OrderStatus;
  station: KitchenStation;
}

export interface Order {
  id: string;
  outletId: string;
  tableId?: string;
  tableNumber?: string;
  customerId?: string;
  customerName?: string;
  type: OrderType;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
  assignedWaiter?: string;
}

export interface KOT {
  id: string;
  orderId: string;
  tableNumber?: string;
  station: KitchenStation;
  items: OrderItem[];
  status: 'pending' | 'accepted' | 'preparing' | 'ready';
  priority: 'normal' | 'rush';
  createdAt: Date;
  acceptedAt?: Date;
  readyAt?: Date;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  modifiers?: { groupId: string; optionId: string; name: string; price: number }[];
  notes?: string;
}
