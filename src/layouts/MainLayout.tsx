import { type ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />
      <main className="animate-fade-in">{children}</main>
      <Footer />
    </div>
  );
}