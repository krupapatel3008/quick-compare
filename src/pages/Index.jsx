import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, TrendingDown, Truck } from "lucide-react";
import heroImage from "@/assets/hero-grocery.png";

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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="animate-fade-in">
            <span className="mb-4 inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
              🛒 Smart Grocery Shopping
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Compare Prices.{" "}
              <span className="text-gradient">Save More.</span>
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Find the best grocery deals across Zepto, Instamart, Blinkit & BigBasket — all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/compare">
                <Button size="lg" className="gap-2 shadow-hero">
                  Start Comparing
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>

          <div className="animate-fade-in-delay-2 opacity-0">
            <img
              src={heroImage}
              alt="Grocery items with price comparison"
              className="w-full rounded-2xl shadow-card"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-secondary/30 py-16">
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

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h2 className="font-display text-3xl font-bold text-foreground">
            Ready to save on groceries?
          </h2>
          <p className="mt-2 text-muted-foreground">Join thousands of smart shoppers today.</p>
          <Link to="/register">
            <Button size="lg" className="mt-6 gap-2 shadow-hero">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
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
