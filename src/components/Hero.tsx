import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
      </div>
      <div className="container mx-auto flex min-h-[88vh] flex-col justify-center px-6 py-24">
        <p className="mb-6 text-xs uppercase tracking-[0.4em] text-primary">Maison Chronos · Est. 1888</p>
        <h1 className="max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">
          Time, <span className="text-gradient-gold italic">perfected</span> by hand.
        </h1>
        <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
          Discover a curated collection of haute horlogerie — Swiss-made automatics,
          tourbillons, and limited editions reserved for the discerning few.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/shop">
            <Button size="lg" className="bg-gradient-gold text-primary-foreground hover:opacity-90 shadow-glow">
              Explore Collection
            </Button>
          </Link>
          <Link to="/about">
            <Button size="lg" variant="outline" className="border-primary/40 hover:bg-primary/10">
              Our Heritage
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}