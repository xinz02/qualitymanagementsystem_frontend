"use server";

export async function login(
  prevState: { error: string; token: string },
  formData: FormData
) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { ...prevState, error: data.error || "Login failed", token: "" };
  }

  return { ...prevState, error: "", token: data.token };
}
