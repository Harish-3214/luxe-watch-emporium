import { WatchCard } from "./WatchCard";

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

export function WatchGrid({ items }: { items: Watch[] }) {
  if (!items.length) {
    return <p className="py-16 text-center text-muted-foreground">No Watches Found</p>;
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((w) => (
        <WatchCard key={w.id} watch={w} />
      ))}
    </div>
  );
}