"use client";

import React, { Suspense } from "react";
import ResetPasswordForm from "./resetpasswordform";
import LoadingSpinner from "@/app/components/(common)/loadingspinner";

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;
