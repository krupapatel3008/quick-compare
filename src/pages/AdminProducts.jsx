import { getCategories, addCategory } from "@/api/categoryApi";
import { getGroceries, addGrocery, deleteGrocery, updateGrocery } from "@/api/groceryApi";
import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminProducts = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    image: "",
    unit: "",
    prices: [
      {
        platform: "",
        price: "",
        deliveryTime: "",
        inStock: true
      }
    ]
  });
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

  const handleEdit = (product) => {
    setNewProduct({
      ...product,
      category: product.category?._id || product.category,
      prices: product.prices && product.prices.length > 0
        ? product.prices
        : [
          {
            platform: "",
            price: "",
            deliveryTime: "",
            inStock: true
          }
        ]
    });
    setEditingId(product._id);
  };

  const updateProduct = async () => {
    try {
      const updated = await updateGrocery(editingId, newProduct);
      setProducts(products.map(p => p._id === editingId ? updated : p));
      setEditingId(null);
      setNewProduct({
        name: "",
        category: "",
        image: "",
        unit: "",
        prices: [
          { platform: "", price: "", deliveryTime: "", inStock: true }
        ]
      });
      toast({ title: "Product updated!" });
    } catch {
      toast({ title: "Update failed", variant: "destructive" });
    }
  };

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
      setNewProduct({
        name: "",
        category: "",
        image: "",
        unit: "",
        prices: [
          { platform: "", price: "", deliveryTime: "", inStock: true }
        ]
      });
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

  const handlePriceChange = (index, field, value) => {
    const updated = [...newProduct.prices];
    updated[index][field] = field === "inStock" ? value === "true" : value;
    setNewProduct({ ...newProduct, prices: updated });
  };

  const addPriceRow = () => {
    setNewProduct({
      ...newProduct,
      prices: [
        ...newProduct.prices,
        { platform: "", price: "", deliveryTime: "", inStock: true }
      ]
    });
  };

  const removePriceRow = (index) => {
    const updated = newProduct.prices.filter((_, i) => i !== index);
    setNewProduct({ ...newProduct, prices: updated });
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
            <h3 className="mb-3 font-display font-semibold text-foreground">
              {editingId ? "Update Product" : "Add New Product"}
            </h3>

            {/* BASIC INFO */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Input placeholder="Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />

              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="border rounded-md p-2"
              >
                <option value="">Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>

              <Input placeholder="Unit"
                value={newProduct.unit}
                onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
              />

              <Input placeholder="Emoji"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />
            </div>

            {/* 💰 PRICES */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Platform Prices</h4>

              {(newProduct.prices || []).map((p, i) => (
                <div key={i} className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-2">

                  <Input placeholder="Platform"
                    value={p.platform}
                    onChange={(e) => handlePriceChange(i, "platform", e.target.value)}
                  />

                  <Input type="number" placeholder="Price"
                    value={p.price}
                    onChange={(e) => handlePriceChange(i, "price", e.target.value)}
                  />

                  <Input placeholder="Delivery"
                    value={p.deliveryTime}
                    onChange={(e) => handlePriceChange(i, "deliveryTime", e.target.value)}
                  />

                  <select
                    value={p.inStock}
                    onChange={(e) => handlePriceChange(i, "inStock", e.target.value)}
                    className="border rounded-md p-2"
                  >
                    <option value={true}>In Stock</option>
                    <option value={false}>Out</option>
                  </select>

                  <Button variant="outline" className="max-w-[120px] text-red-500 hover:text-red-600 hover:bg-white hover:border-red-500" onClick={() => removePriceRow(i)}>
                    <Trash2 className="h-4 w-4 text-red-500" /> Delete
                  </Button>
                </div>
              ))}

              <Button variant="outline" onClick={addPriceRow}>+ Add Platform</Button>
            </div>

            <Button className="mt-4" onClick={editingId ? updateProduct : addProduct}>
              {editingId ? "Update Product" : "Add Product"}
            </Button>
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(p)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
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
