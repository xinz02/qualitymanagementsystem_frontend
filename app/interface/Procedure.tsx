import { Category } from "./Category";
import { Module } from "./Module";
import { ProcedureTemplateFormData } from "./ProcedureTemplateFormData";
import { User } from "./User";

export interface ProcedureFormData {
    procedureId?: string;
    procedureNumber: string;
    procedureName: string;
    moduleId: string;
    categoryId: string;
    viewPrivilege: string[];
    assignedToIds: string[];
    procedureTemplateData?: ProcedureTemplateFormData | null;
    procedureFile?: File;
    fileName?: string;
    fileType?: string;
    fileDownloadUrl?: string;
    fileSize?: number;
    approverId: string;
    approveStatus: string;
}

export interface Procedure {
    procedureId: string;
    procedureNumber: string;
    procedureName: string;
    module: Module;
    category: Category;
    viewPrivilege: string[];
    assignedTo: User[];
    procedureTemplateData?: ProcedureTemplateFormData | null;
    fileName?: string;
    fileType?: string;
    fileDownloadUrl?: string;
    fileSize?: number;
    approver: User;
    approveStatus: string;
}