import { useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  CheckCircle2,
  Truck,
  MapPin,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

const statusColors = {
  placed: "bg-accent text-accent-foreground",
  packed: "bg-primary/80 text-primary-foreground",
  in_transit: "bg-primary text-primary-foreground",
  delivered: "bg-primary text-primary-foreground",
};

const statusLabels = {
  placed: "Placed",
  packed: "Packed",
  in_transit: "In Transit",
  delivered: "Delivered",
};

const stepIcons = [Package, CheckCircle2, Truck, MapPin];

const MyOrders = () => {
  const { currentUser, isLoggedIn } = useAuth();
  const { orders, fetchUserOrders } = useOrders();

  useEffect(() => {
    const fetchOrders = async () => {
      const user = currentUser?.user || currentUser; // 🔥 handle nested user

      if (user?.id) {
        await fetchUserOrders(user.id);
      } else {
        console.error("userId not found or undefined!")
      }

      console.log("=====================================");
      console.log("User:", user?.name);
      console.log("Orders:", orders);
    };

    fetchOrders();
  }, [currentUser]);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground">
            Track and view your past orders
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-xl border p-12 text-center">
            <ShoppingBag className="mx-auto h-16 w-16 opacity-40" />
            <h2 className="mt-4 text-xl font-bold">No orders yet</h2>
            <p className="text-muted-foreground">
              Start shopping to see your orders here
            </p>

            <Link to="/compare">
              <Button className="mt-6 gap-2">
                Browse Products <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, idx) => (
              <div
                key={order._id} // ✅ FIXED
                className="rounded-xl border p-6"
              >
                {/* Header */}
                <div className="mb-4 flex justify-between">
                  <div>
                    <p className="font-semibold">
                      {order.orderId || order._id} {/* ✅ FIXED */}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={statusColors[order.status]}>
                      {statusLabels[order.status]}
                    </Badge>

                    <span className="font-bold">
                      ₹{order.totalPrice}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {order.items.map((item) => (
                    <span
                      key={item._id || item.name} // ✅ FIXED
                      className="rounded bg-secondary px-3 py-1 text-sm"
                    >
                      {item.name} ×{item.quantity} {/* ✅ FIXED */}
                    </span>
                  ))}
                </div>

                {/* Tracking */}
                <div className="flex items-center">
                  {order.trackingSteps.map((step, i) => {
                    const Icon = stepIcons[i];

                    return (
                      <div key={step.label} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div
                            className={`h-8 w-8 flex items-center justify-center rounded-full ${step.done
                              ? "bg-primary text-white"
                              : "border"
                              }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>

                          <p className="text-xs mt-1">
                            {step.label}
                          </p>
                        </div>

                        {i < order.trackingSteps.length - 1 && (
                          <div className="mx-2 h-0.5 w-10 bg-border" />
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