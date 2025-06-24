// "use client";

// import React, { useState } from "react";
// import ProcedureInfoForm from "../../proceduremanagementform/procedureinfoform";
// import { useForm } from "react-hook-form";
// import { ProcedureFormData } from "@/app/interface/Procedure";
// import { useProcedureFormFields } from "../../proceduremanagement";
// import { CheckIcon, PlusIcon, UploadIcon } from "lucide-react";
// import { SelectOption } from "@/app/interface/SelectOption";
// import UserAsyncSelect from "@/app/components/(dropdownselect)/userselect";
// import { UserProvider } from "@/app/components/(context)/usercontext";
// import { triggerGlobalToast } from "@/app/components/(common)/toast/showtoast";
// import { useRouter } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";

// const CreateProcedureModal = () => {
//   const router = useRouter();
//   const [selectedProcedureMode, setSelectedProcedureMode] = useState<
//     "create" | "upload" | null
//   >(null);
//   //   const [selectedUsers, setSelectedUsers] = useState<SelectOption[]>([]);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm<ProcedureFormData>();

//   const {
//     selectedModule,
//     selectedCategory,
//     categoryOptions,
//     selectedUsers,
//     handleModuleChange,
//     handleCategoryChange,
//     handleSelectUser,
//     setSelectedModule,
//     setSelectedCategory,
//     setCategoryOptions,
//     setSelectedUsers,
//   } = useProcedureFormFields(setValue);

//   //   const handleSelectUser = (newValue: unknown) => {
//   //     const selectedOptions = newValue as SelectOption[];
//   //     setSelectedUsers(selectedOptions || []);

//   //     if (selectedOptions.length > 0) {
//   //       const userIds = selectedOptions.map((user) => user.value);
//   //       setValue("pindaanDokumen.assignedTo", userIds);
//   //       // setFormData({
//   //       //   ...formData,
//   //       //   pindaanDokumen: {
//   //       //     ...formData.pindaanDokumen,
//   //       //     assignedTo: userIds,
//   //       //   },
//   //       // });
//   //     }
//   //   };

//   const handleProcedureSubmit = async (data: ProcedureFormData) => {
//     const token = localStorage.getItem("jwt") || "";
//     if (!token) {
//       triggerGlobalToast("Please login to create new procedure.");
//     }

//     if (data.procedureFile && data.pindaanDokumen) {
//       triggerGlobalToast(
//         "Only allow either create new procedure or upload file.",
//         "error"
//       );
//       return;
//     }

//     try {
//       const formData = new FormData();
//       if (data.procedureFile) {
//         formData.append("file", data.procedureFile);
//       } else {
//         const pindaanDokumenData = JSON.stringify({
//           // pindaanDokumen: templateFormData?.pindaanDokumen,
//           versi: data.pindaanDokumen.versi,
//           assignedTo: data.pindaanDokumen.assignedTo,
//           //   tarikh: templateFormData?.pindaanDokumen.tarikh,
//           //   butiran: templateFormData?.pindaanDokumen.butiran,
//           //   deskripsiPerubahan:
//           //     templateFormData?.pindaanDokumen.deskripsiPerubahan,
//           //   disediakan: templateFormData?.pindaanDokumen.disediakan,
//           //   diluluskan: templateFormData?.pindaanDokumen.diluluskan,
//         });
//         formData.append("pindaanDokumen", pindaanDokumenData);

//         const templateData = JSON.stringify({
//           namaDokumen: "",
//           nomborDokumen: "",
//           cartaFungsi: {
//             flowChartId: `flowchart_${uuidv4()}`,
//             mainFlowChart: {
//               id: "mainflow",
//               title: "Main Flow Chart",
//               nodes: [],
//               edges: [],
//             },
//             subFlowCharts: [],
//           },
//           tujuan: "",
//           objektif: "",
//           skop: "",
//           terminologi: "",
//           singkatan: "",
//           rujukan: "",
//           prosedur: "",
//           rekodDanSimpanan: "",
//           lampiran: "",
//         });

//         formData.append("procedureTemplateData", templateData);
//       }

