import { Link, useLocation, useNavigate } from "react-router-dom";
import { BarChart3, ShoppingBag, Package, Users, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const adminNavItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/orders", label: "Order Management", icon: ShoppingBag },
  { to: "/admin/products", label: "Product Management", icon: Package },
  { to: "/admin/users", label: "User Management", icon: Users },
];

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    toast({ title: "👋 Logged out", description: "See you again soon!" });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 flex-col border-r border-border bg-card z-40 overflow-y-auto">
        <div className="p-6 border-b border-border">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              Quick<span className="text-gradient">Compare</span>
            </span>
          </Link>
          <p className="mt-2 text-xs text-muted-foreground">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {adminNavItems.map((item) => (
            <Link key={item.to} to={item.to}>
              <Button
                variant={isActive(item.to) ? "default" : "ghost"}
                className="w-full justify-start gap-3 mb-1"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3 px-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-primary-foreground">
              {currentUser?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">{currentUser?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{currentUser?.email}</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start gap-2 text-destructive hover:text-destructive" onClick={handleLogout}>
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        <header className="md:hidden sticky top-0 z-50 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-xl px-4 py-3">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient">
              <BarChart3 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">Admin</span>
          </Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-foreground">
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </header>

        {/* Mobile Menu */}
        {sidebarOpen && (
          <div className="md:hidden border-b border-border bg-card px-4 py-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {adminNavItems.map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setSidebarOpen(false)}>
                  <Button variant={isActive(item.to) ? "default" : "ghost"} className="w-full justify-start gap-2">
                    <item.icon className="h-4 w-4" /> {item.label}
                  </Button>
                </Link>
              ))}
              <div className="my-2 border-t border-border" />
              <Button variant="ghost" className="w-full justify-start gap-2 text-destructive" onClick={handleLogout}>
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
