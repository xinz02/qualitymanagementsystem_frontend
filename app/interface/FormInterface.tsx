import { Module } from "./Module";
import { Category } from "./Category";
import { ProcedureInfo } from "./Procedure";
import { User } from "./User";

export interface FormFormData {
  formId?: string;
  formNumber: string;
  formName: string;
  moduleId: string;
  categoryId: string;
  viewPrivilege: string[];
  personInChargeId: string;
  procedureId: string;
  formFile?: File;
  fileName?: string;
  fileType?: string;
  fileDownloadUrl?: string;
  fileSize?: number;
}

export interface FormInfo {
  formId: string;
  formNumber: string;
  formName: string;
  module: Module;
  category: Category;
  personInCharge: User;
  procedure: ProcedureInfo;
  viewPrivilege: string[];
  fileName?: string;
  fileType?: string;
  fileDownloadUrl?: string;
  fileSize?: number;
}
