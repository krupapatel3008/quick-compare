import { Navigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, CheckCircle2, Truck, MapPin, Clock, ShoppingBag, ArrowRight } from "lucide-react";

const statusColors = {
  placed: "bg-accent text-accent-foreground",
  packed: "bg-primary/80 text-primary-foreground",
  in_transit: "bg-primary text-primary-foreground",
  delivered: "bg-primary text-primary-foreground",
};
const statusLabels = { placed: "Placed", packed: "Packed", in_transit: "In Transit", delivered: "Delivered" };
const stepIcons = [Package, CheckCircle2, Truck, MapPin];

const MyOrders = () => {
  const { currentUser, isLoggedIn } = useAuth();
  const { getUserOrders } = useOrders();

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const myOrders = getUserOrders(currentUser.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="font-display text-3xl font-bold text-foreground">My Orders</h1>
          <p className="mt-1 text-muted-foreground">Track and view your past orders</p>
        </div>

        {myOrders.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center animate-fade-in">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/40" />
            <h2 className="mt-4 font-display text-xl font-bold text-foreground">No orders yet</h2>
            <p className="mt-2 text-muted-foreground">Start shopping to see your orders here</p>
            <Link to="/compare">
              <Button className="mt-6 gap-2">Browse Products <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {myOrders.map((order, idx) => (
              <div key={order.id} className="rounded-xl border border-border bg-card p-6 shadow-card animate-fade-in" style={{ animationDelay: `${idx * 80}ms` }}>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-display font-semibold text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()} · {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${statusColors[order.status]} border-0`}>{statusLabels[order.status]}</Badge>
                    <span className="font-display font-bold text-foreground">₹{order.totalPrice}</span>
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {order.items.map((item, i) => (
                    <span key={i} className="rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                      {item.item.image} {item.item.name} ×{item.quantity}
                    </span>
                  ))}
                </div>

                {/* Tracking timeline */}
                <div className="flex items-center gap-0">
                  {order.trackingSteps.map((step, i) => {
                    const Icon = stepIcons[i];
                    return (
                      <div key={i} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step.done ? "bg-brand-gradient" : "border-2 border-border bg-muted"}`}>
                            <Icon className={`h-4 w-4 ${step.done ? "text-primary-foreground" : "text-muted-foreground"}`} />
                          </div>
                          <p className={`mt-1 text-[10px] ${step.done ? "text-foreground font-medium" : "text-muted-foreground"}`}>{step.label}</p>
                        </div>
                        {i < order.trackingSteps.length - 1 && (
                          <div className={`mx-1 h-0.5 w-8 sm:w-16 ${step.done ? "bg-primary" : "bg-border"}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
