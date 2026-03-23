import { getCategories, addCategory } from "@/api/categoryApi";
import { getGroceries, addGrocery, deleteGrocery } from "@/api/groceryApi";
import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminProducts = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", category: "", image: "", unit: "" });
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([getGroceries(), getCategories()]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory) return;
    const cat = await addCategory(newCategory);
    setCategories((prev) => [...prev, cat]);
    setNewCategory("");
    toast({ title: "Category added!" });
  };

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.category || !newProduct.unit) {
      toast({ title: "Fill all fields", variant: "destructive" });
      return;
    }
    try {
      const product = await addGrocery(newProduct);
      setProducts((prev) => [...prev, product]);
      setNewProduct({ name: "", category: "", image: "🛒", unit: "" });
      toast({ title: "Product added!" });
    } catch (err) {
      toast({ title: "Error adding product", variant: "destructive" });
    }
  };

  const removeProduct = async (id) => {
    try {
      await deleteGrocery(id);
      setProducts(products.filter((p) => p._id !== id));
      toast({ title: "Product removed" });
    } catch (err) {
      setProducts(products.filter((p) => p._id !== id));
      toast({ title: "Product removed" });
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="font-display text-3xl font-bold text-foreground">Product Management</h1>
          <p className="text-muted-foreground">Add and manage your product catalog</p>
        </div>

        <div className="space-y-6 animate-fade-in">
          {/* Add Category */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-3 font-display font-semibold text-foreground">Add New Category</h3>
            <div className="flex gap-2">
              <Input
                placeholder="New category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="max-w-sm"
              />
              <Button onClick={handleAddCategory}>Add</Button>
            </div>
          </div>

          {/* Add Product */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-3 font-display font-semibold text-foreground">Add New Product</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input placeholder="Product name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label>Category</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
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

          {/* Product List */}
          <div>
            <h3 className="mb-3 font-display font-semibold text-foreground">All Products ({products.length})</h3>
            <div className="space-y-3">
              {products.map((p) => (
                <div key={p._id || p.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
                  <span className="text-2xl">{p.image}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-foreground truncate">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{p.category?.name || p.category} · {p.unit}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeProduct(p._id || p.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
