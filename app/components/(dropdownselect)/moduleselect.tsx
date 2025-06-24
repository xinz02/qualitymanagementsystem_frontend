"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Module } from "@/app/interface/Module";
import { SelectOption } from "@/app/interface/SelectOption";
import { ActionMeta } from "react-select";

const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

interface ModuleSelectProps {
  value: SelectOption | null;
  onChange: (selected: SelectOption | null, categories: SelectOption[]) => void;
}

const ModuleSelect = ({ value, onChange }: ModuleSelectProps) => {
  const [allModules, setAllModules] = useState<Module[]>([]);

  const loadModuleOptions = async (inputValue: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/module/getAllModule`
      );

      const result = await res.json();
      const data: Module[] = result.data ?? [];

      setAllModules(data);

      const filtered = data.filter((module) =>
        module.moduleName.toLowerCase().includes(inputValue.toLowerCase())
      );

      return filtered.map((module) => ({
        value: module.moduleId!,
        label: module.moduleName,
      }));
    } catch (error) {
      console.error("Failed to load modules:", error);
      return [];
    }
  };

  const handleChange = (newValue: unknown, actionMeta: ActionMeta<unknown>) => {
    const selectedOption = newValue as SelectOption | null;

    if (actionMeta.action === "clear") {
      onChange(null, []);
      return;
    }

    if (selectedOption) {
      const selectedModule = allModules.find(
        (module) => module.moduleId === selectedOption.value
      );
      if (selectedModule) {
        const mappedCategories = selectedModule.categories.map((cat) => ({
          value: cat.categoryId!,
          label: cat.categoryName,
        }));
        onChange(selectedOption, mappedCategories);
      }
    }
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadModuleOptions}
      isClearable
      value={value}
      onChange={handleChange}
      placeholder="Select a module"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#6b7280",
          borderRadius: "0.5rem",
          width: "250px",
          "&:hover": { borderColor: "#6b7280" },
        }),
        menuList: (base) => ({
          ...base,
          maxHeight: "150px",
          overflowY: "auto",
        }),
      }}
    />
  );
};

export default ModuleSelect;
