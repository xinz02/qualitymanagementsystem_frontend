import { Category } from "./Category";

export interface Module {
  moduleId?: string;
  moduleName: string;
  viewPrivilege: string[];
  categories: Category[];
}
