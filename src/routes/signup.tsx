import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(email, password);
    toast.success("Account created");
    navigate({ to: "/" });
  };

  return (
    <MainLayout>
      <section className="container mx-auto max-w-md px-6 py-24">
        <h1 className="font-display text-4xl">Create account</h1>
        <form onSubmit={submit} className="mt-8 grid gap-4">
          <Input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button className="bg-gradient-gold text-primary-foreground shadow-glow">Create account</Button>
        </form>
        <p className="mt-6 text-sm text-muted-foreground">
          Have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </section>
    </MainLayout>
  );
}