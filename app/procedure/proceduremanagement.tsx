import {
  EvidenceFileData,
  FlowChartsEvidenceFileData,
} from "../interface/EvidenceFile";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { SelectOption } from "../interface/SelectOption";
import { ProcedureFormData } from "../interface/Procedure";
import { triggerGlobalToast } from "../components/(common)/toast/showtoast";
import { useRouter } from "next/navigation";

export async function handleDeleteProcedure(
  procedureId: string,
  router: ReturnType<typeof useRouter>
) {
  if (!procedureId) return;

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this procedure?"
  );

  if (!confirmDelete) {
    return; // If user cancels, do nothing
  }

  try {
    const token = localStorage.getItem("jwt") || "";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/procedure/deleteProcedure/${procedureId}`,
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
      triggerGlobalToast(
        response.message || "Procedure deleted successfully!",
        "success"
      );

      router.push("/procedure");
    } else {
      throw new Error(
        response.message || response.error || "Failed to delete procedure."
      );
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
}

export function bytesToMB(bytes: number): string {
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export const fetchEvidenceFilesByNode = async (
  nodeId: string
): Promise<EvidenceFileData[]> => {
  try {
    const token = localStorage.getItem("jwt") || "";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/procedure/evidenceFiles/node/${nodeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result.message || result.error || "Failed to fetch evidence files."
      );
    }

    return result.data.evidenceFileListVOList as EvidenceFileData[];
  } catch (err) {
    console.log("err: ", err);
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("An unknown error occurred");
  }
};

export const fetchEvidenceFilesByFlowChart = async (
  flowChartId: string
): Promise<FlowChartsEvidenceFileData> => {
  try {
    const token = localStorage.getItem("jwt") || "";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/procedure/evidenceFiles/flowChart/${flowChartId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result.message || result.error || "Failed to fetch evidence files."
      );
    }

    const data: FlowChartsEvidenceFileData = result.data;

    return data;
  } catch (err) {
    console.log("err: ", err);
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("An unknown error occurred");
  }
};

export function useProcedureFormFields(
  setValue: UseFormSetValue<ProcedureFormData>
) {
  const [selectedModule, setSelectedModule] = useState<SelectOption | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<SelectOption | null>(
    null
  );
  const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<SelectOption[]>([]);

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

  // const handleSelectUser = (newValue: unknown) => {
  //   const selectedOptions = newValue as SelectOption[];
  //   setSelectedUsers(selectedOptions || []);

  //   if (selectedOptions.length > 0) {
  //     const userIds = selectedOptions.map((user) => user.value);
  //     setValue("pindaanDokumen.assignedTo", userIds);
  //   }
  // };

  const handleSelectUser = (newValue: unknown) => {
    const selectedOptions = (newValue as SelectOption[]) || [];
    setSelectedUsers(selectedOptions);

    const userIds = selectedOptions.map((user) => user.value);
    setValue(
      "pindaanDokumen.assignedTo",
      userIds
      // {
      //   shouldValidate: true,
      //   shouldDirty: true,
      // }
    );
  };

  return {
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
  };
}
