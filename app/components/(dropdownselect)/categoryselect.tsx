"use client";

import dynamic from "next/dynamic";
import { SelectOption } from "@/app/interface/SelectOption";
import { ActionMeta } from "react-select";

const Select = dynamic(() => import("react-select"), { ssr: false });

interface CategorySelectProps {
  options: SelectOption[];
  value: SelectOption | null;
  onChange: (selected: SelectOption | null) => void;
  disabled?: boolean;
}

const CategorySelect = ({ options, value, onChange, disabled }: CategorySelectProps) => {
  return (
    <Select
      isClearable
      options={options}
      value={value}
      onChange={(newValue, actionMeta) => {
        const selectedOption = newValue as SelectOption | null;
        if (actionMeta.action === "clear") {
          onChange(null);
        } else {
          onChange(selectedOption);
        }
      }}
      placeholder={disabled ? "Select module first" : "Select a category"}
      isDisabled={disabled}
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#6b7280",
          borderRadius: "0.5rem",
          width: "250px",
          "&:hover": { borderColor: "#6b7280" },
        }),
      }}
    />
  );
};

export default CategorySelect;
