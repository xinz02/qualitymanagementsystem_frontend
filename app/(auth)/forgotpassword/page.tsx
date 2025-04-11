"use client";

import React from "react";
import { useActionState, useState, useEffect } from "react";
import { forgotPassword } from "./forgotpassword";

const ForgotPasswordPage = () => {
  const [state, formAction, pending] = useActionState(forgotPassword, {
    message: "",
    error: "",
  });
  const [showMessage, setShowMessage] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (state.message) {
      setShowMessage(true);
      setShowError(false);
    } else if (state.error) {
      setShowMessage(false);
      setShowError(true);
      const timer = setTimeout(() => setShowMessage(false), 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="p-5 w-full h-full content-evenly">
      {showMessage && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{state.message}</span>
        </div>
      )}
      {showError && (
        <div className="mx-25">
          <div className="alert bg-red-200 rounded-md shadow-lg justify-center">
            <span className="font-medium text-base">{state.error}</span>
          </div>
        </div>
      )}
      <div className="text-center mx-9 mt-0 mb-5">
        <p className="font-extrabold text-4xl py-5">Forgot Password</p>
        <p className="text-gray-600 font-thin text-lg">
          Please enter your email.
        </p>
      </div>

      <div className="flex justify-center mx-9">
        <form
          action={formAction}
          className="w-full mx-9 content-evenly justify-items-center"
        >
          <div className="mb-5">
            <fieldset className="fieldset w-full py-2">
              <legend className="fieldset-legend font-thin text-sm text-gray-600">
                Email Address
              </legend>
              <input
                type="email"
                name="email"
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
