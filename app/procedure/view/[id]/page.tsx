// // "use client";

// // import React, { useEffect } from "react";
// // import { useState } from "react";
// // import { Procedure, ProcedureVersion } from "@/app/interface/Procedure";
// // import { useParams } from "next/navigation";
// // import { CornerDownLeft, History } from "lucide-react";
// // import Link from "next/link";

// // import { triggerGlobalToast } from "@/app/components/(common)/toast/showtoast";
// // import VersionHistoryPanel from "./versionhistorypanel";
// // import { useMemo } from "react";
// // import DisplayProcedurePage from "./displayprocedurepage";
// // import { AuthProvider, useAuth } from "@/app/components/(context)/authcontext";

// // const ProcedureViewPageComponent = () => {
// //   const id = useParams().id as string;

// //   const { jwtToken, isAuthReady } = useAuth();
// //   const role = localStorage.getItem("userRole") || "";

// //   const [procedure, setProcedure] = useState<Procedure | null>(null);
// //   // const [role, setRole] = useState<string>("");
// //   const [userId, setUserId] = useState<string>("");
// //   const [selectedVersion, setSelectedVersion] = useState(1);
// //   const [isVersionPanelOpen, setIsVersionPanelOpen] = useState(false);

// //   // selectedVersion is number
// //   // const displayProcedure: ProcedureVersion | null = useMemo(() => {
// //   //   if (!procedure?.pindaanDokumen?.length) return null;

// //   //   // Try to find the selected version
// //   //   const selected = procedure.pindaanDokumen.find(
// //   //     (v) => Number(v.versi) === selectedVersion
// //   //   );

// //   //   // If found, return a ProcedureVersion with that version
// //   //   if (selected) {
// //   //     return {
// //   //       ...procedure,
// //   //       pindaanDokumen: selected,
// //   //     };
// //   //   }

// //   //   // Fallback to latest version (highest version number)
// //   //   const latest = procedure.pindaanDokumen.reduce((prev, curr) =>
// //   //     Number(curr.versi) > Number(prev.versi) ? curr : prev
// //   //   );

// //   //   return {
// //   //     ...procedure,
// //   //     pindaanDokumen: latest,
// //   //   };
// //   // }, [procedure, selectedVersion]);
// //   // const displayProcedure: ProcedureVersion | null = useMemo(() => {
// //   //   if (!procedure) return null;

// //   //   // If no pindaanDokumen, return procedure with file-related fields
// //   //   if (!procedure.pindaanDokumen || procedure.pindaanDokumen.length === 0) {
// //   //     return {
// //   //       procedureId: procedure.procedureId,
// //   //       procedureNumber: procedure.procedureNumber,
// //   //       procedureName: procedure.procedureName,
// //   //       module: procedure.module,
// //   //       category: procedure.category,
// //   //       viewPrivilege: procedure.viewPrivilege,
// //   //       fileName: procedure.fileName,
// //   //       fileType: procedure.fileType,
// //   //       fileDownloadUrl: procedure.fileDownloadUrl,
// //   //       fileSize: procedure.fileSize,
// //   //     };
// //   //   }

// //   //   // Try to find the selected version
// //   //   const selected = procedure.pindaanDokumen.find(
// //   //     (v) => Number(v.versi) === selectedVersion
// //   //   );

// //   //   // If found, return ProcedureVersion with that selected version
// //   //   if (selected) {
// //   //     setSelectedVersion(parseInt(selected.versi));
// //   //     return {
// //   //       ...procedure,
// //   //       pindaanDokumen: selected,
// //   //     };

// //   //   }

// //   //   // Fallback to latest version
// //   //   const latest = procedure.pindaanDokumen.reduce((prev, curr) =>
// //   //     Number(curr.versi) > Number(prev.versi) ? curr : prev
// //   //   );
// //   //   setSelectedVersion(parseInt(latest.versi));

// //   //   return {
// //   //     ...procedure,
// //   //     pindaanDokumen: latest,
// //   //   };
// //   // }, [procedure, selectedVersion]);
// //   const displayProcedure: ProcedureVersion | null = useMemo(() => {
// //     if (!procedure) return null;

// //     if (!procedure.pindaanDokumen || procedure.pindaanDokumen.length === 0) {
// //       return {
// //         procedureId: procedure.procedureId,
// //         procedureNumber: procedure.procedureNumber,
// //         procedureName: procedure.procedureName,
// //         module: procedure.module,
// //         category: procedure.category,
// //         viewPrivilege: procedure.viewPrivilege,
// //         fileName: procedure.fileName,
// //         fileType: procedure.fileType,
// //         fileDownloadUrl: procedure.fileDownloadUrl,
// //         fileSize: procedure.fileSize,
// //       };
// //     }

