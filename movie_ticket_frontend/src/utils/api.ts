export async function apiFetch<T = unknown>(path: string, options: Record<string, unknown> = {}): Promise<T> {
  const token = localStorage.getItem("jwt");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = "Bearer " + token;
  const res = await fetch(import.meta.env.PUBLIC_API_BASE + path, { ...options, headers });
  if (!res.ok) throw new Error(await res.text());
  return await res.json() as T;
}

// PUBLIC_INTERFACE
/**
 * Helper to handle login/signup/logout by storing JWT in localStorage.
 * Usage: saveAuth(jwt, user)
 */
export function saveAuth(token: string, user: object): void {
  localStorage.setItem("jwt", token);
  localStorage.setItem("user", JSON.stringify(user));
}
export function logout(): void {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");
}
export function getUser<T = unknown>(): T | null {
  const u = localStorage.getItem("user");
  return u ? JSON.parse(u) as T : null;
}
