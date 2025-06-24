// // components/GlobalToast.tsx
// "use client";
// import { useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";

// export default function GlobalToast() {
//   useEffect(() => {
//     console.log("toast");
//     const message = sessionStorage.getItem("toastMessage");
//     const type = sessionStorage.getItem("toastType") || "success";

//     if (message) {
//       if (type === "success") {
//         toast.success(message);
//       } else {
//         toast.error(message);
//       }
//       //   toast[type](message); // toast.success(), toast.error(), etc.
//       sessionStorage.removeItem("toastMessage");
//       sessionStorage.removeItem("toastType");
//     }
//   }, [
//     sessionStorage.getItem("toastMessage") ||
//       sessionStorage.getItem("toastType"),
//   ]);

//   return <ToastContainer position="top-right" autoClose={3000} />;
// }

"use client";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function GlobalToast() {
  useEffect(() => {
    const handler = () => {
      const message = sessionStorage.getItem("toastMessage");
      const type = sessionStorage.getItem("toastType") || "success";

      if (message) {
        if (type === "success") toast.success(message);
        else if (type === "error") toast.error(message);
        else if (type === "info") toast.info(message);
        else if (type === "warning") toast.warning(message);
        else toast(message);

        sessionStorage.removeItem("toastMessage");
        sessionStorage.removeItem("toastType");
      }
    };

    window.addEventListener("show-toast", handler);
    return () => window.removeEventListener("show-toast", handler);
  }, []);

  return <ToastContainer position="top-right" autoClose={3000} />;
}
