"use client";

import React, { useActionState } from "react";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { resetPassword } from "./resetpassword";
import { useSearchParams } from "next/navigation";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const tokenId = searchParams.get("token") ?? "";

  const [viewNewPassword, setViewNewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [state, resetPasswordAction, pending] = useActionState(resetPassword, {
    error: "",
    success: "",
  });

  useEffect(() => {
    if (state.error) {
      setShowError(true);
      setShowSuccess(false);
      const timer = setTimeout(() => setShowError(false), 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    } else if (state.success) {
      setShowSuccess(true);
      setShowError(false);
    }
  }, [state]);

  return (
    <div className="p-5 w-full h-full content-evenly">
      {showSuccess && (
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
          <span>{state.success}</span>
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
        <p className="font-extrabold text-4xl py-5">Reset Password</p>
        <p className="text-gray-600 font-thin text-lg">
          Please reset your password.
        </p>
      </div>

      <div className="flex justify-center mx-9">
        <form
          action={resetPasswordAction}
          className="w-full mx-9 content-evenly justify-items-center"
        >
          <input type="hidden" name="token" value={tokenId} />
          <div className="mb-5">
            <fieldset className="fieldset w-full pt-2 pb-2 relative">
              <legend className="fieldset-legend font-thin text-sm text-gray-600">
                NEW PASSWORD
              </legend>
              <input
                type={viewNewPassword ? "text" : "password"}
                name="password"
                required
                className="input rounded-lg pr-10 w-full"
              />
              <button
                type="button"
                className="absolute right-3 top-7 transform -translate-y-1/2 text-gray-600"
                onClick={() => setViewNewPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {viewNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </fieldset>

            <fieldset className="fieldset w-full pt-2 pb-2 relative">
              <legend className="fieldset-legend font-thin text-sm text-gray-600">
                CONFIRMED PASSWORD
              </legend>
              <input
                type={viewConfirmPassword ? "text" : "password"}
                name="confirmedpassword"
                required
                className="input rounded-lg pr-10 w-full"
              />
              <button
                type="button"
                className="absolute right-3 top-7 transform -translate-y-1/2 text-gray-600"
                onClick={() => setViewConfirmPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {viewConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </fieldset>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="btn bg-[#464646] text-white font-thin text-sm rounded-xl px-6 h-9"
          >
            RESET
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
