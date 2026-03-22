import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, BarChart3, Truck, User, LogIn, Menu, X, LayoutDashboard, LogOut, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const { currentUser, isLoggedIn, isAdmin, logout } = useAuth();

  const navItems = [
    { to: "/", label: "Home", icon: BarChart3 },
    { to: "/compare", label: "Compare", icon: ShoppingCart },
    { to: "/tracking", label: "Track Order", icon: Truck },
  ];

  if (isLoggedIn) navItems.push({ to: "/my-orders", label: "My Orders", icon: Package });
  if (isAdmin) navItems.push({ to: "/admin", label: "Admin", icon: LayoutDashboard });

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Quick<span className="text-gradient">Compare</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              <Button variant={isActive(item.to) ? "default" : "ghost"} size="sm" className="gap-2">
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/cart">
            <Button variant={isActive("/cart") ? "default" : "ghost"} size="sm" className="gap-2 relative">
              <ShoppingCart className="h-4 w-4" />
              Cart
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          {isLoggedIn ? (
            <>
              <span className="text-sm text-muted-foreground">{currentUser.name}</span>
              <Button variant="ghost" size="sm" className="gap-2" onClick={logout}>
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" /> Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="gap-2">
                  <User className="h-4 w-4" /> Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden animate-fade-in">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}>
                <Button variant={isActive(item.to) ? "default" : "ghost"} className="w-full justify-start gap-2">
                  <item.icon className="h-4 w-4" /> {item.label}
                </Button>
              </Link>
            ))}
            <div className="my-2 border-t border-border" />
            {isLoggedIn ? (
              <>
                <p className="px-3 text-sm text-muted-foreground">Signed in as {currentUser.name}</p>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => { logout(); setMobileOpen(false); }}>
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <LogIn className="h-4 w-4" /> Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full justify-start gap-2">
                    <User className="h-4 w-4" /> Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
