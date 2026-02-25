import { GroceryItem, Platform, platformLabels, platformTextColors } from "@/data/groceries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Clock, TrendingDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

interface Props {
  item: GroceryItem;
}

const ProductCard = ({ item }: Props) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const inStockPrices = item.prices.filter(p => p.inStock);
  const lowestPrice = Math.min(...inStockPrices.map(p => p.price));
  const highestPrice = Math.max(...inStockPrices.map(p => p.price));
  const savings = highestPrice - lowestPrice;

  const cheapestPlatform = inStockPrices.find(p => p.price === lowestPrice);

  const handleAddToCart = () => {
    if (!cheapestPlatform) return;
    addToCart(item, cheapestPlatform.platform, cheapestPlatform.price);
    toast({
      title: "Added to cart",
      description: `${item.name} from ${platformLabels[cheapestPlatform.platform]} at ₹${cheapestPlatform.price}`,
    });
  };

  return (
    <div className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{item.image}</span>
          <div>
            <h3 className="font-display font-semibold text-card-foreground leading-tight">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.unit}</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">{item.category}</Badge>
      </div>

      {/* Prices */}
      <div className="space-y-2">
        {item.prices.map((pp) => {
          const isCheapest = pp.price === lowestPrice && pp.inStock;
          return (
            <div
              key={pp.platform}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                isCheapest ? 'bg-secondary' : 'bg-muted/50'
              } ${!pp.inStock ? 'opacity-50' : ''}`}
            >
              <span className={`font-medium ${platformTextColors[pp.platform]}`}>
                {platformLabels[pp.platform]}
              </span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {pp.deliveryTime}
                </span>
                {pp.inStock ? (
                  <span className={`font-display font-bold ${isCheapest ? 'text-primary' : 'text-foreground'}`}>
                    ₹{pp.price}
                    {isCheapest && <TrendingDown className="ml-1 inline h-3 w-3" />}
                  </span>
                ) : (
                  <span className="text-xs text-destructive font-medium">Out of stock</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        {savings > 0 && (
          <span className="text-xs font-medium text-primary">
            Save up to ₹{savings}
          </span>
        )}
        <Button size="sm" className="ml-auto gap-1.5" onClick={handleAddToCart}>
          <ShoppingCart className="h-3.5 w-3.5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
