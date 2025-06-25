import { ProcedureTemplateFormTabData } from "@/app/interface/ProcedureTemplateFormTabData";
import React from "react";
// import FlowCharts from "@/app/components/(flowchart)/flowchart";

import dynamic from "next/dynamic";

const FlowCharts = dynamic(
  () => import("@/app/components/(flowchart)/flowchart"),
  { ssr: false }
);

const FlowChartTab = ({
  formData,
  setFormData,
}: ProcedureTemplateFormTabData) => {
  return (
    <div className=" bg-base-100 border-base-300 p-6">
      <FlowCharts
        flowChartId={formData.cartaFungsi.flowChartId}
        mainFlowChart={formData.cartaFungsi.mainFlowChart}
        subFlowCharts={formData.cartaFungsi.subFlowCharts}
        onMainFlowChartChange={(newMainChart) =>
          setFormData((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              cartaFungsi: {
                ...prev.cartaFungsi,
                mainFlowChart: newMainChart,
              },
            };
          })
        }
        onSubFlowChartsChange={(newSubCharts) =>
          setFormData((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              cartaFungsi: {
                ...prev.cartaFungsi,
                subFlowCharts: newSubCharts,
              },
            };
          })
        }
      />
    </div>
  );
};

export default FlowChartTab;
