import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, TrendingDown, Clock, Package } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:5000/api/groceries").then((res) => res.json()),
            fetch("http://localhost:5000/api/categories").then((res) => res.json()),
        ])
            .then(([productsData, categoriesData]) => {
                setProducts(productsData);
                setCategories([...categoriesData]);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    // 🔍 Filter logic
    const filteredProducts = products.filter((p) => {
        const matchCategory =
            selectedCategory === "All" || p.category?.name === selectedCategory;

        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());

        return matchCategory && matchSearch;
    });

    const topDeals = [...products]
        .sort(
            (a, b) =>
                Math.min(...a.prices.map((p) => p.price)) -
                Math.min(...b.prices.map((p) => p.price))
        )
        .slice(0, 4);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="container mx-auto px-4 py-6 space-y-8">

                {/* 🔥 Hero */}
                <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                        {/* LEFT CONTENT */}
                        <div className="max-w-xl">
                            <p className="text-sm text-muted-foreground mb-2">
                                👋 Welcome back
                            </p>

                            <h1 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
                                Find the <span className="text-primary">best prices</span> for your groceries
                            </h1>

                            <p className="mt-3 text-muted-foreground text-sm md:text-base">
                                Compare across Blinkit, Zepto, Instamart & BigBasket instantly and save more on every order.
                            </p>

                            {/* CTA */}
                            <div className="flex gap-3 mt-5">
                                <button onClick={() => navigate("/compare")} className="px-5 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition">
                                    Shop Now
                                </button>

                                <button onClick={() => navigate("/cart")} className="px-5 py-2 rounded-lg border border-border hover:bg-muted transition">
                                    🛒 View Cart
                                </button>
                            </div>
                        </div>

                        {/* RIGHT SIDE (SUBTLE VISUAL CARD) */}
                        <div className="w-full md:w-[280px] rounded-xl bg-muted p-4 border border-border">

                            <p className="text-sm text-muted-foreground mb-2">💡 Smart Tip</p>

                            <p className="text-sm font-medium text-foreground">
                                You can save up to <span className="text-primary font-bold">₹120</span> today by choosing the cheapest platform.
                            </p>

                            <div className="mt-3 text-xs text-muted-foreground">
                                Prices update in real-time ⚡
                            </div>
                        </div>

                    </div>
                </div>

                {/* ⚡ Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: "⚡", title: "Compare", path: "/compare" },
                        { icon: "🛒", title: "Cart", path: "/cart" },
                        { icon: "📦", title: "Orders", path: "/my-orders" },
                        { icon: "🔥", title: "Deals", action: () => window.scrollTo({ top: 500, behavior: "smooth" }) },
                    ].map((item) => (
                        <div
                            key={item.title}
                            onClick={() => item.path ? navigate(item.path) : item.action()}
                            className="p-4 rounded-xl border bg-card hover:shadow-md transition cursor-pointer hover:-translate-y-1"
                        >
                            <div className="text-2xl">{item.icon}</div>
                            <p className="mt-2 text-sm font-medium">{item.title}</p>
                        </div>
                    ))}
                </div>



                {/* 💰 Deals */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-semibold">🔥 Best Deals</h2>
                        <TrendingDown className="text-primary" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                        {topDeals.map((item) => (
                            <ProductCard key={item._id} item={item} />
                        ))}
                    </div>
                </div>

                {/* 🧺 Categories */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">Categories</h2>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {categories.map((cat) => (
                            <div
                                key={cat.name}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`min-w-[80px] p-2 rounded-full text-center border border-gray-300 cursor-pointer transition
                  ${selectedCategory === cat.name
                                        ? "bg-primary text-white"
                                        : "bg-secondary hover:bg-secondary/80"
                                    }`}
                            >
                                <p className="text-sm">{cat.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 🛍️ Products */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">
                        {selectedCategory === "All" ? "All Products" : selectedCategory}
                    </h2>

                    {loading ? (
                        <p className="text-muted-foreground">Loading products...</p>
                    ) : filteredProducts.length === 0 ? (
                        <div className="text-center py-10">
                            <Package className="mx-auto h-12 w-12 opacity-40" />
                            <p className="mt-2 text-muted-foreground">No products found</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {filteredProducts.map((item) => (
                                <ProductCard key={item._id} item={item} />
                            ))}
                        </div>
                    )}
                </div>

                {/* 🚚 Banner */}
                <div className="rounded-xl bg-secondary p-5 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-lg">Fast Delivery ⚡</h3>
                        <p className="text-sm text-muted-foreground">
                            Get groceries delivered in under 10 minutes
                        </p>
                    </div>
                    <Clock className="h-8 w-8 text-primary" />
                </div>

            </div>
        </div>
    );
};

export default Home;