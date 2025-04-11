"use server";

export async function forgotPassword(
  prevState: { message: string, error: string },
  formData: FormData
) {
  const email = formData.get("email") as string;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/forgotpassword`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return {
      ...prevState,
      error: "Server Error. Please try again later",
      message: ""
    };
  }

  return { ...prevState, message: data.message, error: "" };
}
