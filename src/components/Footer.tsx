export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/50 bg-card/40">
      <div className="container mx-auto grid gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl text-gradient-gold">Chronos</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Time, perfected. Curated luxury timepieces from the world's finest makers.
          </p>
        </div>
        {[
          { title: "Shop", links: ["New Arrivals", "Best Sellers", "Limited Edition"] },
          { title: "Support", links: ["Contact", "Shipping", "Warranty"] },
          { title: "Company", links: ["About", "Press", "Careers"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-sm uppercase tracking-widest text-primary">{col.title}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {col.links.map((l) => (
                <li key={l} className="transition-smooth hover:text-foreground cursor-pointer">{l}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Chronos Maison. All rights reserved.
      </div>
    </footer>
  );
}