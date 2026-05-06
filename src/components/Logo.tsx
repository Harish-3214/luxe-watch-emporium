import { Link } from "@tanstack/react-router";

// Editable logo — change text or swap for an <img> from /assets.
export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-gold text-primary-foreground font-display text-lg font-bold transition-smooth group-hover:shadow-glow">
        C
      </span>
      <span className="font-display text-xl tracking-wider">CHRONOS</span>
    </Link>
  );
}