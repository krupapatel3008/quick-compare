import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useOrders } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import { Package, MapPin, Truck, CheckCircle2, Search, ShoppingBag, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const stepIcons = [Package, CheckCircle2, Truck, MapPin];

const statusColors = {
  placed: "bg-accent text-accent-foreground",
  packed: "bg-primary/80 text-primary-foreground",
  in_transit: "bg-primary text-primary-foreground",
  delivered: "bg-primary text-primary-foreground",
};
const statusLabels = { placed: "Placed", packed: "Packed", in_transit: "In Transit", delivered: "Delivered" };

const Tracking = () => {
  const { orders } = useOrders();
  const { currentUser, isLoggedIn } = useAuth();
  const [searchId, setSearchId] = useState("");
  const [foundOrder, setFoundOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const trimmed = searchId.trim();
    if (!trimmed) return;
    const order = orders.find((o) => o.id.toLowerCase() === trimmed.toLowerCase());
    setFoundOrder(order || null);
    setSearched(true);
  };

  // Show user's most recent order by default if logged in
  const userOrders = isLoggedIn ? orders.filter((o) => o.userId === currentUser.id) : [];
  const displayOrder = foundOrder || (!searched && userOrders.length > 0 ? userOrders[0] : null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="font-display text-3xl font-bold text-foreground">Order Tracking</h1>
          <p className="mt-1 text-muted-foreground">Track your grocery delivery in real-time</p>
        </div>

        {/* Search by Order ID */}
        <div className="mb-8 flex gap-2 animate-fade-in">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Enter Order ID (e.g. ORD-1234567890)"
              className="pl-10"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch} className="gap-2">
            <Search className="h-4 w-4" /> Track
          </Button>
        </div>

        {displayOrder ? (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card animate-fade-in">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{displayOrder.id}</p>
                <p className="font-display font-semibold text-foreground">
                  {new Date(displayOrder.createdAt).toLocaleDateString()} · {new Date(displayOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <Badge className={`${statusColors[displayOrder.status]} border-0`}>
                {statusLabels[displayOrder.status]}
              </Badge>
            </div>

            {/* Tracking Timeline */}
            <div className="space-y-0">
              {displayOrder.trackingSteps.map((step, i) => {
                const Icon = stepIcons[i];
                return (
                  <div key={step.label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${step.done ? 'bg-brand-gradient' : 'border-2 border-border bg-muted'}`}>
                        <Icon className={`h-5 w-5 ${step.done ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                      </div>
                      {i < displayOrder.trackingSteps.length - 1 && (
                        <div className={`h-12 w-0.5 ${step.done ? 'bg-primary' : 'bg-border'}`} />
                      )}
                    </div>
                    <div className="pb-12">
                      <p className={`font-medium ${step.done ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</p>
                      <p className="text-sm text-muted-foreground">{step.time || "Pending"}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="mt-4 rounded-xl bg-secondary p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Items</span>
                <span className="font-medium text-foreground">{displayOrder.items.length} item{displayOrder.items.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {displayOrder.items?.map((item, i) => {
                  const product = item.item;
                  console.log("Product Item: ", product)  // DEBUG Console
                  return (
                    <span
                      key={i}
                      className="rounded-lg bg-background px-2 py-0.5 text-xs text-foreground"
                    >
                      {product?.image || "🛒"} {product?.name || "Unknown"} ×{item.quantity}
                    </span>
                  );
                })}
              </div>
              <div className="mt-3 flex justify-between text-sm border-t border-border pt-3">
                <span className="text-muted-foreground">Total</span>
                <span className="font-display font-bold text-foreground">₹{displayOrder.totalPrice}</span>
              </div>
            </div>
          </div>
        ) : searched ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center animate-fade-in">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/40" />
            <h2 className="mt-4 font-display text-xl font-bold text-foreground">Order not found</h2>
            <p className="mt-2 text-muted-foreground">Please check the Order ID and try again</p>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-12 text-center animate-fade-in">
            <Package className="mx-auto h-16 w-16 text-muted-foreground/40" />
            <h2 className="mt-4 font-display text-xl font-bold text-foreground">Enter an Order ID</h2>
            <p className="mt-2 text-muted-foreground">
              {isLoggedIn ? (
                <>No orders yet. <Link to="/compare" className="text-primary underline">Start shopping</Link></>
              ) : (
                <>Log in to see your latest order, or enter an Order ID above</>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracking;