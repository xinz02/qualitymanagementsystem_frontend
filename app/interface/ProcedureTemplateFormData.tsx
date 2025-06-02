import { FlowChartData } from "./FlowChartData";

export interface ProcedureTemplateFormData {
    namaDokumen: string;
    nomborDokumen: string;
    pindaanDokumen: PindaanDokumen[];
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
}

export interface PindaanDokumen {
    pindaan: string;
    tarikh: string;
    butiran: string;
    disediakan: string;
    diluluskan: string;
}

export interface FlowChart {
    mainFlowChart: FlowChartData;
    subFlowCharts: FlowChartData[];
};