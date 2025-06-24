import { Category } from "./Category";

export interface Module {
  moduleId?: string;
  moduleName: string;
  viewPrivilege: string[];
  categories: Category[];
}

export interface ModuleFormData {
  moduleName: string;
  viewPrivilege: string[];
  categoryNames: string[];
}
