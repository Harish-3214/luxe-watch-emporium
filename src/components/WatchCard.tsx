import { Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Watch } from "@/data/watches";
import { formatPrice } from "@/utils/format";

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
          alt={`${watch.brand} ${watch.model}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {!watch.inStock && (
          <span className="absolute left-3 top-3 rounded bg-background/80 px-2 py-1 text-xs uppercase tracking-wider text-muted-foreground backdrop-blur">
            Sold out
          </span>
        )}
        <span className="absolute right-3 top-3 rounded bg-background/70 px-2 py-1 text-xs uppercase tracking-wider text-primary backdrop-blur">
          {watch.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{watch.brand}</p>
        <h3 className="font-display text-lg leading-tight">{watch.model}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span>{watch.rating.toFixed(1)}</span>
          <span>· {watch.reviews} reviews</span>
        </div>
        <div className="mt-auto pt-3 text-xl font-medium text-gradient-gold">
          {formatPrice(watch.price)}
        </div>
      </div>
    </Link>
  );
}