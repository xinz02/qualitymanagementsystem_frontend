import { useRouter } from "next/navigation";
import { triggerGlobalToast } from "../components/(common)/toast/showtoast";

export async function handleDeleteForm(formId: string) {
  const router = useRouter();

  if (!formId) return;

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this form?"
  );

  if (!confirmDelete) {
    return; // If user cancels, do nothing
  }

  try {
    const token = localStorage.getItem("jwt") || "";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/form/deleteForm/${formId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const response = await res.json();

    if (res.ok) {
      triggerGlobalToast(response.message, "success");
      // toast.success(response.message);

      //   window.location.href = "/forms";
      router.push("/forms");
    } else {
      triggerGlobalToast(response.message || response.error, "error");
    }
  } catch (err) {
    if (err instanceof Error) {
      triggerGlobalToast(err.message, "error");
    } else {
      triggerGlobalToast("An error occured. Please try again.", "error");
    }
  }
}
