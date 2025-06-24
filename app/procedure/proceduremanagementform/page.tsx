"use client";

import React from "react";
import { useState, useEffect } from "react";
import { SelectOption } from "@/app/interface/SelectOption";
import { File, X, CornerDownLeft } from "lucide-react";
import { ProcedureTemplateFormData } from "@/app/interface/ProcedureTemplateFormData";
import { useForm } from "react-hook-form";
import { ProcedureFormData } from "@/app/interface/Procedure";
import { toast } from "react-toastify";
import {
  bytesToMB,
  handleDeleteProcedure,
  useProcedureFormFields,
} from "../proceduremanagement";
import UserAsyncSelect from "@/app/components/(dropdownselect)/userselect";
import { useUserContext } from "@/app/components/(context)/usercontext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { triggerGlobalToast } from "@/app/components/(common)/toast/showtoast";
import TemplateForm from "./(templateform)/TemplateForm";
import ProcedureInfoForm from "./procedureinfoform";

interface ProcedureFormProps {
  procedureID: string;
  version: string;
}

const ProcedureForm = ({ procedureID, version }: ProcedureFormProps) => {
  const [role, setRole] = useState("STUDENT");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedApprover, setSelectedApprover] = useState<SelectOption | null>(
    null
  );
  const [approveStatus, setApproveStatus] = useState<string>("PENDING");
  const [templateFormData, setTemplateFormData] =
    useState<ProcedureTemplateFormData | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
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

  const fileName = watch("fileName");
  const fileType = watch("fileType");
  const fileDownloadUrl = watch("fileDownloadUrl");
  const fileSize = watch("fileSize");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("userRole") || "STUDENT");
      setToken(localStorage.getItem("jwt") || "");
      setUserId(localStorage.getItem("userId") || "");
    }
  }, []);

  useEffect(() => {
    if (procedureID && version) {
      getProcedureById(procedureID, version);
    }
  }, [procedureID]);

  const getProcedureById = async (id: string, version: string) => {
    const jwtToken = localStorage.getItem("jwt") || "";
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/procedure/getProcedure/${id}/${version}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const result = await res.json();
      const procedureData = result.data;

      if (!res.ok) {
        throw new Error(
          result.message || result.error || "Failed to fetch procedure"
        );
      }

      console.log("ProcedureData: ", procedureData);

      if (!procedureData) {
        throw new Error("No procedure data found");
      }

      setValue("procedureNumber", procedureData.procedureNumber);
      setValue("procedureName", procedureData.procedureName);

      if (procedureData.module) {
        const moduleOption = {
          value: procedureData.module.moduleId,
          label: procedureData.module.moduleName,
        };
        setSelectedModule(moduleOption);
        setValue("moduleId", moduleOption.value);

        const categoriesResult = procedureData.module.categories;
        const categoryOptions = categoriesResult.map((cat: any) => ({
          value: cat.categoryId,
          label: cat.categoryName,
        }));
        setCategoryOptions(categoryOptions);
      }

      if (procedureData.category) {
        const categoryOption = {
          value: procedureData.category.categoryId,
          label: procedureData.category.categoryName,
        };
        setSelectedCategory(categoryOption);
        setValue("categoryId", categoryOption.value);
      }

      if (procedureData.viewPrivilege) {
        setValue(`viewPrivilege`, procedureData.viewPrivilege);
      }

      if (
        procedureData.pindaanDokumen &&
        procedureData.pindaanDokumen.assignTo &&
        procedureData.pindaanDokumen.assignTo.length > 0
      ) {
        const userOptions = procedureData.pindaanDokumen.assignTo.map(
          (user: any) => ({
            value: user.userId,
            label: user.name,
          })
        );
        setSelectedUsers(userOptions);
        setValue(
          "pindaanDokumen.assignedTo",
          userOptions.map((u: any) => u.value)
        );
        // setValue(
        //   "pindaanDokumen.assignedTo",
        //   userOptions.map((u: any) => u.value)
        // );
      }

      if (
        procedureData.pindaanDokumen &&
        procedureData.pindaanDokumen.procedureTemplateData
      ) {
        setValue("pindaanDokumen", procedureData.pindaanDokumen);

        setTemplateFormData({
          namaDokumen:
            procedureData.pindaanDokumen.procedureTemplateData.namaDokumen,
          nomborDokumen:
            procedureData.pindaanDokumen.procedureTemplateData.nomborDokumen,
          pindaanDokumen: procedureData.pindaanDokumen,
          // pindaanDokumen.versi: procedureData.pindaanDokumen.versi,
          cartaFungsi:
            procedureData.pindaanDokumen.procedureTemplateData.cartaFungsi,
          tujuan: procedureData.pindaanDokumen.procedureTemplateData.tujuan,
          objektif: procedureData.pindaanDokumen.procedureTemplateData.objektif,
          skop: procedureData.pindaanDokumen.procedureTemplateData.skop,
          terminologi:
            procedureData.pindaanDokumen.procedureTemplateData.terminologi,
          singkatan:
            procedureData.pindaanDokumen.procedureTemplateData.singkatan,
          rujukan: procedureData.pindaanDokumen.procedureTemplateData.rujukan,
          prosedur: procedureData.pindaanDokumen.procedureTemplateData.prosedur,
          rekodDanSimpanan:
            procedureData.pindaanDokumen.procedureTemplateData.rekodDanSimpanan,
          lampiran: procedureData.pindaanDokumen.procedureTemplateData.lampiran,
        });

        if (procedureData.pindaanDokumen.approveStatus) {
          setApproveStatus(procedureData.pindaanDokumen.approveStatus);
        }
      }
      if (
        procedureData.fileName &&
        procedureData.fileType &&
        procedureData.fileDownloadUrl
      ) {
        setValue("fileName", procedureData.fileName);
        setValue("fileType", procedureData.fileType);
        setValue("fileDownloadUrl", procedureData.fileDownloadUrl);
        setValue("fileSize", procedureData.fileSize);
      }
    } catch (error) {
      if (error instanceof Error) {
        triggerGlobalToast(error.message, "error");
      } else {
        triggerGlobalToast("An unknown error occurred", "error");
      }
    }
  };

  // const handleSelectApprover = (newValue: unknown) => {
  //   const selectedOption = newValue as SelectOption | null;
  //   setSelectedApprover(selectedOption);

  //   if (selectedOption) {
  //     setValue("approverId", selectedOption.value);
  //   }
  // };

  const handleProcedureSubmit = async (data: ProcedureFormData) => {
    const completeData = {
      ...data,
      procedureTemplateData: templateFormData,
    };
    console.log("Form Data: ", completeData);

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
      } else if (templateFormData) {
        const procedureTemplateData = JSON.stringify({
          namaDokumen: templateFormData.namaDokumen,
          nomborDokumen: templateFormData.nomborDokumen,
          cartaFungsi: templateFormData.cartaFungsi,
          tujuan: templateFormData.tujuan,
          objektif: templateFormData.objektif,
          skop: templateFormData.skop,
          terminologi: templateFormData.terminologi,
          singkatan: templateFormData.singkatan,
          rujukan: templateFormData.rujukan,
          prosedur: templateFormData.prosedur,
          rekodDanSimpanan: templateFormData.rekodDanSimpanan,
          lampiran: templateFormData.lampiran,
        });
        formData.append("procedureTemplateData", procedureTemplateData);

        console.log("TemplateFormData: ", templateFormData);

        if (templateFormData.pindaanDokumen) {
          const pindaanDokumenData = JSON.stringify({
            versi: templateFormData?.pindaanDokumen.versi,
            tarikh: templateFormData?.pindaanDokumen.tarikh,
            butiran: templateFormData?.pindaanDokumen.butiran,
            deskripsiPerubahan:
              templateFormData?.pindaanDokumen.deskripsiPerubahan,

            disediakan: (templateFormData?.pindaanDokumen.disediakan || []).map(
              (u: any) => (typeof u === "string" ? u : u.userId)
            ),
            diluluskan:
              typeof templateFormData?.pindaanDokumen.diluluskan === "string"
                ? templateFormData?.pindaanDokumen.diluluskan
                : (
                    templateFormData?.pindaanDokumen.diluluskan as {
                      userId?: string;
                    }
                  )?.userId! ?? "",

            assignedTo: data.pindaanDokumen.assignedTo,
            // assignedTo: (templateFormData?.pindaanDokumen.assignedTo || []).map(
            //   (u: any) => (typeof u === "string" ? u : u.userId)
            // ),
          });

          formData.append("pindaanDokumen", pindaanDokumenData);
        }
      }

      const procedureData = JSON.stringify({
        procedureNumber: data.procedureNumber,
        procedureName: data.procedureName,
        moduleId: data.moduleId,
        categoryId: data.categoryId,
        viewPrivilege: data.viewPrivilege,
      });

      formData.append("procedureData", procedureData);

      if (!procedureID) {
        triggerGlobalToast(
          "No procedureID. Please refresh and try again.",
          "error"
        );
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/procedure/editProcedure/${procedureID}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const response = await res.json();
      console.log("Response: ", response);

      if (res.ok) {
        triggerGlobalToast(
          response.message || "Procedure edited successfully!",
          "success"
        );
        getProcedureById(procedureID, version);
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

  const handleDeleteProcedureVersion = async (
    procedureId: string,
    version: string
  ) => {
    if (!procedureId || !version) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this procedure version?"
    );

    if (!confirmDelete) {
      return; // If user cancels, do nothing
    }

    try {
      const token = localStorage.getItem("jwt") || "";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/procedure/deleteProcedure/${procedureId}/${version}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await res.json();

      if (res.ok) {
        triggerGlobalToast(response.message, "success");
        router.push(`/procedure/view/${procedureId}`);
      } else {
        triggerGlobalToast(response.message, "error");
      }
    } catch (error) {
      triggerGlobalToast(
        "Failed to delete procedure. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mx-20 my-10">
      <div className="w-full flex items-center">
        <button type="button" className="btn btn-ghost mb-5">
          <Link
            href={procedureID ? `/procedure/view/${procedureID}` : `/procedure`}
          >
            <CornerDownLeft className="h-6 w-6" />
          </Link>
        </button>
        <div className="text-4xl font-extrabold mb-7 grow text-center">
          Procedure Form
        </div>
      </div>
      {/* <div className="text-4xl font-extrabold mb-7">Procedure Form</div> */}
      <div className="w-full px-10 py-6 bg-[#F5F5F5] h-auto rounded-2xl">
        <div>
          <form
            onSubmit={handleSubmit(handleProcedureSubmit)}
            encType="multipart/form-data"
          >
            <ProcedureInfoForm
              register={register}
              errors={errors}
              selectedModule={selectedModule}
              handleModuleChange={handleModuleChange}
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
              categoryOptions={categoryOptions}
            />
            {/* {watch("pindaanDokumen.assignedTo") && <div>Assignnnnnnn!!</div>}
            {watch("pindaanDokumen.assignTo") && <div>Assignnnnnnn!23</div>} */}
            {watch("pindaanDokumen") && (
              <>
                <fieldset className="flex items-center gap-2 py-3">
                  <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
                    Assign To:
                  </legend>

                  <UserAsyncSelect
                    isMulti
                    label="Assign To:"
                    value={selectedUsers}
                    {...register("pindaanDokumen.assignedTo")}
                    onChange={handleSelectUser}
                    error={errors.pindaanDokumen?.assignedTo?.message}
                  />

                  {errors.pindaanDokumen?.assignedTo && (
                    <p className="text-sm ml-2 text-red-500">
                      {errors.pindaanDokumen?.assignedTo.message}
                    </p>
                  )}
                </fieldset>

                <div className="w-full flex items-center gap-2 pt-2 pb-4">
                  <span className="font-semibold">Approve Status: </span>
                  <div
                    className={`flex justify-center w-[100px] border-1 p-2 ${
                      approveStatus === "REJECT"
                        ? "bg-red-500"
                        : approveStatus === "APPROVE"
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    {approveStatus}
                  </div>
                </div>

                {approveStatus !== "APPROVE" && (
                  <div className="w-full flex items-center gap-2 pt-2 pb-4">
                    <span className="font-semibold">Reject Description: </span>
                    <div
                    // className={`flex justify-center w-[100px] border-1 p-2 ${
                    //   approveStatus === "REJECT"
                    //     ? "bg-red-500"
                    //     : approveStatus === "APPROVE"
                    //     ? "bg-green-500"
                    //     : "bg-yellow-400"
                    // }`}
                    >
                      {watch("pindaanDokumen.description") || "No description provided."}
                    </div>
                  </div>
                )}
              </>
            )}

            <div>
              {/* upload file */}
              {!watch("pindaanDokumen") && (
                <div>
                  <fieldset className="flex items-center gap-2 py-3">
                    <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
                      Upload Procedure:
                    </legend>

                    {!fileDownloadUrl && (
                      <input
                        type="file"
                        accept=".pdf, .doc, .docx"
                        className="file-input mx-2 file:bg-[#e5e5e5]"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          setValue("procedureFile", file); // <- set a File directly
                        }}
                      />
                    )}

                    {errors.procedureFile && (
                      <span className="text-red-500 text-sm">
                        {errors.procedureFile.message}
                      </span>
                    )}
                  </fieldset>
                </div>
              )}

              {fileDownloadUrl && (
                <>
                  <div className="font-semibold w-full py-2">
                    Uploaded Procedure:{" "}
                  </div>
                  <div className="bg-white hover:bg-[#dedede] p-3 rounded-xl flex items-center justify-between w-fit">
                    {/* File icon */}
                    <div className="flex items-center">
                      <File className="w-6 h-6 mx-2" />

                      {/* File name and size */}
                      <div className="flex flex-col justify-start pl-3 pr-5">
                        <span className="font-semibold text-[15px]">
                          <a
                            href={`${process.env.NEXT_PUBLIC_API_URL}${fileDownloadUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {fileName}
                          </a>
                        </span>
                        <span className="font-normal text-[13px]">
                          {fileSize !== undefined ? bytesToMB(fileSize) : ""}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-ghost p-2 m-0"
                      onClick={() => {
                        setValue("procedureFile", undefined); // Clear the file input
                        setValue("fileName", ""); // Clear the file name
                        setValue("fileType", ""); // Clear the file type
                        setValue("fileDownloadUrl", ""); // Clear the file download URL
                        setValue("fileSize", 0); // Clear the file size
                      }}
                    >
                      <X className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                </>
              )}

              {watch("pindaanDokumen") && !fileDownloadUrl && (
                //watch("procedureData.pindaanDokumen") &&
                <TemplateForm
                  formData={templateFormData}
                  setFormData={setTemplateFormData}
                />
              )}
            </div>
            <div className="flex justify-center gap-10 mt-5">
              <button
                type="submit"
                className="btn bg-[#C67A83] text-white border-0 hover:bg-[#b96670]"
              >
                Save
              </button>
              {procedureID && (
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteProcedureVersion(procedureID, version);
                  }}
                  className="btn bg-red-600 hover:bg-red-700 text-white border-0"
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProcedureForm;
