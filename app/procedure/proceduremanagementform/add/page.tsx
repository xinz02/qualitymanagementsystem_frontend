import React from "react";
import ProcedureForm from "../page";
import { UserProvider } from "@/app/components/(context)/usercontext";

const AddProcedurePage = () => {
  return (
    <div>
      <UserProvider>
        <ProcedureForm />
      </UserProvider>
    </div>
  );
};

export default AddProcedurePage;
