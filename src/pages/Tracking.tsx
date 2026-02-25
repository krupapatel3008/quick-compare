import Navbar from "@/components/Navbar";
import { Package, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const steps = [
  { label: "Order Placed", time: "10:30 AM", done: true, icon: Package },
  { label: "Packed", time: "10:35 AM", done: true, icon: CheckCircle2 },
  { label: "Out for Delivery", time: "10:42 AM", done: true, icon: MapPin },
  { label: "Delivered", time: "~10:55 AM", done: false, icon: Clock },
];

const Tracking = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="font-display text-3xl font-bold text-foreground">Order Tracking</h1>
          <p className="mt-1 text-muted-foreground">Track your grocery delivery in real-time</p>
        </div>

        {/* Sample order */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card animate-fade-in-delay-1 opacity-0">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Order #QC-20847</p>
              <p className="font-display font-semibold text-foreground">Zepto Delivery</p>
            </div>
            <Badge className="bg-brand-gradient border-0 text-primary-foreground">In Transit</Badge>
          </div>

          {/* Timeline */}
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={step.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      step.done ? 'bg-brand-gradient' : 'border-2 border-border bg-muted'
                    }`}
                  >
                    <step.icon className={`h-5 w-5 ${step.done ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`h-12 w-0.5 ${step.done ? 'bg-primary' : 'bg-border'}`} />
                  )}
                </div>
                <div className="pb-12">
                  <p className={`font-medium ${step.done ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.label}
                  </p>
                  <p className="text-sm text-muted-foreground">{step.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-4 rounded-xl bg-secondary p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Items</span>
              <span className="font-medium text-foreground">3 items</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-display font-bold text-foreground">₹247</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Estimated arrival</span>
              <span className="font-medium text-primary">~13 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
