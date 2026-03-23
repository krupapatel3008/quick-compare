import { updateOrderStatusApi } from "@/api/adminApi";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Package, ShoppingBag, CheckCircle2, Truck, MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
const steps = ["placed", "packed", "in_transit", "delivered"];

const AdminOrders = () => {
  const { orders, fetchAllOrders } = useOrders();
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllOrders({ status: statusFilter, search });
  }, []);

  const handleOrderSearch = async () => {
    await fetchAllOrders({ status: statusFilter, search });
  };

  const handleUpdateOrder = async (orderId, status) => {
    try {
      await updateOrderStatusApi(orderId, status);
      toast({ title: "Order Updated", description: `Status changed to ${status}` });
      await fetchAllOrders({ status: statusFilter, search });
    } catch (err) {
      toast({ title: "Error", description: err.msg, variant: "destructive" });
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="font-display text-3xl font-bold text-foreground">Order Management</h1>
          <p className="text-muted-foreground">View and update order statuses</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end animate-fade-in">
          <div className="flex-1 space-y-1">
            <label className="text-sm font-medium text-foreground">Search</label>
            <Input
              placeholder="Search by Order ID or User"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-48"
            >
              <option value="all">All</option>
              <option value="placed">Placed</option>
              <option value="packed">Packed</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <Button onClick={handleOrderSearch}>Search</Button>
        </div>

        {/* Orders List */}
        <div className="space-y-4 animate-fade-in">
          {orders.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-12 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/40" />
              <p className="mt-3 text-muted-foreground">No orders found</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="rounded-xl border border-border bg-card p-6 shadow-card">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-display font-semibold text-foreground">{order.orderId}</p>
                    <p className="text-sm text-muted-foreground">by {order.userName} · {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${statusColors[order.status]} border-0`}>{statusLabels[order.status]}</Badge>
                    <span className="font-display font-bold text-foreground">₹{order.totalPrice}</span>
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {order.items.map((item, idx) => (
                    <span key={idx} className="rounded-lg bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                      {item.name} ×{item.quantity}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {order.trackingSteps.map((step, i) => {
                    const Icon = stepIcons[i];
                    return (
                      <Button
                        key={step.label}
                        size="sm"
                        variant={step.done ? "default" : "outline"}
                        className="gap-1.5"
                        disabled={!order.trackingSteps[i - 1]?.done && i !== 0}
                        onClick={() => handleUpdateOrder(order.orderId, steps[i])}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {step.label}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
