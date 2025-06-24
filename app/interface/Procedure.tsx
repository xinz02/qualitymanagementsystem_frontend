import { Category } from "./Category";
import { Module } from "./Module";
import {
  PindaanDokumenFormData,
  PindaanDokumenVO,
  ProcedureTemplateFormData,
} from "./ProcedureTemplateFormData";
import { User } from "./User";

export interface ProcedureFormData {
  procedureId?: string;
  procedureNumber: string;
  procedureName: string;
  moduleId: string;
  categoryId: string;
  viewPrivilege: string[];
  pindaanDokumen: PindaanDokumenFormData;
  procedureFile?: File;
  fileName?: string;
  fileType?: string;
  fileDownloadUrl?: string;
  fileSize?: number;
  // assignedToIds: string[];
  // procedureTemplateData?: ProcedureTemplateFormData | null;
  // approverId: string;
  // approveStatus?: string;
}

export interface Procedure {
  procedureId: string;
  procedureNumber: string;
  procedureName: string;
  module: Module;
  category: Category;
  viewPrivilege: string[];
  pindaanDokumen: PindaanDokumenVO[];
  //   assignedTo: User[];
  //   procedureTemplateData?: ProcedureTemplateFormData | null;
  fileName?: string;
  fileType?: string;
  fileDownloadUrl?: string;
  fileSize?: number;
  //   approver: User;
  //   approveStatus: string;
}

export interface ProcedureApproveStatus {
  approverId: string;
  status: string;
  description: string;
}

export interface ProcedureInfo {
  procedureId: string;
  procedureName: string;
}

// view all procedure in procedure list page
export interface ProcedureList {
  accessibleProcedures: ProcedureListInfo[];
  assignedProcedures: ProcedureListInfo[];
}

export interface ProcedureListInfo {
  procedureId: string;
  procedureNumber: string;
  procedureName: string;
  module: Module;
  procedureApproveStatus: string;
  version: string;
  createdAt: string;
  lastModified: string;
}

export interface ProcedureVersion {
  procedureId: string;
  procedureNumber: string;
  procedureName: string;
  module: Module;
  category: Category;
  viewPrivilege: string[];
  pindaanDokumen?: PindaanDokumenVO;
  //   assignedTo: User[];
  //   procedureTemplateData?: ProcedureTemplateFormData | null;
  fileName?: string;
  fileType?: string;
  fileDownloadUrl?: string;
  fileSize?: number;
  //   approver: User;
  //   approveStatus: string;
}

export interface NewProcedureVersion {
  versi: string;
  assignedTo: string[];
  butiran?: string;
}
