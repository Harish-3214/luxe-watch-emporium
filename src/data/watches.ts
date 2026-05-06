// Dummy product data — replace with Supabase data later.
// Edit prices, names, images, descriptions here.

export interface Watch {
  id: string;
  brand: string;
  model: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  category: "Diver" | "Dress" | "Chronograph" | "Pilot" | "Smart";
  inStock: boolean;
}

const img = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=900&q=80`;

export const watches: Watch[] = [
  { id: "w1", brand: "Aurelius", model: "Imperator 41", price: 8450, rating: 4.9, reviews: 128, image: img("photo-1523275335684-37898b6baf30"), description: "Hand-finished Swiss automatic with sapphire crystal and 80h power reserve.", category: "Dress", inStock: true },
  { id: "w2", brand: "Noir", model: "Abyss Diver", price: 5200, rating: 4.7, reviews: 87, image: img("photo-1547996160-81dfa63595aa"), description: "300m water resistant ceramic bezel diver, COSC certified movement.", category: "Diver", inStock: true },
  { id: "w3", brand: "Helios", model: "Solaris Chrono", price: 12900, rating: 4.8, reviews: 64, image: img("photo-1524592094714-0f0654e20314"), description: "Flyback chronograph in 18k rose gold with hand-stitched alligator strap.", category: "Chronograph", inStock: true },
  { id: "w4", brand: "Vanta", model: "Eclipse 39", price: 3850, rating: 4.6, reviews: 211, image: img("photo-1622434641406-a158123450f9"), description: "Minimalist matte black dial, micro-rotor automatic, titanium case.", category: "Dress", inStock: true },
  { id: "w5", brand: "Meridian", model: "GMT Voyager", price: 6750, rating: 4.7, reviews: 142, image: img("photo-1509048191080-d2984bad6ae5"), description: "True GMT with 24h ceramic bezel — for those who chase time zones.", category: "Pilot", inStock: true },
  { id: "w6", brand: "Lumen", model: "Nova Skeleton", price: 14500, rating: 4.9, reviews: 39, image: img("photo-1548171915-e79a380a2a4b"), description: "Open-worked skeleton dial revealing the heart of haute horlogerie.", category: "Dress", inStock: false },
  { id: "w7", brand: "Forge", model: "Tempest Chrono", price: 4990, rating: 4.5, reviews: 178, image: img("photo-1639037687665-37ac8978f231"), description: "Motorsport-inspired tachymeter chronograph with carbon dial.", category: "Chronograph", inStock: true },
  { id: "w8", brand: "Aurora", model: "Polaris Pilot", price: 3200, rating: 4.4, reviews: 256, image: img("photo-1606859309482-9b5b40adb50e"), description: "Aviation heritage flieger with luminous numerals and onion crown.", category: "Pilot", inStock: true },
  { id: "w9", brand: "Obsidian", model: "Nebula 42", price: 9800, rating: 4.8, reviews: 71, image: img("photo-1612817159949-195b6eb9e31a"), description: "Aventurine starfield dial with platinum hour markers.", category: "Dress", inStock: true },
  { id: "w10", brand: "Marlin", model: "Trident Pro", price: 4350, rating: 4.6, reviews: 102, image: img("photo-1533139502658-0198f920d8e8"), description: "1000m saturation diver with helium escape valve.", category: "Diver", inStock: true },
  { id: "w11", brand: "Spectra", model: "Quantum S", price: 2150, rating: 4.3, reviews: 489, image: img("photo-1434056886845-dac89ffe9b56"), description: "Hybrid smartwatch with mechanical complications and OLED ring.", category: "Smart", inStock: true },
  { id: "w12", brand: "Regalia", model: "Heritage 1888", price: 18750, rating: 5.0, reviews: 22, image: img("photo-1495856458515-0637185db551"), description: "Limited edition perpetual calendar with moonphase, 18k yellow gold.", category: "Dress", inStock: false },
];

export const brands = Array.from(new Set(watches.map((w) => w.brand)));
export const categories = Array.from(new Set(watches.map((w) => w.category)));