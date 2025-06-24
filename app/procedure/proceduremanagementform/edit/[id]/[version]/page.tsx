// import React from "react";
// import ProcedureForm from "../../page";
// import { UserProvider } from "@/app/components/(context)/usercontext";

// interface EditPageProps {
//   params: { id: string };
// }

// const EditProcedurePage = ({ params }: EditPageProps) => {
//   const { id } = params;

//   console.log("EditPage");

//   return (
//     <div>
//       <UserProvider>
//         <ProcedureForm procedureID={id} />
//       </UserProvider>
//     </div>
//   );
// };

// export default EditProcedurePage;

import React from "react";
import ProcedureForm from "../../../page";
import { UserProvider } from "@/app/components/(context)/usercontext";

interface EditPageProps {
  params: { id: string, version: string };
}

// Mark the component as async
const EditProcedurePage = async ({ params }: EditPageProps) => {
  const { id, version } = params;

  console.log("EditPage");

  return (
    <div>
      <UserProvider>
        <ProcedureForm procedureID={id} version={version} />
      </UserProvider>
    </div>
  );
};

export default EditProcedurePage;
