import { ProcedureTemplateFormData } from "@/app/interface/ProcedureTemplateFormData";
import React from "react";
import { useState, useEffect } from "react";
import BasicInfoTab from "./(FormTabs)/basicinfotab";
import FlowChartTab from "./(FormTabs)/flowcharttab";
import { RichTextTab } from "./(FormTabs)/richtexttabs";
import { v4 as uuidv4 } from "uuid";

interface TemplateFormProps {
  formData: ProcedureTemplateFormData | null;
  setFormData: React.Dispatch<
    React.SetStateAction<ProcedureTemplateFormData | null>
  >;
}

const TemplateForm = ({ formData, setFormData }: TemplateFormProps) => {
  const [activeTab, setActiveTab] = useState("basic-info");

  useEffect(() => {
    setFormData((prev) => {
      if (prev === null) {
        return {
          namaDokumen: "",
          nomborDokumen: "",
          pindaanDokumen: {
            versi: "",
            tarikh: "",
            butiran: "",
            deskripsiPerubahan: "",
            disediakan: [],
            diluluskan: "",
            assignedTo: [],
          },
          cartaFungsi: {
            flowChartId: `flowchart_${uuidv4()}`,
            mainFlowChart: {
              id: "mainflow",
              title: "Main Flow Chart",
              nodes: [],
              edges: [],
            },
            subFlowCharts: [],
          },
          tujuan: "",
          objektif: "",
          skop: "",
          terminologi: "",
          singkatan: "",
          rujukan: "",
          prosedur: "",
          rekodDanSimpanan: "",
          lampiran: "",
        };
      }
      return prev;
    });
  }, [setFormData]);

  if (!formData) return null;

  const tabs = [
    { id: "basic-info", label: "Basic Info" },
    { id: "flow-chart", label: "Flow Chart" },
    { id: "section-1", label: "Section 1" },
    { id: "section-2", label: "Section 2" },
    { id: "section-3", label: "Section 3" },
    { id: "section-4", label: "Section 4" },
  ];

  return (
    <div className="my-5">
      <div className="tabs tabs-lift">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "tab-active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        {/* <button
          type="button"
          className="tab hover:bg-white hover:font-semibold"
          onClick={() => {
            setFormData(null);
          }}
        >
          <span className="text-red-400">Delete Procedure Template</span>
        </button> */}
      </div>

      <div className="h-fit overflow-auto">
        {activeTab === "basic-info" && (
          <BasicInfoTab formData={formData} setFormData={setFormData} />
        )}
        {activeTab === "flow-chart" && (
          <FlowChartTab formData={formData} setFormData={setFormData} />
        )}
        {activeTab === "section-1" && (
          <RichTextTab
            formData={formData}
            setFormData={setFormData}
            fields={[
              { label: "Tujuan", key: "tujuan" },
              { label: "Objektif", key: "objektif" },
              { label: "Skop", key: "skop" },
            ]}
          />
        )}
        {activeTab === "section-2" && (
          <RichTextTab
            formData={formData}
            setFormData={setFormData}
            fields={[
              { label: "Terminologi", key: "terminologi" },
              { label: "Singkatan", key: "singkatan" },
              { label: "Rujukan", key: "rujukan" },
            ]}
          />
        )}
        {activeTab === "section-3" && (
          <RichTextTab
            formData={formData}
            setFormData={setFormData}
            fields={[{ label: "Prosedur", key: "prosedur", height: 650 }]}
          />
        )}
        {activeTab === "section-4" && (
          <RichTextTab
            formData={formData}
            setFormData={setFormData}
            fields={[
              { label: "Rekod dan Simpanan", key: "rekodDanSimpanan" },
              { label: "Lampiran", key: "lampiran" },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default TemplateForm;