// //     const selected = procedure.pindaanDokumen.find(
// //       (v) => Number(v.versi) === selectedVersion
// //     );

// //     return selected ? { ...procedure, pindaanDokumen: selected } : null;
// //   }, [procedure, selectedVersion]);

// //   // useEffect(() => {
// //   //   const jwtToken = localStorage.getItem("jwt") || "";
// //   //   const userRole = localStorage.getItem("userRole") || "STUDENT";
// //   //   const userID = localStorage.getItem("userId") || "";

// //   //   setToken(jwtToken);
// //   //   setRole(userRole); // Will trigger re-render
// //   //   setUserId(userID);
// //   //   console.log("Role: ", role);
// //   // }, []);

// //   const getProcedureById = async (id: string) => {
// //     // const jwtToken = localStorage.getItem("jwt") || "";

// //     try {
// //       const res = await fetch(
// //         `${process.env.NEXT_PUBLIC_API_URL}/procedure/getProcedure/${id}`,
// //         {
// //           method: "GET",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${jwtToken}`,
// //           },
// //         }
// //       );

// //       const result = await res.json();

// //       if (!res.ok) {
// //         throw new Error(
// //           result.message || result.error || "Procedure not exists."
// //         );
// //       }

// //       const procedureData: Procedure = result.data;
// //       console.log("procedureData: ", result);

// //       if (!procedureData) {
// //         throw new Error(result.message || "Procedure not exists.");
// //       } else {
// //         setProcedure(procedureData);
// //       }
// //     } catch (error) {
// //       if (error instanceof Error) {
// //         triggerGlobalToast(error.message, "error");
// //       } else {
// //         triggerGlobalToast("An unknown error occurred", "error");
// //       }
// //     }
// //   };

// //   useEffect(() => {
// //     if (isAuthReady) getProcedureById(id);
// //   }, [id, isAuthReady]);

// //   useEffect(() => {
// //     // setRole(localStorage.getItem("userRole") || "STUDENT");
// //     setUserId(localStorage.getItem("userId"));
// //   });

// //   useEffect(() => {
// //     if (procedure?.pindaanDokumen?.length) {
// //       const latest = procedure.pindaanDokumen.reduce((prev, curr) =>
// //         Number(curr.versi) > Number(prev.versi) ? curr : prev
// //       );
// //       setSelectedVersion(Number(latest.versi));
// //     }
// //   }, [procedure]);

// //   return (
// //     <>
// //       <div className="flex flex-col items-center justify-center p-12 w-full">
// //         <div className="w-full flex items-center">
// //           <button type="button" className="btn btn-ghost mb-5">
// //             <Link href={`/procedure`}>
// //               <CornerDownLeft className="h-6 w-6" />
// //             </Link>
// //           </button>
// //           <div className="text-4xl font-extrabold mb-5 grow text-center mx-5">
// //             {procedure?.procedureName}
// //           </div>
// //           {procedure?.pindaanDokumen &&
// //             (role === "ADMIN" ||
// //               role === "SPK_MANAGER" ||
// //               (userId &&
// //                 procedure.pindaanDokumen.map((procedure) => {
// //                   if (procedure.assignTo) {
// //                     procedure.assignTo.some((user) => user.userId === userId);
// //                   }
// //                 }))) && (
// //               <div className="">
// //                 {/* Version History Button */}
// //                 <button
// //                   className="btn btn-ghost mb-5"
// //                   onClick={() => setIsVersionPanelOpen(true)}
// //                 >
// //                   <History className="h-5 w-5" />
// //                 </button>
// //               </div>
// //             )}
// //         </div>

// //         <DisplayProcedurePage
// //           procedure={procedure}
// //           displayProcedureVersion={displayProcedure}
// //           refetchProcedure={() => getProcedureById(id)}
// //         />
// //       </div>

// //       {procedure?.pindaanDokumen && (
// //         <VersionHistoryPanel
// //           isOpen={isVersionPanelOpen}
// //           onClose={() => setIsVersionPanelOpen(false)}
// //           versions={procedure?.pindaanDokumen}
// //           selectedVersion={selectedVersion}
// //           setSelectedVersion={setSelectedVersion}
// //           procedureName={procedure?.procedureName}
// //           procedureId={procedure?.procedureId}
// //         />
// //       )}
// //     </>
// //   );
// // };

// // const ProcedureViewPage = () => {
// //   return (
// //     <AuthProvider>
// //       <ProcedureViewPageComponent />
// //     </AuthProvider>
// //   );
// // };

// // export default ProcedureViewPage;

