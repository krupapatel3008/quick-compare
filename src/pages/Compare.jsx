import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Compare = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/groceries")
      .then((res) => res.json())
      .then((data) => {
        console.log("Groceries:", data);
        setProducts(data);
      })
      .catch((err) => console.error("Groceries fetch error:", err));

    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log("Categories:", data);
        setCategories(data);
      })
      .catch((err) => console.error("Categories fetch error:", err));
  }, []);

  const filtered = products.filter((item) => {
    const matchesSearch = item.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    let itemCategory = "";

    if (typeof item.category === "string") {
      itemCategory = item.category;
    } else if (item.category && typeof item.category === "object") {
      itemCategory = item.category.name || "";
    }

    const matchesCategory =
      activeCategory === "All" || itemCategory === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Compare Prices
          </h1>
          <p className="mt-1 text-muted-foreground">
            Find the best deals across platforms
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search groceries..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            variant={activeCategory === "All" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("All")}
            className="rounded-full"
          >
            All
          </Button>

          {categories
            .filter((cat) => cat.name !== "All")   // ✅ remove duplicate
            .map((cat) => (
              <Button
                key={cat._id}
                variant={activeCategory === cat.name ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.name)}
                className="rounded-full"
              >
                {cat.name}
              </Button>
            ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-lg">No items found</p>
            <p className="text-sm">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;