// Auth service — placeholder until Supabase Auth is wired up.
// Replace each function with the supabase.auth equivalent.

export interface AuthUser {
  id: string;
  email: string;
  isAdmin?: boolean;
}

const STORAGE_KEY = "chronos.auth.user";

function readUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function writeUser(user: AuthUser | null) {
  if (typeof window === "undefined") return;
  if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else window.localStorage.removeItem(STORAGE_KEY);
}

export async function login(email: string, _password: string): Promise<AuthUser> {
  // TODO: const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  const user: AuthUser = {
    id: "demo-user",
    email,
    isAdmin: email.toLowerCase().startsWith("admin"),
  };
  writeUser(user);
  return user;
}

export async function signup(email: string, _password: string): Promise<AuthUser> {
  // TODO: const { data, error } = await supabase.auth.signUp({ email, password });
  const user: AuthUser = { id: crypto.randomUUID(), email, isAdmin: false };
  writeUser(user);
  return user;
}

export async function logout(): Promise<void> {
  // TODO: await supabase.auth.signOut();
  writeUser(null);
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  // TODO: const { data } = await supabase.auth.getUser(); return data.user;
  return readUser();
}