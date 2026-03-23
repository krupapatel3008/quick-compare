import { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";

export default function ProfileDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 px-3 py-2 rounded-full transition"
      >
        <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center font-semibold text-primary-foreground text-sm">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-foreground hidden sm:block">
          {user?.name}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-card shadow-card-hover rounded-xl border border-border z-50">
          <div className="p-4 border-b border-border">
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <p className="text-sm font-semibold text-foreground break-all">
              {user?.email}
            </p>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 w-full px-4 py-3 text-sm text-destructive hover:bg-destructive/10 rounded-b-xl transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
