"use client";

import React, { Suspense } from "react";
import ResetPasswordForm from "./resetpasswordform";

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;
