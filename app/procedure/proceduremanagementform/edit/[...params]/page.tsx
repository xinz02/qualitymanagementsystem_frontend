import React from "react";
import { UserProvider } from "@/app/components/(context)/usercontext";
import ProcedureForm from "../../page";

interface EditPageProps {
  //   params: { id: string; version?: string };
  params: { params: string[] };
}

// Mark the component as async
const EditProcedurePage = async ({ params }: EditPageProps) => {
  //   const { id, version } = params;
  const [id, version] = params.params;

  return (
    <div>
      <UserProvider>
        <ProcedureForm procedureID={id} version={version} />
      </UserProvider>
    </div>
  );
};

export default EditProcedurePage;
