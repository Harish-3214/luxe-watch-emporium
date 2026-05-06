import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Hero } from "@/components/Hero";
import { WatchGrid } from "@/components/WatchGrid";
import { fetchWatches } from "@/api/watchService";
import type { Watch } from "@/data/watches";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chronos — Luxury Timepieces" },
      { name: "description", content: "Curated luxury watches: Swiss automatics, chronographs, and limited editions." },
    ],
  }),
  component: Index,
});

function Index() {
  const [items, setItems] = useState<Watch[]>([]);
  useEffect(() => {
    fetchWatches().then((all) => setItems(all.slice(0, 8)));
  }, []);
  return (
    <MainLayout>
      <Hero />
      <section className="container mx-auto px-6 py-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Featured</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">The Collection</h2>
          </div>
          <Link to="/shop" className="hidden md:block">
            <Button variant="outline" className="border-primary/40">View all</Button>
          </Link>
        </div>
        <WatchGrid items={items} />
      </section>
    </MainLayout>
  );
}
