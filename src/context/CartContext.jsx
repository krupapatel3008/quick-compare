import { createContext, useContext, useState } from "react";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item, platform, price) => {
    setCart((prev) => {
      const existing = prev.find(
        (c) => c.item._id === item._id && c.platform === platform
      );

      if (existing) {
        return prev.map((c) =>
          c.item._id === item._id && c.platform === platform
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }

      return [...prev, { item, platform, quantity: 1, price }];
    });
  };

  const removeFromCart = (itemId, platform) => {
    setCart((prev) =>
      prev.filter(
        (c) => !(c.item._id === itemId && c.platform === platform)
      )
    );
  };

  const updateQuantity = (itemId, platform, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId, platform);
      return;
    }

    setCart((prev) =>
      prev.map((c) =>
        c.item._id === itemId && c.platform === platform
          ? { ...c, quantity }
          : c
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, c) => sum + c.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, c) => sum + c.price * c.quantity,
    0
  );

  // ✅ IMPORTANT: Format cart for backend
  const getFormattedCart = () => {
    return cart.map((c) => ({
      productId: c.item._id,
      name: c.item.name,
      price: c.prices,
      quantity: c.quantity,
      platform: c.platform,
      image: c.item.image,
    }));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        getFormattedCart,
      }}
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