import { Module } from "./Module";
import { Category } from "./Category";

export interface Form {
  formId: string;
  formNumber: string;
  formName: string;
  module: Module;
  category: Category;
  viewPrivilege: string[];
  fileName?: string;
  fileType?: string;
  fileDownloadUrl?: string;
  fileSize?: number;
}
