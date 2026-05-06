// Watch API service — currently returns dummy data.
// Swap each function body for a Supabase query when the backend is ready.

import { watches, type Watch } from "@/data/watches";

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export async function fetchWatches(): Promise<Watch[]> {
  await delay();
  // TODO: const { data } = await supabase.from("watches").select("*"); return data ?? [];
  return watches;
}

export async function fetchWatchById(id: string): Promise<Watch | null> {
  await delay();
  return watches.find((w) => w.id === id) ?? null;
}

export async function fetchWatchesByBrand(brand: string): Promise<Watch[]> {
  await delay();
  return watches.filter((w) => w.brand === brand);
}

export async function searchWatches(query: string): Promise<Watch[]> {
  await delay();
  const q = query.toLowerCase();
  return watches.filter(
    (w) =>
      w.brand.toLowerCase().includes(q) ||
      w.model.toLowerCase().includes(q) ||
      w.description.toLowerCase().includes(q),
  );
}