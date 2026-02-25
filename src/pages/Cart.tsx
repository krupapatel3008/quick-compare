import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { platformLabels } from "@/data/groceries";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center animate-fade-in">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/40" />
          <h2 className="mt-4 font-display text-2xl font-bold text-foreground">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Start comparing prices and add items to your cart</p>
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
        <div className="mb-8 flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Shopping Cart</h1>
            <p className="mt-1 text-muted-foreground">{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
          </div>
          <Button variant="outline" size="sm" onClick={clearCart} className="gap-2 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" /> Clear All
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-3 lg:col-span-2">
            {cart.map((c, i) => (
              <div
                key={`${c.item.id}-${c.platform}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="text-3xl">{c.item.image}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-card-foreground truncate">{c.item.name}</h3>
                  <p className="text-sm text-muted-foreground">{c.item.unit} · {platformLabels[c.platform]}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(c.item.id, c.platform, c.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-display font-bold text-foreground">{c.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(c.item.id, c.platform, c.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold text-foreground">₹{c.price * c.quantity}</p>
                  {c.quantity > 1 && (
                    <p className="text-xs text-muted-foreground">₹{c.price} each</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeFromCart(c.item.id, c.platform)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-card h-fit animate-fade-in">
            <h2 className="font-display text-lg font-bold text-card-foreground mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Fee</span>
                <span className="text-primary font-medium">FREE</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-display font-bold text-foreground text-base">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
            <Button className="mt-6 w-full gap-2" size="lg">
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Button>
            <Link to="/compare">
              <Button variant="ghost" className="mt-2 w-full text-muted-foreground">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
