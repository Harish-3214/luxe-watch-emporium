import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Hero } from "@/components/Hero";
import { WatchGrid } from "@/components/WatchGrid";
import { getWatches } from "@/api/watchService";
import { Button } from "@/components/ui/button";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getWatches();
      setItems(data.slice(0, 8));
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <Hero />
        <section className="container mx-auto px-6 py-24">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </section>
      </MainLayout>
    );
  }

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
