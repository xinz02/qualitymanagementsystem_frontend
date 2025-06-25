"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { SelectOption } from "@/app/interface/SelectOption";
import { ProcedureInfo } from "@/app/interface/Procedure";

const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

interface ProcedureSelectProps {
  value: SelectOption | null;
  onChange: (value: unknown) => void;
}

const ProcedureSelect = ({ value, onChange }: ProcedureSelectProps) => {
  // const [allProcedures, setAllProcedures] = useState<ProcedureInfo[]>([]);

  //   const loadProcedureOptions = async (inputValue: string) => {
  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/procedure/getProcedureInfo`
  //       );

  //       const result = await res.json();
  //       const data: ProcedureInfo[] = result.data ?? [];

  //       setAllProcedures(data);

  //       const filtered = data.filter((procedure) =>
  //         procedure.procedureName.toLowerCase().includes(inputValue.toLowerCase())
  //       );

  //       return filtered.map((procedure) => ({
  //         value: procedure.procedureId,
  //         label: procedure.procedureName,
  //       }));
  //     } catch (error) {
  //       console.error("Failed to load procedures:", error);
  //       return [];
  //     }
  //   };
  const loadProcedureOptions = async (inputValue: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/procedure/getProcedureInfo`
      );
      const result = await res.json();
      const data: ProcedureInfo[] = result.data ?? [];

      // setAllProcedures(data);

      const filtered = data.filter((procedure) =>
        procedure.procedureName.toLowerCase().includes(inputValue.toLowerCase())
      );

      const options = filtered.map((procedure) => ({
        value: procedure.procedureId,
        label: procedure.procedureName,
      }));

      // Add static "No" option
      const staticOption = { value: "NO_PROCEDURE", label: "No" };

      return [staticOption, ...options];
    } catch (error) {
      console.error("Failed to load procedures:", error);
      return [{ value: "NO_PROCEDURE", label: "No" }];
    }
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadProcedureOptions}
      isClearable
      value={value}
      onChange={onChange}
      placeholder="Select related procedure"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#6b7280",
          borderRadius: "0.5rem",
          width: "650px",
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

export default ProcedureSelect;
