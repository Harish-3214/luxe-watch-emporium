import { Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { formatPrice } from "@/utils/format";

interface Watch {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  stock: number;
}

export function WatchCard({ watch }: { watch: Watch }) {
  return (
    <Link
      to="/product/$id"
      params={{ id: watch.id }}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border/60 bg-card transition-smooth hover:border-primary/60 hover:shadow-luxe"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={watch.image}
          alt={watch.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {watch.stock <= 0 && (
          <span className="absolute left-3 top-3 rounded bg-background/80 px-2 py-1 text-xs uppercase tracking-wider text-muted-foreground backdrop-blur">
            Out of stock
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{watch.brand}</p>
        <h3 className="font-display text-lg leading-tight">{watch.name}</h3>
        <p className="text-sm text-muted-foreground">{watch.model}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span>{watch.rating.toFixed(1)}</span>
        </div>
        <div className="mt-auto pt-3 text-xl font-medium text-gradient-gold">
          {formatPrice(watch.price)}
        </div>
      </div>
    </Link>
  );
}