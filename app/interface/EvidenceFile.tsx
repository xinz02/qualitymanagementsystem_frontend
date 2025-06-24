import { User } from "./User";

export interface EvidenceInfoData {
  flowChartId: string;

  nodeId: string;

  flowChart: string;

  personInCharge: string;

  semester: string;
}

export interface EvidenceFileFormData {
  evidenceInfoData: EvidenceInfoData;

  evidenceFile: File;
}

export interface EvidenceFileData {
  flowChartId: string;

  nodeId: string;

  flowChart: string;

  fileId: string;

  fileName: string;

  fileType: string;

  fileDownloadUrl: string;

  fileSize: number;

  personInCharge: User;

  semester: string;
}

export interface FlowChartsEvidenceFileData {
  flowChartId: string;

  mainFlowChartEvidenceFile: FlowChartEvidenceFileData;

  subFlowChartsEvidenceFile: FlowChartEvidenceFileData[];
}

export interface FlowChartEvidenceFileData {
  flowChart: string;

  nodeFiles: NodeEvidenceFile[];
}

export interface NodeEvidenceFile {
  nodeId: string;

  nodeFiles: UploadedFile[];
}

export interface UploadedFile {
  fileId: string;

  fileName: string;

  fileType: string;

  fileDownloadUrl: string;

  fileSize: number;

  personInCharge: User;

  semester: string;
}
