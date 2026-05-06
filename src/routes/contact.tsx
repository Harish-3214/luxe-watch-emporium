import { createFileRoute } from "@tanstack/react-router";
import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Chronos" },
      { name: "description", content: "Get in touch with the Maison Chronos atelier." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <MainLayout>
      <section className="container mx-auto max-w-2xl px-6 py-24">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Contact</p>
        <h1 className="mt-3 font-display text-5xl">Speak with our atelier.</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="mt-10 grid gap-4"
        >
          <Input placeholder="Your name" />
          <Input type="email" placeholder="Your email" />
          <Textarea placeholder="How can we help?" rows={6} />
          <Button className="bg-gradient-gold text-primary-foreground shadow-glow">Send message</Button>
        </form>
      </section>
    </MainLayout>
  );
}