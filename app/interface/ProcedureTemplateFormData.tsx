import { FlowChart, FlowChartData } from "./FlowChartData";
import { Module } from "./Module";
import { User } from "./User";

export interface ProcedureTemplateFormData {
  namaDokumen: string;
  nomborDokumen: string;
  cartaFungsi: FlowChart;
  tujuan: string;
  objektif: string;
  skop: string;
  terminologi: string;
  singkatan: string;
  rujukan: string;
  prosedur: string;
  rekodDanSimpanan: string;
  lampiran: string;
  pindaanDokumen: PindaanDokumenFormData;
}

export interface PindaanDokumenFormData {
  versi: string;
  tarikh: string;
  butiran: string;
  deskripsiPerubahan: string;
  disediakan: string[];
  diluluskan: string;
  assignedTo: string[];
  procedureTemplateData?: ProcedureTemplateFormData | null;
  approveStatus?: string;
  description?: string;
}

export interface PindaanDokumenVO {
  versi: string;
  tarikh: string;
  butiran: string;
  deskripsiPerubahan: string;
  disediakan: User[];
  diluluskan: User;
  assignTo: User[];
  procedureTemplateData?: ProcedureTemplateFormData | null;
  approver?: User;
  approveStatus: string;
  description?: string;
}

export interface PindaanDokumenSimplified {
  versi: string;
  tarikh: string;
  butiran: string;
  deskripsiPerubahan: string;
  disediakan: User[];
  diluluskan: User;
  // assignedTo: User[];
  // procedureTemplateData?: ProcedureTemplateFormData | null;
  // approver?: User;
  // approveStatus: string;
  // description?: string;
}

