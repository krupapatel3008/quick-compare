import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, BarChart3, Truck, User, LogIn, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home", icon: BarChart3 },
    { to: "/compare", label: "Compare", icon: ShoppingCart },
    { to: "/tracking", label: "Track Order", icon: Truck },
  ];

  const isActive = (path: string) => location.pathname === path;

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

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              <Button
                variant={isActive(item.to) ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="gap-2">
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="gap-2">
              <User className="h-4 w-4" />
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden animate-fade-in">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}>
                <Button
                  variant={isActive(item.to) ? "default" : "ghost"}
                  className="w-full justify-start gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="my-2 border-t border-border" />
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
            <Link to="/register" onClick={() => setMobileOpen(false)}>
              <Button className="w-full justify-start gap-2">
                <User className="h-4 w-4" />
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