// "use client";

// import React, { useEffect } from "react";
// import { useState } from "react";
// import { Procedure, ProcedureVersion } from "@/app/interface/Procedure";
// import { useParams } from "next/navigation";
// import { CornerDownLeft, History } from "lucide-react";
// import Link from "next/link";

// import { triggerGlobalToast } from "@/app/components/(common)/toast/showtoast";
// import VersionHistoryPanel from "./versionhistorypanel";
// import { useMemo } from "react";
// import DisplayProcedurePage from "./displayprocedurepage";

// const ProcedureViewPage = () => {
//   const id = useParams().id as string;

//   const [procedure, setProcedure] = useState<Procedure | null>(null);
//   const [selectedVersion, setSelectedVersion] = useState(1);
//   const [isVersionPanelOpen, setIsVersionPanelOpen] = useState(false);
//   const role = localStorage.getItem("userRole") || "STUDENT";
//   const userId = localStorage.getItem("userId");

//   const displayProcedure: ProcedureVersion | null = useMemo(() => {
//     if (!procedure) return null;

//     if (!procedure.pindaanDokumen || procedure.pindaanDokumen.length === 0) {
//       return {
//         procedureId: procedure.procedureId,
//         procedureNumber: procedure.procedureNumber,
//         procedureName: procedure.procedureName,
//         module: procedure.module,
//         category: procedure.category,
//         viewPrivilege: procedure.viewPrivilege,
//         fileName: procedure.fileName,
//         fileType: procedure.fileType,
//         fileDownloadUrl: procedure.fileDownloadUrl,
//         fileSize: procedure.fileSize,
//       };
//     }

//     const selected = procedure.pindaanDokumen.find(
//       (v) => Number(v.versi) === selectedVersion
//     );

//     return selected ? { ...procedure, pindaanDokumen: selected } : null;
//   }, [procedure, selectedVersion]);

//   const getProcedureById = async (id: string) => {
//     const jwtToken = localStorage.getItem("jwt") || "";

//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/procedure/getProcedure/${id}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         }
//       );

//       const result = await res.json();

//       if (!res.ok) {
//         throw new Error(
//           result.message || result.error || "Procedure not exists."
//         );
//       }

//       const procedureData: Procedure = result.data;
//       console.log("procedureData: ", result);

//       if (!procedureData) {
//         throw new Error(result.message || "Procedure not exists.");
//       } else {
//         setProcedure(procedureData);
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         triggerGlobalToast(error.message, "error");
//       } else {
//         triggerGlobalToast("An unknown error occurred", "error");
//       }
//     }
//   };

//   useEffect(() => {
//     if (procedure?.pindaanDokumen?.length) {
//       const latest = procedure.pindaanDokumen.reduce((prev, curr) =>
//         Number(curr.versi) > Number(prev.versi) ? curr : prev
//       );
//       setSelectedVersion(Number(latest.versi));
//     }
//   }, [procedure]);

//   return (
//     <>
//       <div className="flex flex-col items-center justify-center p-12 w-full">
//         <div className="w-full flex items-center">
//           <button type="button" className="btn btn-ghost mb-5">
//             <Link href={`/procedure`}>
//               <CornerDownLeft className="h-6 w-6" />
//             </Link>
//           </button>
//           <div className="text-4xl font-extrabold mb-5 grow text-center mx-5">
//             {procedure?.procedureName}
//           </div>
//           {procedure?.pindaanDokumen &&
//             (role === "ADMIN" ||
//               role === "SPK_MANAGER" ||
//               (userId &&
//                 procedure.pindaanDokumen.map((procedure) => {
//                   if (procedure.assignTo) {
//                     procedure.assignTo.some((user) => user.userId === userId);
//                   }
//                 }))) && (
//               <div className="">
//                 {/* Version History Button */}
//                 <button
//                   className="btn btn-ghost mb-5"
//                   onClick={() => setIsVersionPanelOpen(true)}
//                 >
//                   <History className="h-5 w-5" />
//                 </button>
//               </div>
//             )}
//         </div>

//         <DisplayProcedurePage
//           procedure={procedure}
//           displayProcedureVersion={displayProcedure}
//           refetchProcedure={() => getProcedureById(id)}
//         />
//       </div>

//       {procedure?.pindaanDokumen && (
//         <VersionHistoryPanel
//           isOpen={isVersionPanelOpen}
//           onClose={() => setIsVersionPanelOpen(false)}
//           versions={procedure?.pindaanDokumen}
//           selectedVersion={selectedVersion}
//           setSelectedVersion={setSelectedVersion}
//           procedureName={procedure?.procedureName}
//           procedureId={procedure?.procedureId}
//         />
//       )}
//     </>
//   );
// };

