"use client";

import React from "react";
import { useState, useEffect } from "react";
import CategorySelect from "@/app/components/(dropdownselect)/categoryselect";
import ModuleSelect from "@/app/components/(dropdownselect)/moduleselect";
import UserAsyncSelect from "@/app/components/(dropdownselect)/userselect";
import { SelectOption } from "@/app/interface/SelectOption";
import { CornerDownLeft, File, X } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { bytesToMB } from "@/app/procedure/proceduremanagement";
import { FormFormData } from "@/app/interface/FormInterface";
import { triggerGlobalToast } from "@/app/components/(common)/toast/showtoast";
import { useRouter } from "next/navigation";
import ProcedureSelect from "@/app/components/(dropdownselect)/procedureselect";
import { handleDeleteForm } from "../formmanagement";

interface FormsFormProps {
  formID?: string;
}

const FormManagementForm = ({ formID }: FormsFormProps) => {
  // const [selectedUsers, setSelectedUsers] = useState<SelectOption[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
  const [selectedModule, setSelectedModule] = useState<SelectOption | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<SelectOption | null>(
    null
  );
  const [selectedPersonInCharge, setSelectedPersonInCharge] =
    useState<SelectOption | null>(null);
  const [selectedProcedure, setSelectedProcedure] =
    useState<SelectOption | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormFormData>();

  const router = useRouter();

  const fileName = watch("fileName");
  // const fileType = watch("fileType");
  const fileDownloadUrl = watch("fileDownloadUrl");
  const fileSize = watch("fileSize");

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setRole(localStorage.getItem("userRole") || "STUDENT");
  //     setToken(localStorage.getItem("jwt") || "");
  //     setUserId(localStorage.getItem("userId") || "");
  //   }
  // }, []);

  useEffect(() => {
    if (formID) {
      getFormById(formID);
    }
  }, [formID]);

  const getFormById = async (id: string) => {
    try {
      const token = localStorage.getItem("jwt") || "";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/form/getForm/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();
      const formData = result.data;

      console.log("formData: ", formData);

      if (!res.ok) {
        throw new Error(
          result.message || result.error || "Failed to fetch form"
        );
      }

      if (!formData) {
        throw new Error("No form data found");
      }

      setValue("formNumber", formData.formNumber);
      setValue("formName", formData.formName);

      if (formData.module) {
        const moduleOption = {
          value: formData.module.moduleId,
          label: formData.module.moduleName,
        };
        setSelectedModule(moduleOption);
        setValue("moduleId", moduleOption.value);

        const categoriesResult = formData.module.categories;
        const categoryOptions = categoriesResult.map((cat: any) => ({
          value: cat.categoryId,
          label: cat.categoryName,
        }));
        setCategoryOptions(categoryOptions);
      }

      if (formData.category) {
        const categoryOption = {
          value: formData.category.categoryId,
          label: formData.category.categoryName,
        };
        setSelectedCategory(categoryOption);
        setValue("categoryId", categoryOption.value);
      }

      if (formData.viewPrivilege) {
        setValue(`viewPrivilege`, formData.viewPrivilege);
      }

      if (formData.personInCharge) {
        const picOption = {
          value: formData.personInCharge.userId,
          label: formData.personInCharge.username,
        };
        setSelectedPersonInCharge(picOption);
        setValue("personInChargeId", picOption.value);
      }

      if (formData.relatedProcedure) {
        const procedureOption = {
          value: formData.relatedProcedure.procedureId,
          label: formData.relatedProcedure.procedureName,
        };
        console.log("Has procedure returned");
        setSelectedProcedure(procedureOption);
        setValue("procedureId", procedureOption.value);
      } else {
        const noProcedureOption = {
          value: "NO_PROCEDURE",
          label: "No",
        };
        setSelectedProcedure(noProcedureOption);
        setValue("procedureId", noProcedureOption.value);
      }

      if (formData.fileName && formData.fileType && formData.fileDownloadUrl) {
        setValue("fileName", formData.fileName);
        setValue("fileType", formData.fileType);
        setValue("fileDownloadUrl", formData.fileDownloadUrl);
        setValue("fileSize", formData.fileSize);
      }
    } catch (error) {
      if (error instanceof Error) {
        triggerGlobalToast(error.message, "error");
      } else {
        triggerGlobalToast(
          "An unknown error occurred. Please try again later.",
          "error"
        );
      }
    }
  };

  const handleSelectPersonInCharge = (newValue: unknown) => {
    const selectedOption = newValue as SelectOption | null;
    setSelectedPersonInCharge(selectedOption);

    if (selectedOption) {
      setValue("personInChargeId", selectedOption.value);
    }
  };

  const handleSelectProcedure = (newValue: unknown) => {
    const selectedOption = newValue as SelectOption | null;
    setSelectedProcedure(selectedOption);

    if (selectedOption) {
      setValue("procedureId", selectedOption.value);
    }
  };

  const handleFormSubmit = async (data: FormFormData) => {
    try {
      const token = localStorage.getItem("jwt") || "";

      const formInputData = new FormData();
      if (!data.formFile) {
        triggerGlobalToast("Must upload file!", "error");
        return;
      }

      const fileList = data.formFile as any;
      const file = fileList[0] as File;

      formInputData.append("form", file);
      console.log("Form: ", formInputData.get("form"));

      const formData = JSON.stringify({
        formNumber: data.formNumber,
        formName: data.formName,
        moduleId: data.moduleId,
        categoryId: data.categoryId,
        viewPrivilege: data.viewPrivilege,
        personInChargeId: data.personInChargeId,
        procedureId: data.procedureId,
      });

      formInputData.append("formData", formData);
      console.log("FormData: ", formInputData.get("formData"));

      let res = null;

      if (formID) {
        res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/form/editForm/${formID}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formInputData,
          }
        );
      } else {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/form/addForm`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formInputData,
        });
      }

      const response = await res.json();

      if (res.ok) {
        triggerGlobalToast(
          response.message || "Form uploaded successfully!",
          "success"
        );
        getFormById(response.data.formId);

        if (!formID) {
          router.push(`/forms/edit/${response.data.formId}`);
        }
      } else {
        triggerGlobalToast(
          response.message ||
            response.error ||
            "Unable to upload or edit form. Please try again later.",
          "error"
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        triggerGlobalToast(err.message, "error");
      } else {
        triggerGlobalToast("An error occured. Please try again.", "error");
      }
    }
  };

  const handleModuleChange = (
    module: SelectOption | null,
    categories: SelectOption[]
  ) => {
    setSelectedModule(module);
    setCategoryOptions(categories);
    setSelectedCategory(null);

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

  return (
    <div className="flex flex-col items-center justify-center mx-20 my-10">
      <div className="w-full flex items-center">
        <button type="button" className="btn btn-ghost mb-5">
          <Link href={formID ? `/forms/view/${formID}` : `/forms`}>
            <CornerDownLeft className="h-6 w-6" />
          </Link>
        </button>
        <div className="text-4xl font-extrabold mb-7 grow text-center">
          Form Management Form
        </div>
      </div>
      <div className="w-full px-10 py-6 bg-[#F5F5F5] h-auto rounded-2xl">
        <div>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            encType="multipart/form-data"
          >
            <div className="py-3">
              <fieldset className="flex items-center gap-2">
                <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
                  Form Number:
                </legend>
                <input
                  type="text"
                  {...register("formNumber", {
                    required: "Form Number is required.",
                  })}
                  className="border border-gray-500 bg-white rounded-lg px-3 py-1 text-base w-auto flex-1"
                />
              </fieldset>
              {errors.formNumber && (
                <p className="text-sm pt-1 text-red-500 ml-[calc(125px_+_0.5rem)]">
                  {errors.formNumber.message}
                </p>
              )}
            </div>

            <div className="py-3">
              <fieldset className="flex items-center gap-2">
                <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
                  Form Name:
                </legend>
                <input
                  type="text"
                  {...register("formName", {
                    required: "Form Name is required.",
                  })}
                  className="border border-gray-500 bg-white rounded-lg px-3 py-1 text-base w-auto flex-1"
                />
              </fieldset>
              {errors.formName && (
                <p className="text-sm pt-1 text-red-500 ml-[calc(108px_+_0.5rem)]">
                  {errors.formName.message}
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
                Person In Charge:
              </legend>

              <UserAsyncSelect
                {...register("personInChargeId", {
                  required: "Person In Charge is required.",
                })}
                value={selectedPersonInCharge}
                onChange={handleSelectPersonInCharge}
              />
              {errors.personInChargeId && (
                <p className="text-sm ml-2 text-red-500">
                  {errors.personInChargeId.message}
                </p>
              )}
            </fieldset>

            <fieldset className="flex items-center gap-2 py-3">
              <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
                Related Procedure:
              </legend>

              <ProcedureSelect
                {...(register("procedureId"),
                {
                  required: "File is required.",
                })}
                value={selectedProcedure}
                onChange={handleSelectProcedure}
              />
              {errors.procedureId && (
                <p className="text-sm ml-2 text-red-500">
                  {errors.procedureId.message}
                </p>
              )}
            </fieldset>

            <fieldset className="flex items-center gap-2 py-3">
              <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
                Upload Form:
              </legend>

              {!fileDownloadUrl && (
                <input
                  {...register("formFile", {
                    required: "File is required.",
                  })}
                  type="file"
                  accept=".pdf, .doc, .docx"
                  className="file-input mx-2 file:bg-[#e5e5e5]"
                  // onChange={(e) => {
                  //   const file = e.target.files?.[0];
                  //   setValue("formFile", file); // <- set a File directly
                  // }}
                />
              )}

              {errors.formFile && (
                <span className="text-red-500 text-sm">
                  {errors.formFile.message}
                </span>
              )}
            </fieldset>

            {fileDownloadUrl && (
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

                {/* Delete icon on the right */}
                <button
                  type="button"
                  className="btn btn-ghost p-2 m-0"
                  onClick={() => {
                    setValue("formFile", undefined); // Clear the file input
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
            <div className="flex justify-center gap-10 mt-5">
              <button
                type="submit"
                className="btn bg-[#C67A83] text-white border-0 hover:bg-[#b96670]"
              >
                Save
              </button>
              {formID && (
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteForm(formID, router);
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

export default FormManagementForm;
