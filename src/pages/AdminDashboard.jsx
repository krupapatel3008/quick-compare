import { getUsers } from "@/api/adminApi";
import { getGroceries } from "@/api/groceryApi";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import AdminLayout from "@/components/AdminLayout";
import {
  Package, Users, ShoppingBag, LayoutDashboard,
  TrendingUp, ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const { orders, fetchAllOrders } = useOrders();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllOrders({});
    const fetchData = async () => {
      try {
        const [usersData, productsData] = await Promise.all([getUsers(), getGroceries()]);
        setUsers(usersData);
        setProducts(productsData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const deliveredOrders = orders.filter(o => o.status === "delivered").length;
  const pendingOrders = orders.filter(o => o.status !== "delivered").length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  const stats = [
    { label: "Total Orders", value: orders.length, icon: ShoppingBag, color: "bg-brand-gradient", link: "/admin/orders" },
    { label: "Products", value: products.length, icon: Package, color: "bg-accent", link: "/admin/products" },
    { label: "Users", value: users.length, icon: Users, color: "bg-primary/80", link: "/admin/users" },
    { label: "Revenue", value: `₹${totalRevenue}`, icon: TrendingUp, color: "bg-brand-gradient-warm", link: "/admin/orders" },
  ];

  return (
    <AdminLayout>
      <div className="p-6 md:p-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient">
              <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {currentUser?.name}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((s) => (
            <Link key={s.label} to={s.link} className="group">
              <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-0.5">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${s.color}`}>
                  <s.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Overview */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Pending Orders</span>
                <span className="font-display font-bold text-foreground">{pendingOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Delivered</span>
                <span className="font-display font-bold text-primary">{deliveredOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Orders</span>
                <span className="font-display font-bold text-foreground">{orders.length}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Recent Orders</h3>
            {orders.length === 0 ? (
              <p className="text-muted-foreground text-sm">No orders yet</p>
            ) : (
              <div className="space-y-3">
                {orders.slice(0, 5).map((order) => (
                  <div key={order._id} className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium text-foreground">{order.orderId}</p>
                      <p className="text-xs text-muted-foreground">{order.userName}</p>
                    </div>
                    <span className="font-display font-bold text-foreground">₹{order.totalPrice}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
