import React from "react";
import FormManagementForm from "../formmanagementform";
import { UserProvider } from "@/app/components/(context)/usercontext";

const AddFormPage = () => {
  return (
    <UserProvider>
      <FormManagementForm />
    </UserProvider>
  );
};

export default AddFormPage;
