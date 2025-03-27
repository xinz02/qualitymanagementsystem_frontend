"use server";

export async function login(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.statusText) {
    return { error: data.error || "Login failed" }; // Use the backend error message if available
  }

  return { error: "Login successful" }; // Ensure it returns an object matching initialState
}
