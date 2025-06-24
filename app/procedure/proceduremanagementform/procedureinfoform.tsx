// components/AdminProcedureFields.tsx

import CategorySelect from "@/app/components/(dropdownselect)/categoryselect";
import ModuleSelect from "@/app/components/(dropdownselect)/moduleselect";
import { ProcedureFormData } from "@/app/interface/Procedure";
import { SelectOption } from "@/app/interface/SelectOption";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface ProcedureInfoFormProps {
  register: UseFormRegister<ProcedureFormData>;
  errors: FieldErrors<ProcedureFormData>;
  selectedModule: SelectOption | null;
  handleModuleChange: (
    module: SelectOption | null,
    categories: SelectOption[]
  ) => void;
  selectedCategory: SelectOption | null;
  handleCategoryChange: (value: SelectOption | null) => void;
  categoryOptions: SelectOption[];
}

const ProcedureInfoForm = ({
  register,
  errors,
  selectedModule,
  handleModuleChange,
  selectedCategory,
  handleCategoryChange,
  categoryOptions,
}: ProcedureInfoFormProps) => {
  return (
    <>
      {/* Procedure Number */}
      <div className="py-3">
        <fieldset className="flex items-center gap-2">
          <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
            Procedure Number:
          </legend>
          <input
            type="text"
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

      {/* Procedure Name */}
      <div className="py-3">
        <fieldset className="flex items-center gap-2">
          <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
            Procedure Name:
          </legend>
          <input
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
        {/* Module */}
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

        {/* Category */}
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
          />
          {errors.categoryId && (
            <p className="text-sm text-red-500 mt-1 ml-2">
              {errors.categoryId.message}
            </p>
          )}
        </fieldset>
      </div>

      {/* View Privilege */}
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
          <p className="text-sm text-red-500">{errors.viewPrivilege.message}</p>
        )}
      </fieldset>
    </>
  );
};

export default ProcedureInfoForm;
