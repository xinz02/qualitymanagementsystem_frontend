import React from "react";
import FormManagementForm from "../../formmanagementform";
import { UserProvider } from "@/app/components/(context)/usercontext";

interface EditPageProps {
  params: { id: string };
}

const EditFormPage = async ({ params }: EditPageProps) => {
  const { id } = params;

  console.log("EditPage");
  return (
    <UserProvider>
      <FormManagementForm formID={id} />
    </UserProvider>
  );
};

export default EditFormPage;
