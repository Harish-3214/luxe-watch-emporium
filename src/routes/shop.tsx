import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { WatchGrid } from "@/components/WatchGrid";
import { fetchWatches } from "@/api/watchService";
import { brands, categories, type Watch } from "@/data/watches";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Collection — Chronos" },
      { name: "description", content: "Browse our full collection of luxury watches." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [all, setAll] = useState<Watch[]>([]);
  const [brand, setBrand] = useState<string>("All");
  const [cat, setCat] = useState<string>("All");

  useEffect(() => {
    fetchWatches().then(setAll);
  }, []);

  const filtered = useMemo(
    () => all.filter((w) => (brand === "All" || w.brand === brand) && (cat === "All" || w.category === cat)),
    [all, brand, cat],
  );

  return (
    <MainLayout>
      <section className="container mx-auto px-6 py-20">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Shop</p>
        <h1 className="mt-3 font-display text-5xl">The Full Collection</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Every timepiece in our atelier — filter by maker or complication.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {["All", ...categories].map((c) => (
            <Button key={c} size="sm" variant={cat === c ? "default" : "outline"}
              onClick={() => setCat(c)}
              className={cat === c ? "bg-gradient-gold text-primary-foreground" : "border-border"}>
              {c}
            </Button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["All", ...brands].map((b) => (
            <Button key={b} size="sm" variant={brand === b ? "default" : "ghost"}
              onClick={() => setBrand(b)}
              className={brand === b ? "bg-primary/20 text-primary" : "text-muted-foreground"}>
              {b}
            </Button>
          ))}
        </div>

        <div className="mt-12">
          <WatchGrid items={filtered} />
        </div>
      </section>
    </MainLayout>
  );
}