"use server";

import { cookies } from "next/headers";

export async function login(
  prevState: { error: string; result: string },
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
    return { ...prevState, error: data.error || "Login failed", result: "" };
  }

  const cookieStore = await cookies();
  cookieStore.set("token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 2, // 1 hour
    sameSite: "lax",
  });

  return { ...prevState, error: "", result: data };
}