// export default ProcedureViewPage;

"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { Procedure, ProcedureVersion } from "@/app/interface/Procedure";
import { useParams } from "next/navigation";
import { CornerDownLeft, History } from "lucide-react";
import Link from "next/link";

import { triggerGlobalToast } from "@/app/components/(common)/toast/showtoast";
import VersionHistoryPanel from "./versionhistorypanel";
import { useMemo } from "react";
import DisplayProcedurePage from "./displayprocedurepage";

const ProcedureViewPage = () => {
  const id = useParams().id as string;

  const [procedure, setProcedure] = useState<Procedure | null>(null);
  const [role, setRole] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [selectedVersion, setSelectedVersion] = useState(1);
  const [isVersionPanelOpen, setIsVersionPanelOpen] = useState(false);

  const displayProcedure: ProcedureVersion | null = useMemo(() => {
    if (!procedure) return null;

    if (!procedure.pindaanDokumen || procedure.pindaanDokumen.length === 0) {
      return {
        procedureId: procedure.procedureId,
        procedureNumber: procedure.procedureNumber,
        procedureName: procedure.procedureName,
        module: procedure.module,
        category: procedure.category,
        viewPrivilege: procedure.viewPrivilege,
        fileName: procedure.fileName,
        fileType: procedure.fileType,
        fileDownloadUrl: procedure.fileDownloadUrl,
        fileSize: procedure.fileSize,
      };
    }

    const selected = procedure.pindaanDokumen.find(
      (v) => Number(v.versi) === selectedVersion
    );

    return selected ? { ...procedure, pindaanDokumen: selected } : null;
  }, [procedure, selectedVersion]);

  const getProcedureById = async (id: string) => {
    const jwtToken = localStorage.getItem("jwt") || "";

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/procedure/getProcedure/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message || result.error || "Procedure not exists."
        );
      }

      const procedureData: Procedure = result.data;
      console.log("procedureData: ", result);

      if (!procedureData) {
        throw new Error(result.message || "Procedure not exists.");
      } else {
        setProcedure(procedureData);
      }
    } catch (error) {
      if (error instanceof Error) {
        triggerGlobalToast(error.message, "error");
      } else {
        triggerGlobalToast("An unknown error occurred", "error");
      }
    }
  };

  useEffect(() => {
    getProcedureById(id);
  }, [id]);

  useEffect(() => {
    if (procedure?.pindaanDokumen?.length) {
      const latest = procedure.pindaanDokumen.reduce((prev, curr) =>
        Number(curr.versi) > Number(prev.versi) ? curr : prev
      );
      setSelectedVersion(Number(latest.versi));
    }
  }, [procedure]);

  useEffect(() => {
    setRole(localStorage.getItem("userRole") || "STUDENT");
    setUserId(localStorage.getItem("userId"));
  }, []);

  console.log("Role: ", role);
  console.log("User ID: ", userId);

  return (
    <>
      <div className="flex flex-col items-center justify-center p-12 w-full">
        <div className="w-full flex items-center">
          <button type="button" className="btn btn-ghost mb-5">
            <Link href={`/procedure`}>
              <CornerDownLeft className="h-6 w-6" />
            </Link>
          </button>
          <div className="text-4xl font-extrabold mb-5 grow text-center mx-5">
            {procedure?.procedureName}
          </div>

          {procedure?.pindaanDokumen &&
            (role === "ADMIN" ||
              role === "SPK_MANAGER" ||
              (userId &&
                procedure.pindaanDokumen.some(
                  (version) =>
                    version.assignTo &&
                    version.assignTo.some((user) => user.userId === userId)
                ))) && (
              <div className="">
                {/* Version History Button */}
                <button
                  className="btn btn-ghost mb-5"
                  onClick={() => setIsVersionPanelOpen(true)}
                >
                  <History className="h-5 w-5" />
                </button>
              </div>
            )}
        </div>

        <DisplayProcedurePage
          procedure={procedure}
          displayProcedureVersion={displayProcedure}
          refetchProcedure={() => getProcedureById(id)}
        />
      </div>

      {procedure?.pindaanDokumen && (
        <VersionHistoryPanel
          isOpen={isVersionPanelOpen}
          onClose={() => setIsVersionPanelOpen(false)}
          versions={procedure?.pindaanDokumen}
          selectedVersion={selectedVersion}
          setSelectedVersion={setSelectedVersion}
          procedureName={procedure?.procedureName}
          procedureId={procedure?.procedureId}
        />
      )}
    </>
  );
};

export default ProcedureViewPage;
