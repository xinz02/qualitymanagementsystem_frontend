import { ProcedureTemplateFormData } from "./ProcedureTemplateFormData";

export interface ProcedureTemplateFormTabData {
  formData: ProcedureTemplateFormData;
  setFormData: React.Dispatch<
    React.SetStateAction<ProcedureTemplateFormData | null>
  >;
  fields?: {
    label: string;
    key: keyof ProcedureTemplateFormData;
    height?: number;
  }[];
}