//       const procedureData = JSON.stringify({
//         procedureNumber: data.procedureNumber,
//         procedureName: data.procedureName,
//         moduleId: data.moduleId,
//         categoryId: data.categoryId,
//         viewPrivilege: data.viewPrivilege,
//         // pindaanDokumen: templateFormData?.pindaanDokumen,
//         // assignedToIds: data.assignedToIds,
//         // approverId: data.approverId,
//         // approveStatus: "PENDING",
//       });

//       formData.append("procedureData", procedureData);

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/procedure/addProcedure`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         }
//       );

//       const response = await res.json();

//       if (res.ok) {
//         triggerGlobalToast(
//           response.message || "Procedure created successfully!",
//           "success"
//         );

//         (
//           document.getElementById("create_procedure_modal") as HTMLDialogElement
//         )?.close();

//         router.push(
//           `/procedure/proceduremanagementform/edit/${response.data.procedureId}/1`
//         );
//       } else {
//         triggerGlobalToast(response.message || response.error, "error");
//       }
//     } catch (err) {
//       if (err instanceof Error) {
//         triggerGlobalToast(err.message, "error");
//       } else {
//         triggerGlobalToast("An error occured. Please try again.", "error");
//       }
//     }
//   };

//   return (
//     <UserProvider>
//       <div>
//         {/* dialog */}
//         <dialog id="create_procedure_modal" className="modal z-50">
//           <div className="modal-box w-2/3 max-w-5xl z-50 h-4/5 max-h-5/6 flex flex-col justify-start">
//             <div className="w-full flex justify-center items-center my-2">
//               <span className="font-bold text-2xl">Create New Procedure</span>
//             </div>
//             <form
//               className="w-full"
//               onSubmit={handleSubmit(handleProcedureSubmit)}
//             >
//               <div className="w-full overflow-auto">
//                 <div className="px-2">
//                   <ProcedureInfoForm
//                     register={register}
//                     errors={errors}
//                     selectedModule={selectedModule}
//                     handleModuleChange={handleModuleChange}
//                     selectedCategory={selectedCategory}
//                     handleCategoryChange={handleCategoryChange}
//                     categoryOptions={categoryOptions}
//                   />

//                   <div className="flex">
//                     <button
//                       type="button"
//                       className={`border-black border-1 flex items-center p-1 ml-0 my-3 mr-5 ${
//                         selectedProcedureMode === "create"
//                           ? "bg-[#86E78B]"
//                           : "bg-[#D9D9D9]"
//                       }`}
//                       onClick={() => {
//                         if (selectedProcedureMode === "create") {
//                           // handleSelectProcedureMode(null);
//                           setSelectedProcedureMode(null);
//                         } else {
//                           // handleSelectProcedureMode("create");
//                           setSelectedProcedureMode("create");
//                         }
//                       }}
//                     >
//                       {selectedProcedureMode === "create" ? (
//                         <CheckIcon className="h-5 w-5 mx-1"></CheckIcon>
//                       ) : (
//                         <PlusIcon className="h-5 w-5 mx-1"></PlusIcon>
//                       )}

//                       <span className="pl-1 pr-2">Create New Procedure</span>
//                     </button>
//                     <button
//                       type="button"
//                       className={`border-black border-1 flex items-center p-1 m-3 ${
//                         selectedProcedureMode === "upload"
//                           ? "bg-[#86E78B]"
//                           : "bg-[#D9D9D9]"
//                       }`}
//                       onClick={() => {
//                         if (selectedProcedureMode === "upload") {
//                           // handleSelectProcedureMode(null);
//                           setSelectedProcedureMode(null);
//                         } else {
//                           // handleSelectProcedureMode("upload");
//                           setSelectedProcedureMode("upload");
//                         }
//                       }}
//                     >
//                       {selectedProcedureMode === "upload" ? (
//                         <CheckIcon className="h-5 w-5 mx-1"></CheckIcon>
//                       ) : (
//                         <UploadIcon className="h-5 w-5 mx-1"></UploadIcon>
//                       )}

//                       <span className="pl-1 pr-2">Upload Procedure</span>
//                     </button>
//                   </div>

//                   {selectedProcedureMode === "create" && (
//                     <>
//                       <fieldset className="flex items-center gap-2">
//                         <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
//                           Version:
//                         </legend>
//                         <input
//                           type="text"
//                           {...register("pindaanDokumen.versi", {
//                             required: "Version is required.",
//                           })}
//                           defaultValue="1"
//                           className="border border-gray-500 bg-white rounded-lg px-3 py-1 text-base w-auto flex-1"
//                           readOnly
//                         />
//                       </fieldset>
//                       {errors.pindaanDokumen?.versi && (
//                         <p className="text-sm pt-1 text-red-500 ml-[calc(160px_+_0.5rem)]">
//                           {errors.pindaanDokumen.versi.message}
//                         </p>
//                       )}

//                       <fieldset className="flex items-center gap-2 py-3">
//                         <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1 whitespace-nowrap">
//                           Assign To:
//                         </legend>

//                         <UserAsyncSelect
//                           isMulti
//                           label="Assign To"
//                           value={selectedUsers}
//                           {...register("pindaanDokumen.assignedTo", {
//                             required: "Must assign at least one user.",
//                           })}
//                           onChange={handleSelectUser}
//                           isFullWidth
//                         />

//                         {errors.pindaanDokumen?.assignedTo && (
//                           <p className="text-sm ml-2 text-red-500">
//                             {errors.pindaanDokumen?.assignedTo.message}
//                           </p>
//                         )}
//                       </fieldset>
//                     </>
//                   )}

//                   {selectedProcedureMode === "upload" && (
//                     <div>
//                       <fieldset className="flex items-center gap-2 py-3">
//                         <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
//                           Upload Procedure:
//                         </legend>

//                         <input
//                           type="file"
//                           accept=".pdf, .doc, .docx"
//                           className="file-input mx-2 file:bg-[#e5e5e5]"
//                           onChange={(e) => {
//                             const file = e.target.files?.[0];
//                             setValue("procedureFile", file); // <- set a File directly
//                           }}
//                         />

//                         {errors.procedureFile && (
//                           <span className="text-red-500 text-sm">
//                             {errors.procedureFile.message}
//                           </span>
//                         )}
//                       </fieldset>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="modal-action w-full flex justify-center items-center gap-5">
//                 <button
//                   type="submit"
//                   className="btn bg-[#C67A83] text-white border-0 hover:bg-[#b96670]"
//                 >
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   className="btn"
//                   onClick={() => {
//                     (
//                       document.getElementById(
//                         "create_procedure_modal"
//                       ) as HTMLDialogElement
//                     )?.close();
//                   }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </dialog>
//       </div>
//     </UserProvider>
//   );
// };

// export default CreateProcedureModal;

"use client";

import React, { useState } from "react";
import ProcedureInfoForm from "../../proceduremanagementform/procedureinfoform";
import { useForm } from "react-hook-form";
import { ProcedureFormData } from "@/app/interface/Procedure";
import { useProcedureFormFields } from "../../proceduremanagement";
import { CheckIcon, PlusIcon, UploadIcon } from "lucide-react";
import { SelectOption } from "@/app/interface/SelectOption";
import UserAsyncSelect from "@/app/components/(dropdownselect)/userselect";
import { UserProvider } from "@/app/components/(context)/usercontext";
import { triggerGlobalToast } from "@/app/components/(common)/toast/showtoast";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const CreateProcedureModal = () => {
  const router = useRouter();
  const [selectedProcedureMode, setSelectedProcedureMode] = useState<
    "create" | "upload" | null
  >(null);
  //   const [selectedUsers, setSelectedUsers] = useState<SelectOption[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProcedureFormData>();

  const {
    selectedModule,
    selectedCategory,
    categoryOptions,
    selectedUsers,
    handleModuleChange,
    handleCategoryChange,
    handleSelectUser,
    setSelectedModule,
    setSelectedCategory,
    setCategoryOptions,
    setSelectedUsers,
  } = useProcedureFormFields(setValue);

  //   const handleSelectUser = (newValue: unknown) => {
  //     const selectedOptions = newValue as SelectOption[];
  //     setSelectedUsers(selectedOptions || []);

  //     if (selectedOptions.length > 0) {
  //       const userIds = selectedOptions.map((user) => user.value);
  //       setValue("pindaanDokumen.assignedTo", userIds);
  //       // setFormData({
  //       //   ...formData,
  //       //   pindaanDokumen: {
  //       //     ...formData.pindaanDokumen,
  //       //     assignedTo: userIds,
  //       //   },
  //       // });
  //     }
  //   };

  const handleProcedureSubmit = async (data: ProcedureFormData) => {
    const token = localStorage.getItem("jwt") || "";
    if (!token) {
      triggerGlobalToast("Please login to create new procedure.");
      return;
    }

    if (data.procedureFile && data.pindaanDokumen) {
      triggerGlobalToast(
        "Only allow either create new procedure or upload file.",
        "error"
      );
      return;
    }

    try {
      const formData = new FormData();
      if (data.procedureFile) {
        formData.append("file", data.procedureFile);
      } else {
        const pindaanDokumenData = JSON.stringify({
          // pindaanDokumen: templateFormData?.pindaanDokumen,
          versi: data.pindaanDokumen.versi,
          assignedTo: data.pindaanDokumen.assignedTo,
          //   tarikh: templateFormData?.pindaanDokumen.tarikh,
          //   butiran: templateFormData?.pindaanDokumen.butiran,
          //   deskripsiPerubahan:
          //     templateFormData?.pindaanDokumen.deskripsiPerubahan,
          //   disediakan: templateFormData?.pindaanDokumen.disediakan,
          //   diluluskan: templateFormData?.pindaanDokumen.diluluskan,
        });
        formData.append("pindaanDokumen", pindaanDokumenData);

        const templateData = JSON.stringify({
          namaDokumen: "",
          nomborDokumen: "",
          cartaFungsi: {
            flowChartId: `flowchart_${uuidv4()}`,
            mainFlowChart: {
              id: "mainflow",
              title: "Main Flow Chart",
              nodes: [],
              edges: [],
            },
            subFlowCharts: [],
          },
          tujuan: "",
          objektif: "",
          skop: "",
          terminologi: "",
          singkatan: "",
          rujukan: "",
          prosedur: "",
          rekodDanSimpanan: "",
          lampiran: "",
        });

        formData.append("procedureTemplateData", templateData);
      }

      const procedureData = JSON.stringify({
        procedureNumber: data.procedureNumber,
        procedureName: data.procedureName,
        moduleId: data.moduleId,
        categoryId: data.categoryId,
        viewPrivilege: data.viewPrivilege,
        // pindaanDokumen: templateFormData?.pindaanDokumen,
        // assignedToIds: data.assignedToIds,
        // approverId: data.approverId,
        // approveStatus: "PENDING",
      });

      formData.append("procedureData", procedureData);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/procedure/addProcedure`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const response = await res.json();

      if (res.ok) {
        triggerGlobalToast(
          response.message || "Procedure created successfully!",
          "success"
        );

        (
          document.getElementById("create_procedure_modal") as HTMLDialogElement
        )?.close();

        router.push(
          `/procedure/proceduremanagementform/edit/${response.data.procedureId}/1`
        );
      } else {
        triggerGlobalToast(response.message || response.error, "error");
      }
    } catch (err) {
      if (err instanceof Error) {
        triggerGlobalToast(err.message, "error");
      } else {
        triggerGlobalToast("An error occured. Please try again.", "error");
      }
    }
  };

  return (
    <UserProvider>
      <div>
        {/* dialog */}
        <dialog id="create_procedure_modal" className="modal z-50">
          <div className="modal-box w-2/3 max-w-5xl z-50 h-4/5 max-h-5/6 flex flex-col justify-start">
            <div className="w-full flex justify-center items-center my-2">
              <span className="font-bold text-2xl">Create New Procedure</span>
            </div>
            <form
              className="w-full"
              onSubmit={handleSubmit(handleProcedureSubmit)}
            >
              <div className="w-full overflow-auto">
                <div className="px-2">
                  <ProcedureInfoForm
                    register={register}
                    errors={errors}
                    selectedModule={selectedModule}
                    handleModuleChange={handleModuleChange}
                    selectedCategory={selectedCategory}
                    handleCategoryChange={handleCategoryChange}
                    categoryOptions={categoryOptions}
                  />

                  <div className="flex">
                    <button
                      type="button"
                      className={`border-black border-1 flex items-center p-1 ml-0 my-3 mr-5 ${
                        selectedProcedureMode === "create"
                          ? "bg-[#86E78B]"
                          : "bg-[#D9D9D9]"
                      }`}
                      onClick={() => {
                        if (selectedProcedureMode === "create") {
                          // handleSelectProcedureMode(null);
                          setSelectedProcedureMode(null);
                        } else {
                          // handleSelectProcedureMode("create");
                          setSelectedProcedureMode("create");
                        }
                      }}
                    >
                      {selectedProcedureMode === "create" ? (
                        <CheckIcon className="h-5 w-5 mx-1"></CheckIcon>
                      ) : (
                        <PlusIcon className="h-5 w-5 mx-1"></PlusIcon>
                      )}

                      <span className="pl-1 pr-2">Create New Procedure</span>
                    </button>
                    <button
                      type="button"
                      className={`border-black border-1 flex items-center p-1 m-3 ${
                        selectedProcedureMode === "upload"
                          ? "bg-[#86E78B]"
                          : "bg-[#D9D9D9]"
                      }`}
                      onClick={() => {
                        if (selectedProcedureMode === "upload") {
                          // handleSelectProcedureMode(null);
                          setSelectedProcedureMode(null);
                        } else {
                          // handleSelectProcedureMode("upload");
                          setSelectedProcedureMode("upload");
                        }
                      }}
                    >
                      {selectedProcedureMode === "upload" ? (
                        <CheckIcon className="h-5 w-5 mx-1"></CheckIcon>
                      ) : (
                        <UploadIcon className="h-5 w-5 mx-1"></UploadIcon>
                      )}

                      <span className="pl-1 pr-2">Upload Procedure</span>
                    </button>
                  </div>

                  {selectedProcedureMode === "create" && (
                    <>
                      <fieldset className="flex items-center gap-2">
                        <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
                          Version:
                        </legend>
                        <input
                          type="text"
                          {...register("pindaanDokumen.versi", {
                            required: "Version is required.",
                          })}
                          defaultValue="1"
                          className="border border-gray-500 bg-white rounded-lg px-3 py-1 text-base w-auto flex-1"
                          readOnly
                        />
                      </fieldset>
                      {errors.pindaanDokumen?.versi && (
                        <p className="text-sm pt-1 text-red-500 ml-[calc(160px_+_0.5rem)]">
                          {errors.pindaanDokumen.versi.message}
                        </p>
                      )}

                      <fieldset className="flex items-center gap-2 py-3">
                        <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1 whitespace-nowrap">
                          Assign To:
                        </legend>

                        <UserAsyncSelect
                          isMulti
                          label="Assign To"
                          value={selectedUsers}
                          {...register("pindaanDokumen.assignedTo", {
                            required: "Must assign at least one user.",
                          })}
                          onChange={handleSelectUser}
                          isFullWidth
                        />

                        {errors.pindaanDokumen?.assignedTo && (
                          <p className="text-sm ml-2 text-red-500">
                            {errors.pindaanDokumen?.assignedTo.message}
                          </p>
                        )}
                      </fieldset>
                    </>
                  )}

                  {selectedProcedureMode === "upload" && (
                    <div>
                      <fieldset className="flex items-center gap-2 py-3">
                        <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
                          Upload Procedure:
                        </legend>

                        <input
                          type="file"
                          accept=".pdf, .doc, .docx"
                          className="file-input mx-2 file:bg-[#e5e5e5]"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            setValue("procedureFile", file); // <- set a File directly
                          }}
                        />

                        {errors.procedureFile && (
                          <span className="text-red-500 text-sm">
                            {errors.procedureFile.message}
                          </span>
                        )}
                      </fieldset>
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-action w-full flex justify-center items-center gap-5">
                <button
                  type="submit"
                  className="btn bg-[#C67A83] text-white border-0 hover:bg-[#b96670]"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    (
                      document.getElementById(
                        "create_procedure_modal"
                      ) as HTMLDialogElement
                    )?.close();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </UserProvider>
  );
};

export default CreateProcedureModal;

