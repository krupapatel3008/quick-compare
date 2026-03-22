import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { Button } from "@/components/ui/button";
import { platformLabels } from "@/data/groceries";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    getFormattedCart,
  } = useCart();

  const { currentUser, isLoggedIn } = useAuth();
  const { placeOrder } = useOrders();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Please login first",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    try {
      const formattedCart = getFormattedCart();
      
      await placeOrder(
        currentUser.id,  
        currentUser.name,
        formattedCart,
        totalPrice
      );

      clearCart();

      toast({
        title: "Order Placed! 🎉",
        description: "Your order has been placed successfully",
      });

      navigate("/my-orders");
    } catch (err) {
      toast({
        title: "Error",
        description: err.msg || "Failed to place order",
        variant: "destructive",
      });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 opacity-40" />
          <h2 className="mt-4 text-2xl font-bold">Your cart is empty</h2>
          <Link to="/compare">
            <Button className="mt-6 gap-2">
              Browse Products <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Shopping Cart ({totalItems})
        </h1>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            {cart.map((c) => (
              <div
                key={`${c.item.id}-${c.platform}`}
                className="flex items-center gap-4 border p-4 rounded-xl"
              >
                <span>{c.item.image}</span>

                <div className="flex-1">
                  <h3>{c.item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {platformLabels[c.platform]}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    onClick={() =>
                      updateQuantity(
                        c.item.id,
                        c.platform,
                        c.quantity - 1
                      )
                    }
                  >
                    <Minus />
                  </Button>

                  <span>{c.quantity}</span>

                  <Button
                    size="icon"
                    onClick={() =>
                      updateQuantity(
                        c.item.id,
                        c.platform,
                        c.quantity + 1
                      )
                    }
                  >
                    <Plus />
                  </Button>
                </div>

                <p>₹{c.price * c.quantity}</p>

                <Button
                  size="icon"
                  onClick={() =>
                    removeFromCart(c.item.id, c.platform)
                  }
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
          </div>

          <div className="border p-6 rounded-xl">
            <h2 className="text-lg font-bold mb-4">Summary</h2>

            <p>Total: ₹{totalPrice}</p>

            <Button className="mt-4 w-full" onClick={handleCheckout}>
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;