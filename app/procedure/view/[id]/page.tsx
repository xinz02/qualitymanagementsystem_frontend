// "use client";

// import React, { useEffect } from "react";
// import { useState } from "react";
// import { Procedure, ProcedureApproveStatus } from "@/app/interface/Procedure";
// import { toast } from "react-toastify";
// import { useParams } from "next/navigation";
// import ProcedurePDFViewer from "@/app/components/(pdf)/pdfviewer";
// import {
//   CornerDownLeft,
//   File,
//   FileCheck,
//   FileText,
//   FileX,
//   SquarePen,
//   Trash2,
// } from "lucide-react";
// import Link from "next/link";
// import {
//   bytesToMB,
//   fetchEvidenceFilesByFlowChart,
//   handleDeleteProcedure,
// } from "../../proceduremanagement";
// import LoadingSpinner from "@/app/components/(common)/loadingspinner";
// import { FlowChartsEvidenceFileData } from "@/app/interface/EvidenceFile";
// import { FlowChart } from "@/app/interface/FlowChartData";
// import EvidenceTable from "./evidencetable";
// import { useForm } from "react-hook-form";
// import { triggerGlobalToast } from "@/app/components/(common)/toast/showtoast";

// const ProcedureViewPage = () => {
//   const id = useParams().id as string;

//   const [procedure, setProcedure] = useState<Procedure>();
//   const [token, setToken] = useState("");
//   const [role, setRole] = useState("");
//   const [userId, setUserId] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   // const [selectedTab, setSelectedTab] = useState<"procedure" | "evidence">(
//   //   "procedure"
//   // );
//   const [evidenceFiles, setEvidenceFiles] =
//     useState<FlowChartsEvidenceFileData | null>(null);
//   const [flowCharts, setFlowCharts] = useState<FlowChart>();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm<ProcedureApproveStatus>();

//   useEffect(() => {
//     const jwtToken = localStorage.getItem("jwt") || "";
//     const userRole = localStorage.getItem("userRole") || "STUDENT";
//     const userID = localStorage.getItem("userId") || "";

//     setToken(jwtToken);
//     setRole(userRole);
//     setUserId(userID);
//   }, []);

//   const getProcedureById = async (id: string) => {
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/procedure/getProcedure/${id}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await res.json();

//       if (!res.ok) {
//         throw new Error(result.message || "Procedure not exists.");
//       }

//       const procedureData: Procedure = result.data;
//       console.log("procedureData: ", result);

//       if (!procedureData) {
//         throw new Error(result.message || "Procedure not exists.");
//       } else {
//         setProcedure(procedureData);
//       }
//     } catch (error) {
//       console.error("Failed to load procedure:", error);
//       toast.error((error as Error)?.message || "Failed to load procedure data");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchEvidenceFiles = async (flowChartId: string) => {
//     try {
//       console.log("evidence files fetching 123");
//       const data = await fetchEvidenceFilesByFlowChart(flowChartId);

//       console.log("Flowchart evidence: ", data);
//       setEvidenceFiles(data);
//     } catch (err) {
//       console.log(err);
//       setEvidenceFiles(null);
//       toast.error((err as Error).message);
//     }
//   };

//   const updateProcedureStatus = async (
//     // procedureId: string,
//     // approverId: string,
//     // status: string,
//     // descri
//     data: ProcedureApproveStatus
//   ) => {
//     if (!procedure?.procedureId || !userId) {
//       triggerGlobalToast("Invalid procedure or approver.", "error");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("jwt") || "";

//       console.log("Data: ", data);

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/procedure/updateProcedureStatus/${procedure?.procedureId}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           //add version?
//           body: JSON.stringify({
//             approverId: userId,
//             status: data.status,
//             description: data.description,
//           }),
//         }
//       );

//       const response = await res.json();

//       if (res.ok) {
//         reset();
//         getProcedureById(procedure?.procedureId);
//         triggerGlobalToast(
//           response.message || "Procedure status updated successfully.",
//           "success"
//         );
//       } else {
//         triggerGlobalToast(
//           response.message ||
//             response.error ||
//             "Fail to update procedure status. Please try again later.",
//           "error"
//         );
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         triggerGlobalToast(error.message, "error");
//       } else {
//         triggerGlobalToast("An error occured. Please try again.", "error");
//       }
//     }
//   };

//   useEffect(() => {
//     getProcedureById(id);
//   }, [id]);

