"use client";

import React from "react";
import { useState, useEffect } from "react";
import { SelectOption } from "@/app/interface/SelectOption";
import dynamic from "next/dynamic";
import { User } from "@/app/interface/User";
import { PlusIcon, UploadIcon, CheckIcon, File, X } from "lucide-react";
import ModuleSelect from "@/app/components/(dropdownselect)/moduleselect";
import CategorySelect from "@/app/components/(dropdownselect)/categoryselect";
import StepForm from "./(templateform)/TemplateForm";
import { ProcedureTemplateFormData } from "@/app/interface/ProcedureTemplateFormData";
import { set, useForm } from "react-hook-form";
import { ProcedureFormData } from "@/app/interface/Procedure";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// Lazy load Select and AsyncSelect only on client
const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

interface ProcedureFormProps {
  procedureID?: string;
}

const ProcedureForm = ({ procedureID }: ProcedureFormProps) => {
  const [role, setRole] = useState("STUDENT");
  const [token, setToken] = useState("");
  const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
  const [selectedModule, setSelectedModule] = useState<SelectOption | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<SelectOption | null>(
    null
  );
  const [selectedUsers, setSelectedUsers] = useState<SelectOption[]>([]);
  const [selectedApprover, setSelectedApprover] = useState<SelectOption | null>(
    null
  );

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedProcedureMode, setSelectedProcedureMode] = useState<
    "create" | "upload" | null
  >(null);

  const [stepFormData, setStepFormData] =
    useState<ProcedureTemplateFormData | null>(null);

  const handleSelectProcedureMode = (mode: "create" | "upload") => {
    console.log("Clicked: " + mode);
    setSelectedProcedureMode(mode);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProcedureFormData>();

  const fileName = watch("fileName");
  const fileType = watch("fileType");
  const fileDownloadUrl = watch("fileDownloadUrl");
  const fileSize = watch("fileSize");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("userRole") || "STUDENT");
      setToken(localStorage.getItem("jwt") || "");
    }
  }, []);

  useEffect(() => {
    if (procedureID) {
      getProcedureById(procedureID);
      // const fileName = watch("fileName");
      //   const fileType = watch("fileType");
      //   const fileDownloadUrl = watch("fileDownloadUrl");
    }
  }, [procedureID]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/getAllUsers`
        );
        const result = await res.json();
        const data: User[] = result.data ?? [];

        if (Array.isArray(data)) {
          setAllUsers(data);
        } else {
          setAllUsers([]);
          console.error("Invalid user data:", data);
        }
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    };

    fetchAllUsers();

    const interval = setInterval(fetchAllUsers, 5 * 60 * 1000); // refresh every 5 mins

    return () => clearInterval(interval);
  }, []);

  const getProcedureById = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/procedure/getProcedure/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch procedure");
      }

      const result = await res.json();
      const procedureData = result.data;

      if (!procedureData) {
        throw new Error("No procedure data found");
      }

      console.log(procedureData.procedureTemplateData.cartaFungsi);

      // Set basic fields
      setValue("procedureNumber", procedureData.procedureNumber);
      setValue("procedureName", procedureData.procedureName);

      // Set module
      if (procedureData.module) {
        const moduleOption = {
          value: procedureData.module.moduleId,
          label: procedureData.module.moduleName,
        };
        setSelectedModule(moduleOption);
        setValue("moduleId", moduleOption.value);

        // Fetch categories for this module to populate category options
        const categoriesResult = procedureData.module.categories;
        const categoryOptions = categoriesResult.map((cat: any) => ({
          value: cat.categoryId,
          label: cat.categoryName,
        }));
        setCategoryOptions(categoryOptions);
      }

      // Set category
      if (procedureData.category) {
        const categoryOption = {
          value: procedureData.category.categoryId,
          label: procedureData.category.categoryName,
        };
        setSelectedCategory(categoryOption);
        setValue("categoryId", categoryOption.value);
      }

      // Set view privilege
      if (procedureData.viewPrivilege) {
        setValue(`viewPrivilege`, procedureData.viewPrivilege);
      }

      // Set assigned users
      if (procedureData.assignTo && procedureData.assignTo.length > 0) {
        const userOptions = procedureData.assignTo.map((user: any) => ({
          value: user.userId,
          label: user.username,
        }));
        setSelectedUsers(userOptions);
        setValue(
          "assignedToIds",
          userOptions.map((u: any) => u.value)
        );
      }

      // Set approver
      if (procedureData.approver) {
        const approverOption = {
          value: procedureData.approver.userId,
          label: procedureData.approver.username,
        };
        setSelectedApprover(approverOption);
        setValue("approverId", approverOption.value);
      }

      // Set approve status
      setValue("approveStatus", procedureData.approveStatus);

      // Handle procedure template data
      if (procedureData.procedureTemplateData) {
        setStepFormData({
          namaDokumen: procedureData.procedureTemplateData.namaDokumen,
          nomborDokumen: procedureData.procedureTemplateData.nomborDokumen,
          pindaanDokumen: procedureData.procedureTemplateData.pindaanDokumen,
          cartaFungsi: procedureData.procedureTemplateData.cartaFungsi,
          tujuan: procedureData.procedureTemplateData.tujuan,
          objektif: procedureData.procedureTemplateData.objektif,
          skop: procedureData.procedureTemplateData.skop,
          terminologi: procedureData.procedureTemplateData.terminologi,
          singkatan: procedureData.procedureTemplateData.singkatan,
          rujukan: procedureData.procedureTemplateData.rujukan,
          prosedur: procedureData.procedureTemplateData.prosedur,
          rekodDanSimpanan:
            procedureData.procedureTemplateData.rekodDanSimpanan,
          lampiran: procedureData.procedureTemplateData.lampiran,
        });
        setSelectedProcedureMode("create");
      } else if (
        procedureData.fileName &&
        procedureData.fileType &&
        procedureData.fileDownloadUrl
      ) {
        setSelectedProcedureMode("upload");
        setValue("fileName", procedureData.fileName);
        setValue("fileType", procedureData.fileType);
        setValue("fileDownloadUrl", procedureData.fileDownloadUrl);
        setValue("fileSize", procedureData.fileSize);
        // You might want to set the file name here if needed
      }
    } catch (error) {
      console.error("Failed to load procedure:", error);
      toast.error("Failed to load procedure data");
    }
  };

  const handleSelectUser = (newValue: unknown) => {
    const selectedOptions = newValue as SelectOption[];
    setSelectedUsers(selectedOptions || []);

    if (selectedOptions.length > 0) {
      const userIds = selectedOptions.map((user) => user.value);
      setValue("assignedToIds", userIds);
    }
  };

  const handleSelectApprover = (newValue: unknown) => {
    const selectedOption = newValue as SelectOption | null;
    setSelectedApprover(selectedOption);

    if (selectedOption) {
      setValue("approverId", selectedOption.value);
    }
  };

  const handleModuleChange = (
    module: SelectOption | null,
    categories: SelectOption[]
  ) => {
    setSelectedModule(module);
    setCategoryOptions(categories);
    setSelectedCategory(null); // Reset selected category when module changes

    if (module) {
      setValue("moduleId", module.value);
    }
  };

  const handleCategoryChange = (category: SelectOption | null) => {
    setSelectedCategory(category);

    if (category) {
      setValue("categoryId", category.value);
    }
  };

  const loadUserOptions = async (inputValue: string) => {
    const filtered = allUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(inputValue.toLowerCase()) &&
        user.role !== "ADMIN" &&
        user.role !== "SPK_MANAGER"
    );

    return filtered.map((user) => ({
      value: user.userId!,
      label: user.username,
    }));
  };

  const handleProcedureSubmit = async (data: ProcedureFormData) => {
    const completeData = {
      ...data,
      procedureTemplateData:
        selectedProcedureMode === "create" ? stepFormData : null,
    };
    console.log(completeData);

    try {
      const formData = new FormData();
      if (data.procedureFile) {
        formData.append("file", data.procedureFile);
        console.log("File Uploaded");
        console.log(data.procedureFile);
        console.log("formdatafile");

        console.log(formData.get("file"));
      }

      if (stepFormData) {
        const procedureTemplateData = JSON.stringify({
          namaDokumen: stepFormData.namaDokumen,
          nomborDokumen: stepFormData.nomborDokumen,
          pindaanDokumen: stepFormData.pindaanDokumen,
          cartaFungsi: stepFormData.cartaFungsi,
          tujuan: stepFormData.tujuan,
          objektif: stepFormData.objektif,
          skop: stepFormData.skop,
          terminologi: stepFormData.terminologi,
          singkatan: stepFormData.singkatan,
          rujukan: stepFormData.rujukan,
          prosedur: stepFormData.prosedur,
          rekodDanSimpanan: stepFormData.rekodDanSimpanan,
          lampiran: stepFormData.lampiran,
        });
        formData.append("procedureTemplateData", procedureTemplateData);
      }

      const procedureData = JSON.stringify({
        procedureNumber: data.procedureNumber,
        procedureName: data.procedureName,
        moduleId: data.moduleId,
        categoryId: data.categoryId,
        viewPrivilege: data.viewPrivilege,
        assignedToIds: data.assignedToIds,
        // procedureTemplateData: data.procedureTemplateData,
        approverId: data.approverId,
        approveStatus: "PENDING",
      });

      formData.append("procedureData", procedureData);

      let res = null;

      if (procedureID) {
        res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/procedure/editProcedure/${procedureID}`,
          {
            method: "PUT",
            headers: {
              // "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
      } else {
        res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/procedure/addProcedure`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
      }

      const response = await res.json();

      if (res.ok) {
        reset();

        toast.success(response.message);

        window.location.href = `/procedure/proceduremanagementform/edit/${response.data.procedureId}`;
        // router.push(
        //   `/procedure/proceduremanagementform/edit/${response.data.procedureId}`
        // );

        console.log(response);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error("An error occured. Please try again.");
    }
  };

  const handleDeleteProcedure = async (procedureId: string) => {
    if (!procedureId) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this procedure?"
    );

    if (!confirmDelete) {
      return; // If user cancels, do nothing
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/procedure/deleteProcedure/${procedureID}`,
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
        toast.success(response.message);
        window.location.href =
          "${process.env.NEXT_PUBLIC_API_URL}/procedure/proceduremanagementform";
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to delete procedure. Please try again.");
    }
  };

  function bytesToMB(bytes: number): string {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }

  return (
    <div className="flex flex-col items-center justify-center mx-20 my-10">
      <div className="text-4xl font-extrabold mb-7">Procedure Form</div>
      <div className="w-full px-10 py-6 bg-[#F5F5F5] h-auto rounded-2xl">
        <div>
          <form
            onSubmit={handleSubmit(handleProcedureSubmit)}
            encType="multipart/form-data"
          >
            <div className="py-3">
              <fieldset className="flex items-center gap-2">
                <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
                  Procedure Number:
                </legend>
                <input
                  type="text"
                  // value={stepFormData?.nomborDokumen || ""}
                  {...register("procedureNumber", {
                    required: "Procedure Number is required.",
                  })}
                  className="border border-gray-500 bg-white rounded-lg px-3 py-1 text-base w-auto flex-1"
                />
              </fieldset>
              {errors.procedureNumber && (
                <p className="text-sm pt-1 text-red-500 ml-[calc(160px_+_0.5rem)]">
                  {errors.procedureNumber.message}
                </p>
              )}
            </div>

            <div className="py-3">
              <fieldset className="flex items-center gap-2">
                <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
                  Procedure Name:
                </legend>
                <input
                  // value={stepFormData?.namaDokumen || ""}
                  type="text"
                  {...register("procedureName", {
                    required: "Procedure Name is required.",
                  })}
                  className="border border-gray-500 bg-white rounded-lg px-3 py-1 text-base w-auto flex-1"
                />
              </fieldset>
              {errors.procedureName && (
                <p className="text-sm pt-1 text-red-500 ml-[calc(142px_+_0.5rem)]">
                  {errors.procedureName.message}
                </p>
              )}
            </div>

            <fieldset className="flex items-center gap-2 py-3">
              <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
                Module:
              </legend>
              <ModuleSelect
                {...register("moduleId", {
                  required: "Module is required.",
                })}
                value={selectedModule}
                onChange={handleModuleChange}
              />
              {errors.moduleId && (
                <p className="text-sm text-red-500 mt-1 ml-2">
                  {errors.moduleId.message}
                </p>
              )}
            </fieldset>
            <fieldset className="flex items-center gap-2 py-3">
              <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
                Category:
              </legend>
              <CategorySelect
                {...register("categoryId", {
                  required: "Category is required.",
                })}
                options={categoryOptions}
                value={selectedCategory}
                onChange={handleCategoryChange}
                disabled={!selectedModule}
              />{" "}
              {errors.categoryId && (
                <p className="text-sm text-red-500 mt-1 ml-2">
                  {errors.categoryId.message}
                </p>
              )}
            </fieldset>

            <fieldset className="fieldset w-full py-3 relative px-1">
              <legend className="fieldset-legend text-base font-semibold">
                View Privilege:
              </legend>
              <label className="fieldset-label text-base font-medium text-black">
                <input
                  type="checkbox"
                  className="checkbox h-5 w-5 rounded-none border border-gray-500 bg-white checked:bg-white"
                  value="STUDENT"
                  {...register("viewPrivilege", {
                    required: "Must have at least one role selected.",
                  })}
                />
                Student
              </label>
              <label className="fieldset-label text-base font-medium text-black">
                <input
                  type="checkbox"
                  className="checkbox h-5 w-5 rounded-none border border-gray-500 bg-white checked:bg-white"
                  value="ACADEMIC_STAFF"
                  {...register("viewPrivilege", {
                    required: "Must have at least one role selected.",
                  })}
                />
                Academic Staff
              </label>
              <label className="fieldset-label text-base font-medium text-black">
                <input
                  type="checkbox"
                  className="checkbox h-5 w-5 rounded-none border border-gray-500 bg-white checked:bg-white"
                  value="NON_ACADEMIC_STAFF"
                  {...register("viewPrivilege", {
                    required: "Must have at least one role selected.",
                  })}
                />
                Non-Academic Staff
              </label>
              {errors.viewPrivilege && (
                <p className="text-sm text-red-500">
                  {errors.viewPrivilege.message}
                </p>
              )}
            </fieldset>

            <fieldset className="flex items-center gap-2 py-3">
              <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
                Assign To:
              </legend>
              <AsyncSelect
                {...register("assignedToIds", {
                  // required: "Must assigned .",
                })}
                cacheOptions
                defaultOptions
                isMulti
                loadOptions={loadUserOptions}
                isClearable
                value={selectedUsers}
                onChange={handleSelectUser}
                placeholder="Select users"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: "#6b7280",
                    borderRadius: "0.5rem",
                    paddingTop: "0",
                    paddingBottom: "0",
                    minWidth: "250px",
                    width: "auto",
                    "&:hover": {
                      borderColor: "#6b7280",
                    },
                  }),
                }}
              />
              {errors.assignedToIds && (
                <p className="text-sm ml-2 text-red-500">
                  {errors.assignedToIds.message}
                </p>
              )}
            </fieldset>

            {role === "SPK_MANAGER" && (
              <fieldset className="flex items-center gap-2 py-3">
                <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
                  Assign Approver:
                </legend>
                <AsyncSelect
                  {...register("approverId", {})}
                  cacheOptions
                  defaultOptions
                  loadOptions={loadUserOptions}
                  isClearable
                  value={selectedApprover}
                  onChange={handleSelectApprover}
                  placeholder="Select approver"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: "#6b7280",
                      borderRadius: "0.5rem",
                      paddingTop: "0",
                      paddingBottom: "0",
                      minWidth: "250px",
                      width: "auto",
                      "&:hover": {
                        borderColor: "#6b7280",
                      },
                    }),
                  }}
                />
                {errors.approverId && (
                  <p className="text-sm ml-2 text-red-500">
                    {errors.approverId.message}
                  </p>
                )}
              </fieldset>
            )}

            <div>
              <div className="flex mt-1">
                <button
                  type="button"
                  className={`border-black border-1 flex items-center p-1 ml-0 my-3 mr-5 ${
                    selectedProcedureMode === "create"
                      ? "bg-[#86E78B]"
                      : "bg-[#D9D9D9]"
                  }`}
                  onClick={() => handleSelectProcedureMode("create")}
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
                  onClick={() => handleSelectProcedureMode("upload")}
                >
                  {selectedProcedureMode === "upload" ? (
                    <CheckIcon className="h-5 w-5 mx-1"></CheckIcon>
                  ) : (
                    <UploadIcon className="h-5 w-5 mx-1"></UploadIcon>
                  )}

                  <span className="pl-1 pr-2">Upload Procedure</span>
                </button>
              </div>
              {selectedProcedureMode === "upload" && (
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
                // {selectedProcedureMode === "upload" && fileDownloadUrl && (
                <div className="bg-white p-3 rounded-xl flex items-center justify-between w-fit">
                  {/* File icon */}
                  <div className="flex items-center">
                    <File className="w-6 h-6 mx-2" />

                    {/* File name and size */}
                    <div className="flex flex-col justify-start pl-3 pr-5">
                      <span className="font-semibold text-[15px]">
                        <a
                          href={`http://localhost:8080${fileDownloadUrl}`}
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

                  {/* Delete icon on the right */}
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
              )}

              {selectedProcedureMode === "create" && (
                <StepForm
                  formData={stepFormData}
                  setFormData={setStepFormData}
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
                    handleDeleteProcedure(procedureID);
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
