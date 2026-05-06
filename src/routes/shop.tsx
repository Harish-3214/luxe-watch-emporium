import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { WatchGrid } from "@/components/WatchGrid";
import { getWatches, searchWatches, filterWatches } from "@/api/watchService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [filtered, setFiltered] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getWatches();
      setAll(data);
      setFiltered(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const applyFilters = async () => {
      let data = all;
      if (searchTerm) {
        data = await searchWatches(searchTerm);
      } else {
        data = await filterWatches(priceFilter ? parseFloat(priceFilter) : null, ratingFilter ? parseFloat(ratingFilter) : null, modelFilter);
      }
      setFiltered(data);
    };
    applyFilters();
  }, [all, searchTerm, priceFilter, ratingFilter, modelFilter]);

  if (loading) {
    return (
      <MainLayout>
        <section className="container mx-auto px-6 py-20">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="container mx-auto px-6 py-20">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Shop</p>
        <h1 className="mt-3 font-display text-5xl">The Full Collection</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Every timepiece in our atelier — filter by price, rating, or model.
        </p>

        <div className="mt-10 space-y-4">
          <div>
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search by name, brand, or model"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">Max Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g. 5000"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="rating">Min Rating</Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                placeholder="e.g. 4.0"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                placeholder="e.g. Chrono"
                value={modelFilter}
                onChange={(e) => setModelFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <WatchGrid items={filtered} />
        </div>
      </section>
    </MainLayout>
  );
}