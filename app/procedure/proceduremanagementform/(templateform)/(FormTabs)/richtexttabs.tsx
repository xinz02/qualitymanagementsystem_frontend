import React from "react";
import { ProcedureTemplateFormData } from "@/app/interface/ProcedureTemplateFormData";
// import RichTextEditor from "@/app/components/(richtexteditor)/richtexteditor";

import dynamic from "next/dynamic";

const RichTextEditor = dynamic(
  () => import("@/app/components/(richtexteditor)/richtexteditor"),
  { ssr: false }
);

interface RichTextTabProps {
  formData: ProcedureTemplateFormData;
  setFormData: React.Dispatch<
    React.SetStateAction<ProcedureTemplateFormData | null>
  >;
  fields: {
    label: string;
    key: keyof ProcedureTemplateFormData;
    height?: number;
  }[];
}

export const RichTextTab = ({
  formData,
  setFormData,
  fields,
}: RichTextTabProps) => {
  return (
    <div className=" bg-base-100 border-base-300 p-6">
      {fields.map((field) => (
        <RichTextEditor
          key={field.key}
          label={field.label}
          value={formData[field.key] as string}
          height={field.height}
          onChange={(val) =>
            setFormData({
              ...formData,
              [field.key]: val,
            })
          }
        />
      ))}
    </div>
  );
};
