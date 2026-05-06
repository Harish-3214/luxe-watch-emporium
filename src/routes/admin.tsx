import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import { getWatches } from "@/api/watchService";
import { formatPrice } from "@/utils/format";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const { user, loading } = useAuth();
  const [items, setItems] = useState<Watch[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      const data = await getWatches();
      setItems(data);
      setDataLoading(false);
    };
    fetchData();
  }, []);

  if (loading || dataLoading) return <MainLayout><div className="container py-32 text-center text-muted-foreground">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
    Loading…
  </div></MainLayout>;

  if (!user || !user.isAdmin) {
    return (
      <MainLayout>
        <section className="container mx-auto max-w-md px-6 py-32 text-center">
          <h1 className="font-display text-3xl">Restricted</h1>
          <p className="mt-3 text-muted-foreground">Sign in with an admin account to continue.</p>
          <Link to="/login" className="mt-6 inline-block text-primary hover:underline">Go to sign in →</Link>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="container mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Dashboard</p>
            <h1 className="mt-3 font-display text-4xl">Inventory</h1>
          </div>
          <Link to="/add-watch">
            <Button className="bg-gradient-gold text-primary-foreground shadow-glow hover:opacity-90 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Watch
            </Button>
          </Link>
        </div>
        <div className="mt-10 overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="p-4">Watch</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Model</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
              </tr>
            </thead>
            <tbody>
              {items.map((w) => (
                <tr key={w.id} className="border-t border-border transition-smooth hover:bg-secondary/40">
                  <td className="flex items-center gap-3 p-4">
                    <img src={w.image} alt="" className="h-10 w-10 rounded object-cover" />
                    {w.name}
                  </td>
                  <td className="p-4 text-muted-foreground">{w.brand}</td>
                  <td className="p-4 text-muted-foreground">{w.model}</td>
                  <td className="p-4 text-primary">{formatPrice(w.price)}</td>
                  <td className="p-4">{w.stock > 0 ? `In stock (${w.stock})` : "Out of stock"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </MainLayout>
  );
}