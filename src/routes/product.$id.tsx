import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { fetchWatchById } from "@/api/watchService";
import type { Watch } from "@/data/watches";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/format";
import { Star } from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const [watch, setWatch] = useState<Watch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWatchById(id).then((w) => {
      setWatch(w);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <MainLayout><div className="container py-32 text-center text-muted-foreground">Loading…</div></MainLayout>;
  if (!watch) return <MainLayout><div className="container py-32 text-center">Not found. <Link to="/shop" className="text-primary underline">Back to shop</Link></div></MainLayout>;

  return (
    <MainLayout>
      <section className="container mx-auto grid gap-12 px-6 py-20 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-luxe">
          <img src={watch.image} alt={`${watch.brand} ${watch.model}`} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">{watch.brand}</p>
          <h1 className="mt-3 font-display text-5xl">{watch.model}</h1>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-primary text-primary" />
            {watch.rating.toFixed(1)} · {watch.reviews} reviews · {watch.category}
          </div>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{watch.description}</p>
          <div className="mt-8 text-4xl text-gradient-gold">{formatPrice(watch.price)}</div>
          <div className="mt-8 flex gap-3">
            <Button size="lg" disabled={!watch.inStock}
              className="bg-gradient-gold text-primary-foreground shadow-glow hover:opacity-90">
              {watch.inStock ? "Add to Cart" : "Sold Out"}
            </Button>
            <Button size="lg" variant="outline" className="border-primary/40">Save</Button>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8 text-sm">
            <div><p className="text-muted-foreground">Movement</p><p className="mt-1">Swiss Auto</p></div>
            <div><p className="text-muted-foreground">Warranty</p><p className="mt-1">5 Years</p></div>
            <div><p className="text-muted-foreground">Shipping</p><p className="mt-1">Insured</p></div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}