//   useEffect(() => {
//     if (procedure) {
//       if (!procedure.procedureTemplateData && !procedure.fileDownloadUrl) {
//         setIsLoading(false);
//       } else if (
//         procedure.fileDownloadUrl &&
//         procedure.fileType !== "application/pdf" &&
//         isLoading
//       ) {
//         setIsLoading(false);
//       }
//     }
//   }, [procedure, isLoading]);

//   useEffect(() => {
//     if (
//       procedure &&
//       procedure.procedureTemplateData &&
//       procedure.procedureTemplateData.cartaFungsi.flowChartId
//     ) {
//       setFlowCharts(procedure.procedureTemplateData.cartaFungsi);
//       fetchEvidenceFiles(
//         procedure.procedureTemplateData.cartaFungsi.flowChartId
//       );
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
//         </div>

//         {isLoading ? (
//           <LoadingSpinner />
//         ) : (
//           <div className="flex flex-col w-full justify-center items-center mb-5">
//             <div className="flex items-center justify-center w-full ">
//               {!procedure ? (
//                 <div className="flex flex-col gap-5 justify-center items-center h-[50vh] w-full">
//                   <FileX className="h-20 w-20" />
//                   <span className="font-bold text-lg">
//                     Procedure not exists.
//                   </span>
//                 </div>
//               ) : !procedure?.procedureTemplateData &&
//                 !procedure?.fileDownloadUrl ? (
//                 <div className="flex flex-col gap-5 justify-center items-center h-[50vh] w-full">
//                   <FileX className="h-20 w-20" />
//                   <span className="font-bold text-lg">
//                     Procedure not ready yet.
//                   </span>
//                 </div>
//               ) : procedure?.procedureTemplateData ? (
//                 <>
//                   <div className="w-full">
//                     {(role === "ADMIN" ||
//                       role === "SPK_MANAGER" ||
//                       (userId !== "" &&
//                         procedure?.approver?.userId === userId)) && (
//                       <div className="mt-3 mb-4 w-full flex justify-center gap-2 items-center">
//                         <span className="font-semibold text-lg">
//                           Approve Status:
//                         </span>
//                         <div
//                           className={`border-1 border-gray-400 p-2 ${
//                             procedure.approveStatus === "PENDING"
//                               ? `bg-yellow-400`
//                               : procedure.approveStatus === "REJECT"
//                               ? `bg-red-500`
//                               : `bg-green-500`
//                           }`}
//                         >
//                           <span className="font-semibold text-lg">
//                             {procedure.approveStatus}
//                           </span>
//                         </div>
//                       </div>
//                     )}

//                     <div className="tabs tabs-bordered justify-center mb-6">
//                       <input
//                         type="radio"
//                         name="procedure_tabs"
//                         role="tab"
//                         className="tab text-lg font-semibold"
//                         aria-label="📄 Procedure"
//                         defaultChecked
//                       />
//                       <div
//                         role="tabpanel"
//                         className="tab-content bg-base-100 border-base-300 rounded-box w-full min-h-[100vh]"
//                       >
//                         {/* <div className="w-full min-h-[100vh]"> */}
//                         <ProcedurePDFViewer
//                           templateData={procedure.procedureTemplateData}
//                           onPDFReady={() => {
//                             setIsLoading(false);
//                           }}
//                         />
//                         {/* </div> */}
//                       </div>
//                       {role === "ADMIN" ||
//                         role === "SPK_MANAGER" ||
//                         (userId !== "" &&
//                           procedure?.approver?.userId === userId && (
//                             <>
//                               <input
//                                 type="radio"
//                                 name="procedure_tabs"
//                                 role="tab"
//                                 className="tab text-lg font-semibold"
//                                 aria-label="📁 Evidence Files"
//                               />
//                               <div
//                                 role="tabpanel"
//                                 className="tab-content bg-base-100 border-base-300 rounded-box p-6"
//                               >
//                                 <div className="w-full min-h-[100vh]">
//                                   {evidenceFiles && (
//                                     <div className="w-full h-full overflow-y-auto space-y-5">
//                                       <div className="collapse collapse-arrow bg-base-100 border border-base-300">
//                                         <input
//                                           type="radio"
//                                           name="my-accordion-2"
//                                           defaultChecked
//                                           className="peer"
//                                         />
//                                         <div className="collapse-title font-bold text-lg text-white bg-[#C67A83] peer-checked:bg-[#b8636d]">
//                                           Main Flow Chart
//                                         </div>
//                                         <div className="collapse-content text-sm">
//                                           <EvidenceTable
//                                             nodes={
//                                               flowCharts?.mainFlowChart
//                                                 ?.nodes ?? []
//                                             }
//                                             nodeFiles={
//                                               evidenceFiles
//                                                 ?.mainFlowChartEvidenceFile
//                                                 ?.nodeFiles
//                                             }
//                                           />
//                                         </div>
//                                       </div>
//                                       {flowCharts?.subFlowCharts.map(
//                                         (subFlowChart, index) => {
//                                           const matchingSubEvidence =
//                                             evidenceFiles?.subFlowChartsEvidenceFile.find(
//                                               (evidence) =>
//                                                 evidence.flowChart ===
//                                                 subFlowChart.id
//                                             );

