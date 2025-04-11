"use server";

export async function resetPassword(
  prevState: { success: string; error: string },
  formData: FormData
) {
  const password = formData.get("password") as string;
  const confirmedpassword = formData.get("confirmedpassword") as string;
  const token = formData.get("token") as string;

  if (password !== confirmedpassword) {
    return {
      ...prevState,
      error: "New Password and Confirm Password must be same.",
      success: "",
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/resetpassword`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, token }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return {
      ...prevState,
      error: data.error || "Reset Password fail. Please try again later.",
      success: "",
    };
  }

  return { ...prevState, error: "", success: data.success };
}
