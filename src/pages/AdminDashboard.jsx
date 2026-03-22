import { getUsers, updateOrderStatusApi } from "@/api/adminApi";
import { getCategories, addCategory } from "@/api/categoryApi";
import { getGroceries, addGrocery } from "@/api/groceryApi";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { platformLabels, mockGroceries } from "@/data/groceries";
import {
  Package, Users, ShoppingBag, LayoutDashboard,
  CheckCircle2, Clock, Truck, MapPin, Plus, Trash2, Edit
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

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [users, setUsers] = useState([]);
  const { isAdmin, currentUser } = useAuth();
  const { orders } = useOrders();
  const { toast } = useToast();
  const [tab, setTab] = useState("orders");
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", category: "", image: "", unit: "" });

  if (!currentUser) return null;
  if (!isAdmin) return <Navigate to="/login" replace />;


  useEffect(() => {
    // FETCH USERS
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    // FETCH PRODUCTS
    const fetchProducts = async () => {
      try {
        const data = await getGroceries();
        setProducts(data);
      } catch (err) {
        console.log(err);
      }

    };

    // FETCH CATEGORY
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
    fetchCategories();
    fetchUsers();
  }, []);

  // CATEGORY HANDLER
  const handleAddCategory = async () => {
    if (!newCategory) return;

    const cat = await addCategory(newCategory);
    setCategories((prev) => [...prev, cat]);
    setNewCategory("");
  };


  // ADD PRODUCT (backend)
  const addProduct = async () => {
    if (!newProduct.name || !newProduct.category || !newProduct.unit) {
      toast({ title: "Fill all fields", variant: "destructive" });
      return;
    }

    try {
      const product = await addGrocery(newProduct);
      setProducts((prev) => [...prev, product]);

      setNewProduct({
        name: "",
        category: "",
        image: "🛒",
        unit: ""
      });

      toast({ title: "Product added!" });
    } catch (err) {
      toast({ title: "Error adding product", variant: "destructive" });
    }
  };

  const removeProduct = (id) => {
    setProducts(products.filter((p) => p._id !== id));
    toast({ title: "Product removed" });
  };

  const tabs = [
    { id: "orders", label: "Orders", icon: ShoppingBag, count: orders.length },
    { id: "products", label: "Products", icon: Package, count: products.length },
    { id: "users", label: "Users", icon: Users, count: users.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient">
              <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage orders, products & users</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3 animate-fade-in">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-4 rounded-xl border p-5 text-left transition-all ${tab === t.id
                ? "border-primary bg-primary/5 shadow-card"
                : "border-border bg-card hover:shadow-card"
                }`}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${tab === t.id ? "bg-brand-gradient" : "bg-secondary"}`}>
                <t.icon className={`h-6 w-6 ${tab === t.id ? "text-primary-foreground" : "text-muted-foreground"}`} />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-foreground">{t.count}</p>
                <p className="text-sm text-muted-foreground">{t.label}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {tab === "orders" && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-display text-xl font-bold text-foreground">All Orders</h2>
            {orders.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/40" />
                <p className="mt-3 text-muted-foreground">No orders yet</p>
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
                    {/* {order.items.map((item, idx) => (
                      <span key={idx} className="rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                        {item.item.image} {item.item.name} ×{item.quantity}
                      </span>
                    ))} */}
                    {order.items.map((item, idx) => (
                      <span key={idx}>
                        {item.name} ×{item.quantity}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {order.trackingSteps.map((step, i) => {
                      const Icon = stepIcons[i];
                      return (
                        <Button
                          key={i}
                          size="sm"
                          variant={step.done ? "default" : "outline"}
                          className="gap-1.5"
                          // onClick={() => updateOrderStatus(order.orderId, i)}
                          onClick={() => {
                            const steps = ["placed", "packed", "in_transit", "delivered"];
                            updateOrderStatusApi(order.orderId, steps[i]);
                          }}
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
        )}



        {/* Products Tab */}
        {tab === "products" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-display text-xl font-bold text-foreground">Manage Products</h2>

            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="mb-2 font-display font-semibold text-foreground">Add New Category</h3>
              {/* Category Add */}
              <div className="flex gap-2 mb-10 w-full">
                <Input
                  placeholder="New category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-[1/2]"
                />
                <Button onClick={handleAddCategory}>Add</Button>
              </div>
              <h3 className="mb-2 font-display font-semibold text-foreground">Add New Product</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1">
                  <Label>Name</Label>
                  <Input placeholder="Product name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <Label>Category</Label>
                  {/* <Input placeholder="e.g. Dairy" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} /> */}
                  <select
                    className="w-full border rounded px-3 py-2"
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label>Unit</Label>
                  <Input placeholder="e.g. 1 kg" value={newProduct.unit} onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <Label>Emoji</Label>
                  <Input placeholder="🛒" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
                </div>
              </div>

              <Button className="mt-4 gap-2" onClick={addProduct}><Plus className="h-4 w-4" /> Add Product</Button>
            </div>

            <div className="space-y-3">
              {products.map((p) => (
                <div key={p.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
                  <span className="text-2xl">{p.image}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-foreground truncate">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{p.category} · {p.unit}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeProduct(p.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {tab === "users" && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-display text-xl font-bold text-foreground">All Users</h2>
            {users.map((user) => (
              <div key={user._id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-display font-bold text-secondary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-foreground">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <Badge className={`border-0 ${user.role === "admin" ? "bg-brand-gradient text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  {user.role}
                </Badge>
                <p className="text-xs text-muted-foreground hidden sm:block">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
