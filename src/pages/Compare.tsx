import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { mockGroceries, categories } from "@/data/groceries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Compare = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = mockGroceries.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="font-display text-3xl font-bold text-foreground">Compare Prices</h1>
          <p className="mt-1 text-muted-foreground">Find the best deals across platforms</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center animate-fade-in-delay-1 opacity-0">
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

        {/* Category pills */}
        <div className="mb-6 flex flex-wrap gap-2 animate-fade-in-delay-2 opacity-0">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-delay-3 opacity-0">
          {filtered.map((item) => (
            <ProductCard key={item.id} item={item} />
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
