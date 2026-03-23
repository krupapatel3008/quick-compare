import { getUsers } from "@/api/adminApi";
import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Badge } from "@/components/ui/badge";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 md:p-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="font-display text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">View all registered users</p>
        </div>

        <div className="space-y-3 animate-fade-in">
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
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
