"use client";

import { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";

export default function ProfileDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
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
      {/* Avatar + Name */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full transition"
      >
        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium hidden sm:block">
          {user?.name}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl border z-50">
          <div className="p-4 border-b">
            <p className="text-sm text-gray-500">Signed in as</p>
            <p className="text-sm font-semibold break-all">
              {user?.email}
            </p>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-b-xl"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}