// "use client";

// import React, { useEffect, useState } from "react";
// import { useActionState } from "react";
// import { login } from "./login";

// const LoginForm = () => {
//   const [state, loginAction, pending] = useActionState({ error: "" });

//   const [showError, setShowError] = useState(false);

//   useEffect(() => {
//     if (state.error) {
//       setShowError(true);
//       const timer = setTimeout(() => setShowError(false), 3000); // Hide after 3 seconds
//       return () => clearTimeout(timer);
//     }
//   }, [state.error]);

//   return (
//     <div className="p-5 w-full h-full content-evenly">
//       {showError && (
//         <div className="mx-25">
//           <div className="alert bg-red-200 rounded-md shadow-lg justify-center">
//             <span className="font-medium text-base">{state.error}</span>
//           </div>
//         </div>
//       )}
//       <div className="text-center mx-9 mt-0 mb-5">
//         <p className="font-extrabold text-4xl py-5">Login</p>
//         <p className="text-gray-600 font-thin text-lg">
//           Please login to continue.
//         </p>
//       </div>

//       <div className="flex justify-center mx-9">
//         <form
//           action={loginAction}
//           className="w-full mx-9 content-evenly justify-items-center"
//         >
//           <div className="mb-5">
//             <fieldset className="fieldset w-full py-2">
//               <legend className="fieldset-legend font-thin text-sm text-gray-600">
//                 USERNAME
//               </legend>
//               <input type="text" name="username" required className="input rounded-lg" />
//             </fieldset>

//             <fieldset className="fieldset w-full py-2">
//               <legend className="fieldset-legend font-thin text-sm text-gray-600">
//                 PASSWORD
//               </legend>
//               <input
//                 type="password"
//                 name="password"
//                 required
//                 className="input rounded-lg"
//               />
//             </fieldset>
//           </div>

//           <button
//             type="submit"
//             disabled={pending}
//             className="btn bg-[#464646] text-white font-thin text-sm rounded-xl px-6 h-9"
//           >
//             LOGIN
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { login } from "./login";
import jwt from "jsonwebtoken";

const LoginForm = () => {
  const [state, loginAction, pending] = useActionState(login, {
    error: "",
    token: "",
  });
  const [showError, setShowError] = useState(false);

  // Decode JWT when login is successful
  useEffect(() => {
    if (state.token) {
      console.log("JWT Token:", state.token);

      const decodedToken = jwt.decode(state.token);
      console.log("Decoded JWT:", decodedToken);

      if (decodedToken) {
        localStorage.setItem("jwt", state.token);
        localStorage.setItem("user", JSON.stringify(decodedToken));

        window.location.href = "/";
      } else {
        setShowError(true);
      }
    }
  }, [state.token]);

  useEffect(() => {
    if (state.error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [state.error]);

  return (
    <div className="p-5 w-full h-full content-evenly">
      {showError && (
        <div className="mx-25">
          <div className="alert bg-red-200 rounded-md shadow-lg justify-center">
            <span className="font-medium text-base">{state.error}</span>
          </div>
        </div>
      )}
      <div className="text-center mx-9 mt-0 mb-5">
        <p className="font-extrabold text-4xl py-5">Login</p>
        <p className="text-gray-600 font-thin text-lg">
          Please login to continue.
        </p>
      </div>

      <div className="flex justify-center mx-9">
        <form
          action={loginAction}
          className="w-full mx-9 content-evenly justify-items-center"
        >
          <div className="mb-5">
            <fieldset className="fieldset w-full py-2">
              <legend className="fieldset-legend font-thin text-sm text-gray-600">
                USERNAME
              </legend>
              <input
                type="text"
                name="username"
                required
                className="input rounded-lg"
              />
            </fieldset>

            <fieldset className="fieldset w-full py-2">
              <legend className="fieldset-legend font-thin text-sm text-gray-600">
                PASSWORD
              </legend>
              <input
                type="password"
                name="password"
                required
                className="input rounded-lg"
              />
            </fieldset>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="btn bg-[#464646] text-white font-thin text-sm rounded-xl px-6 h-9"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
