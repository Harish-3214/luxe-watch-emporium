import { createFileRoute } from "@tanstack/react-router";
import { MainLayout } from "@/layouts/MainLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Heritage — Chronos" },
      { name: "description", content: "The story of Maison Chronos and our pursuit of horological perfection." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <MainLayout>
      <section className="container mx-auto max-w-3xl px-6 py-24">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Heritage</p>
        <h1 className="mt-3 font-display text-5xl">A century of mastery.</h1>
        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
          Founded in the alpine valleys of Switzerland in 1888, Maison Chronos has spent
          five generations refining the craft of mechanical timekeeping. Each piece is
          assembled by a single master watchmaker — a signature of our commitment to
          singular excellence.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Today we curate timepieces from the world's most uncompromising houses,
          alongside our own limited editions. Replace this copy with your brand story.
        </p>
      </section>
    </MainLayout>
  );
}