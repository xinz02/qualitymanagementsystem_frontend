import { ProcedureTemplateFormTabData } from "@/app/interface/ProcedureTemplateFormTabData";
import React from "react";
import FlowCharts from "@/app/components/(flowchart)/flowchart";

const FlowChartTab = ({
  formData,
  setFormData,
}: ProcedureTemplateFormTabData) => {
  return (
    <div className=" bg-base-100 border-base-300 p-6">
      <FlowCharts
        mainFlowChart={formData.cartaFungsi.mainFlowChart}
        subFlowCharts={formData.cartaFungsi.subFlowCharts}
        onMainFlowChartChange={
          (newMainChart) =>
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
          //   setFormData({
          //     ...formData,
          //     cartaFungsi: {
          //       ...formData.cartaFungsi,
          //       mainFlowChart: newMainChart,
          //     },
          //   })
        }
        onSubFlowChartsChange={
          (newSubCharts) =>
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
          //   setFormData({
          //     ...formData,
          //     cartaFungsi: {
          //       ...formData.cartaFungsi,
          //       subFlowCharts: newSubCharts,
          //     },
          //   })
        }
      />
    </div>
  );
};

export default FlowChartTab;
