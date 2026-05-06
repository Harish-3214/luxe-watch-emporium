import { createFileRoute } from "@tanstack/react-router";
import { AddWatch } from "@/pages/AddWatch";
import { useAuth } from "@/hooks/useAuth";
import { MainLayout } from "@/layouts/MainLayout";

export const Route = createFileRoute("/add-watch")({
  head: () => ({
    meta: [
      { title: "Add Watch — Chronos Admin" },
      { name: "description", content: "Add a new luxury watch product." },
    ],
  }),
  component: AddWatchRoute,
});

function AddWatchRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-32 text-center text-muted-foreground">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </div>
      </MainLayout>
    );
  }

  if (!user || !user.isAdmin) {
    return (
      <MainLayout>
        <section className="container mx-auto max-w-md px-6 py-32 text-center">
          <h1 className="font-display text-3xl">Restricted</h1>
          <p className="mt-3 text-muted-foreground">Sign in with an admin account to continue.</p>
        </section>
      </MainLayout>
    );
  }

  return <AddWatch />;
}
