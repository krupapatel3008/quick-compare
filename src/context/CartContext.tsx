import { createContext, useContext, useState, ReactNode } from "react";
import { GroceryItem, Platform, platformLabels } from "@/data/groceries";

export interface CartItem {
  item: GroceryItem;
  platform: Platform;
  quantity: number;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: GroceryItem, platform: Platform, price: number) => void;
  removeFromCart: (itemId: string, platform: Platform) => void;
  updateQuantity: (itemId: string, platform: Platform, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: GroceryItem, platform: Platform, price: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id && c.platform === platform);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id && c.platform === platform
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }
      return [...prev, { item, platform, quantity: 1, price }];
    });
  };

  const removeFromCart = (itemId: string, platform: Platform) => {
    setCart((prev) => prev.filter((c) => !(c.item.id === itemId && c.platform === platform)));
  };

  const updateQuantity = (itemId: string, platform: Platform, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId, platform);
      return;
    }
    setCart((prev) =>
      prev.map((c) =>
        c.item.id === itemId && c.platform === platform ? { ...c, quantity } : c
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, c) => sum + c.quantity, 0);
  const totalPrice = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