//                                           return (
//                                             <div
//                                               key={subFlowChart.id}
//                                               className="w-full h-full overflow-y-auto space-y-5"
//                                             >
//                                               <div className="collapse collapse-arrow bg-base-100 border border-base-300">
//                                                 <input
//                                                   type="radio"
//                                                   name="my-accordion-2"
//                                                   className="peer"
//                                                 />
//                                                 <div className="collapse-title font-bold text-lg text-white bg-[#C67A83] peer-checked:bg-[#b8636d]">
//                                                   {subFlowChart.title ||
//                                                     `Sub Flow Chart ${
//                                                       index + 1
//                                                     }`}
//                                                 </div>
//                                                 <div className="collapse-content text-sm">
//                                                   <EvidenceTable
//                                                     nodes={
//                                                       subFlowChart?.nodes ?? []
//                                                     }
//                                                     nodeFiles={
//                                                       matchingSubEvidence?.nodeFiles ??
//                                                       []
//                                                     }
//                                                   />
//                                                 </div>
//                                               </div>
//                                             </div>
//                                           );
//                                         }
//                                       )}
//                                     </div>
//                                   )}
//                                 </div>
//                               </div>
//                             </>
//                           ))}
//                     </div>

//                     {/* <div className="tabs tabs-bordered justify-center mb-6">
//                       <input
//                         type="radio"
//                         name="procedure_tabs"
//                         role="tab"
//                         className="tab text-lg font-semibold"
//                         aria-label="📄 Procedure"
//                         checked={selectedTab === "procedure"}
//                         onChange={() => setSelectedTab("procedure")}
//                       />
//                       <div
//                         role="tabpanel"
//                         className="tab-content bg-base-100 border-base-300 rounded-box w-full min-h-[100vh]"
//                       >
//                         {selectedTab === "procedure" && (
//                           <ProcedurePDFViewer
//                             templateData={procedure.procedureTemplateData}
//                             onPDFReady={() => {
//                               setIsLoading(false);
//                             }}
//                           />
//                         )}
//                       </div>

//                       <input
//                         type="radio"
//                         name="procedure_tabs"
//                         role="tab"
//                         className="tab text-lg font-semibold"
//                         aria-label="📁 Evidence Files"
//                         checked={selectedTab === "evidence"}
//                         onChange={() => setSelectedTab("evidence")}
//                       />
//                       <div
//                         role="tabpanel"
//                         className="tab-content bg-base-100 border-base-300 rounded-box p-6"
//                       >
//                         {selectedTab === "evidence" && (
//                           <div className="w-full min-h-[100vh]">
//                             <span>HI</span>
//                           </div>
//                         )}
//                       </div>
//                     </div> */}
//                   </div>
//                 </>
//               ) : procedure?.fileDownloadUrl ? (
//                 procedure.fileType === "application/pdf" ? (
//                   <iframe
//                     src={`http://localhost:8080${procedure.fileDownloadUrl}`}
//                     style={{
//                       border: "1px solid #ccc",
//                       width: "80%",
//                       height: "100vh",
//                     }}
//                     onLoad={() => setIsLoading(false)}
//                   ></iframe>
//                 ) : (
//                   <div className="flex flex-col gap-5 justify-center items-center h-[50vh] w-full">
//                     <FileText className="h-20 w-20" />
//                     <span className="font-bold text-lg">
//                       Preview for this filetype is currently not supported.
//                     </span>
//                     <span>Click the file below to download.</span>
//                     <div className="bg-[#eeeeee] hover:bg-[#dedede] p-3 rounded-xl flex items-center justify-between w-fit">
//                       <div className="flex items-center">
//                         <File className="w-6 h-6 mx-2" />
//                         <div className="flex flex-col justify-start pl-3 pr-5">
//                           <span className="font-semibold text-[15px]">
//                             <a
//                               href={`http://localhost:8080${procedure.fileDownloadUrl}`}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                             >
//                               {procedure.fileName}
//                             </a>
//                           </span>
//                           <span className="font-normal text-[13px]">
//                             {procedure.fileSize !== undefined
//                               ? bytesToMB(procedure.fileSize)
//                               : ""}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )
//               ) : null}
//             </div>
//           </div>
//         )}

