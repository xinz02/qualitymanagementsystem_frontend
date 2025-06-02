"use server";

import { cookies } from "next/headers";

export async function logoutCookie() {
    console.log("clear cookie");
    const cookieStore = await cookies();
  cookieStore.set("token","", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60, // 1 hour
    sameSite: "lax",
  });
//   console.log(cookieStore);

}