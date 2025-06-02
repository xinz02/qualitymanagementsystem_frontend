import React from "react";
import ProcedureForm from "../../page";

interface EditPageProps {
    params: { id: string };
  }

const EditProcedurePage = ({ params }: EditPageProps) => {
    const { id } = params;

    console.log("EditPage");

  return (
    <div>
      <ProcedureForm procedureID={id} />
    </div>
  );
};

export default EditProcedurePage;