//         {procedure ? (
//           (role === "ADMIN" ||
//             role === "SPK_MANAGER" ||
//             (userId !== "" &&
//               Array.isArray(procedure?.assignedTo) &&
//               procedure.assignedTo.some((user) => user.userId === userId))) && (
//             <div className="flex justify-center items-center gap-5">
//               <button
//                 type="button"
//                 className="btn bg-[#C67A83] hover:bg-[#b96670] text-white"
//               >
//                 <Link
//                   className="w-full h-full flex justify-center items-center gap-2"
//                   href={`/procedure/proceduremanagementform/edit/${procedure.procedureId}`}
//                 >
//                   <SquarePen className="h-5 w-5" />
//                   Edit
//                 </Link>
//               </button>
//               <button
//                 type="button"
//                 className="btn bg-red-600 hover:bg-red-700 text-white gap-2 flex justify-center items-center"
//                 onClick={() => {
//                   if (procedure.procedureId) {
//                     handleDeleteProcedure(procedure.procedureId);
//                   } else {
//                     toast.error("Procedure does not exist.");
//                   }
//                 }}
//               >
//                 <Trash2 className="h-5 w-5" />
//                 Delete
//               </button>
//             </div>
//           )
//         ) : (
//           <div className="flex justify-center items-center gap-5">
//             <button
//               type="button"
//               className="btn bg-[#C67A83] hover:bg-[#b96670] text-white"
//             >
//               <Link
//                 className="w-full h-full flex justify-center items-center gap-2"
//                 href={`/procedure`}
//               >
//                 <CornerDownLeft className="h-5 w-5" />
//                 Return
//               </Link>
//             </button>
//           </div>
//         )}

//         {procedure &&
//           procedure?.approver?.userId === userId &&
//           procedure.approveStatus === "PENDING" && (
//             <div className="flex items-center justify-center gap-5">
//               <button
//                 type="button"
//                 className="btn bg-green-600 hover:bg-green-700 text-white gap-2 flex justify-center items-center w-[120px]"
//                 onClick={() => {
//                   if (procedure.procedureId) {
//                     if (procedure.approveStatus === "PENDING") {
//                       setValue("description", "-");
//                       setValue("status", "APPROVE");
//                       // updateProcedureStatus();
//                       handleSubmit(updateProcedureStatus)();
//                     } else {
//                       toast.error("Procedure approved! Please refresh again.");
//                     }
//                   } else {
//                     toast.error("Procedure does not exist.");
//                   }
//                 }}
//               >
//                 <FileCheck className="h-5 w-5" />
//                 Approve
//               </button>

//               <button
//                 type="button"
//                 className="btn bg-red-600 hover:bg-red-700 text-white gap-2 flex justify-center items-center w-[120px]"
//                 onClick={() => {
//                   if (procedure.procedureId) {
//                     if (procedure.approveStatus === "PENDING") {
//                       // updateProcedureStatus(
//                       //   procedure.procedureId,
//                       //   procedure.approver.userId!,
//                       //   "REJECT"
//                       // );
//                       (
//                         document.getElementById(
//                           "reject_procedure_modal"
//                         ) as HTMLDialogElement
//                       )?.showModal();
//                     } else {
//                       toast.error("Procedure approved! Please refresh again.");
//                     }
//                   } else {
//                     toast.error("Procedure does not exist.");
//                   }
//                 }}
//               >
//                 <FileX className="h-5 w-5" />
//                 Reject
//               </button>
//             </div>
//           )}
//       </div>

