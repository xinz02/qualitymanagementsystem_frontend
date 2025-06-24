export function triggerGlobalToast(
  message: string,
  type: "success" | "error" | "info" | "warning" = "success"
) {
  sessionStorage.setItem("toastMessage", message);
  sessionStorage.setItem("toastType", type);
  window.dispatchEvent(new Event("show-toast")); // 👈 custom event triggers GlobalToast
}
