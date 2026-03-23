import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, TrendingDown, Truck, ChevronLeft, ChevronRight, Star, Users, ShoppingCart } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import carousel1 from "@/assets/carousel-1.jpg";
import carousel2 from "@/assets/carousel-2.jpg";
import carousel3 from "@/assets/carousel-3.jpg";

const carouselSlides = [
  {
    image: carousel1,
    title: "Fresh Groceries, Best Prices",
    subtitle: "Compare prices across 4 platforms and save up to 30% on every order",
  },
  {
    image: carousel2,
    title: "Shop Smarter, Not Harder",
    subtitle: "Join thousands of families who save every week with QuickCompare",
  },
  {
    image: carousel3,
    title: "Track Deliveries in Real-Time",
    subtitle: "From store to doorstep — know exactly where your order is",
  },
];

const features = [
  {
    icon: TrendingDown,
    title: "Best Price Finder",
    description: "Compare prices across Zepto, Instamart, Blinkit & BigBasket instantly.",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description: "Prices update in real-time so you never miss a deal.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Pay securely through our integrated payment gateway.",
  },
  {
    icon: Truck,
    title: "Delivery Tracking",
    description: "Track your order from store to doorstep in real-time.",
  },
];

const stats = [
  { value: "10K+", label: "Happy Users", icon: Users },
  { value: "50K+", label: "Orders Placed", icon: ShoppingCart },
  { value: "₹2M+", label: "Saved by Users", icon: TrendingDown },
  { value: "4", label: "Platforms", icon: Star },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Carousel */}
      <section className="relative overflow-hidden">
        <div className="relative h-[500px] md:h-[600px]">
          {carouselSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
              </div>
              <div className="relative container mx-auto flex h-full items-center px-4">
                <div className="max-w-xl animate-fade-in">
                  <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                    🛒 Smart Grocery Shopping
                  </span>
                  <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                    {slide.title.split(" ").slice(0, -2).join(" ")}{" "}
                    <span className="text-gradient">{slide.title.split(" ").slice(-2).join(" ")}</span>
                  </h1>
                  <p className="mt-4 text-lg text-muted-foreground">{slide.subtitle}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link to="/compare">
                      <Button size="lg" className="gap-2 shadow-hero">
                        Start Comparing <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="outline" size="lg">Create Account</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm border border-border text-foreground hover:bg-card transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm border border-border text-foreground hover:bg-card transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="font-display text-2xl font-bold text-foreground md:text-3xl">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center animate-fade-in">
            <h2 className="font-display text-3xl font-bold text-foreground">Why QuickCompare?</h2>
            <p className="mt-2 text-muted-foreground">Everything you need for smarter grocery shopping</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 animate-fade-in opacity-0"
                style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient">
                  <f.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center animate-fade-in">
            <h2 className="font-display text-3xl font-bold text-foreground">How It Works</h2>
            <p className="mt-2 text-muted-foreground">Save money on groceries in 3 simple steps</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "01", title: "Search Products", desc: "Browse or search for any grocery item you need" },
              { step: "02", title: "Compare Prices", desc: "See prices from Zepto, Instamart, Blinkit & BigBasket side by side" },
              { step: "03", title: "Order & Save", desc: "Pick the best deal, add to cart and place your order" },
            ].map((item, i) => (
              <div key={item.step} className="text-center animate-fade-in" style={{ animationDelay: `${i * 0.15}s`, animationFillMode: "forwards" }}>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient">
                  <span className="font-display text-2xl font-bold text-primary-foreground">{item.step}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h2 className="font-display text-3xl font-bold text-foreground">
            Ready to save on groceries?
          </h2>
          <p className="mt-2 text-muted-foreground">Join thousands of smart shoppers today.</p>
          <Link to="/register">
            <Button size="lg" className="mt-6 gap-2 shadow-hero">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026 QuickCompare. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