//       <dialog id="reject_procedure_modal" className="modal">
//         <div className="modal-box w-1/3 max-w-5xl">
//           <h3 className="font-bold text-lg mb-2">Reject Description</h3>
//           {procedure && (
//             <form onSubmit={handleSubmit(updateProcedureStatus)}>
//               <div className="mb-5">
//                 <fieldset className="fieldset w-full pt-2 pb-2 relative">
//                   <textarea
//                     className="textarea rounded-lg pr-10 w-full"
//                     placeholder="Reject Description"
//                     {...register("description", {
//                       required: "Reject Description required.",
//                     })}
//                   ></textarea>
//                   {errors.description && (
//                     <p className="text-sm pt-1 text-red-500 ">
//                       {errors.description.message}
//                     </p>
//                   )}
//                 </fieldset>

//                 <input type="hidden" value="REJECT" {...register("status")} />

//                 <div className="modal-action">
//                   <button
//                     type="submit"
//                     className="btn bg-[#C67A83] text-white border-0 hover:bg-[#b96670]"
//                   >
//                     Save
//                   </button>
//                   <button
//                     type="button"
//                     className="btn"
//                     onClick={() => {
//                       (
//                         document.getElementById(
//                           "reject_procedure_modal"
//                         ) as HTMLDialogElement
//                       )?.close();
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </form>
//           )}
//         </div>
//       </dialog>
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
  const role = localStorage.getItem("userRole") || "STUDENT";
  const userId = localStorage.getItem("userId");
  const [selectedVersion, setSelectedVersion] = useState(1);
  const [isVersionPanelOpen, setIsVersionPanelOpen] = useState(false);

  // selectedVersion is number
  // const displayProcedure: ProcedureVersion | null = useMemo(() => {
  //   if (!procedure?.pindaanDokumen?.length) return null;

  //   // Try to find the selected version
  //   const selected = procedure.pindaanDokumen.find(
  //     (v) => Number(v.versi) === selectedVersion
  //   );

  //   // If found, return a ProcedureVersion with that version
  //   if (selected) {
  //     return {
  //       ...procedure,
  //       pindaanDokumen: selected,
  //     };
  //   }

  //   // Fallback to latest version (highest version number)
  //   const latest = procedure.pindaanDokumen.reduce((prev, curr) =>
  //     Number(curr.versi) > Number(prev.versi) ? curr : prev
  //   );

  //   return {
  //     ...procedure,
  //     pindaanDokumen: latest,
  //   };
  // }, [procedure, selectedVersion]);
  // const displayProcedure: ProcedureVersion | null = useMemo(() => {
  //   if (!procedure) return null;

  //   // If no pindaanDokumen, return procedure with file-related fields
  //   if (!procedure.pindaanDokumen || procedure.pindaanDokumen.length === 0) {
  //     return {
  //       procedureId: procedure.procedureId,
  //       procedureNumber: procedure.procedureNumber,
  //       procedureName: procedure.procedureName,
  //       module: procedure.module,
  //       category: procedure.category,
  //       viewPrivilege: procedure.viewPrivilege,
  //       fileName: procedure.fileName,
  //       fileType: procedure.fileType,
  //       fileDownloadUrl: procedure.fileDownloadUrl,
  //       fileSize: procedure.fileSize,
  //     };
  //   }

  //   // Try to find the selected version
  //   const selected = procedure.pindaanDokumen.find(
  //     (v) => Number(v.versi) === selectedVersion
  //   );

  //   // If found, return ProcedureVersion with that selected version
  //   if (selected) {
  //     setSelectedVersion(parseInt(selected.versi));
  //     return {
  //       ...procedure,
  //       pindaanDokumen: selected,
  //     };

  //   }

  //   // Fallback to latest version
  //   const latest = procedure.pindaanDokumen.reduce((prev, curr) =>
  //     Number(curr.versi) > Number(prev.versi) ? curr : prev
  //   );
  //   setSelectedVersion(parseInt(latest.versi));

  //   return {
  //     ...procedure,
  //     pindaanDokumen: latest,
  //   };
  // }, [procedure, selectedVersion]);
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

  // useEffect(() => {
  //   const jwtToken = localStorage.getItem("jwt") || "";
  //   const userRole = localStorage.getItem("userRole") || "STUDENT";
  //   const userID = localStorage.getItem("userId") || "";

  //   setToken(jwtToken);
  //   setRole(userRole); // Will trigger re-render
  //   setUserId(userID);
  //   console.log("Role: ", role);
  // }, []);

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
                procedure.pindaanDokumen.map((procedure) => {
                  if (procedure.assignTo) {
                    procedure.assignTo.some((user) => user.userId === userId);
                  }
                }))) && (
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
