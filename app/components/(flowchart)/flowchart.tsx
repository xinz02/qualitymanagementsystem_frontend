import { FlowChartData } from "@/app/interface/FlowChartData";
import React from "react";
import { useRef, useState } from "react";
// import FlowChartTemplate from "./(flowcharttemplate)/flowcharttemplate";
import { PlusIcon, TrashIcon } from "lucide-react";
import UploadEvidence from "./uploadevidence/uploadevidence";
import { Node } from "@xyflow/react";
import dynamic from "next/dynamic";


const FlowChartTemplate = dynamic(
  () => import("./(flowcharttemplate)/flowcharttemplate"),
  { ssr: false }
);


interface FlowChartsProps {
  flowChartId: string;
  mainFlowChart: FlowChartData;
  subFlowCharts: FlowChartData[];
  onMainFlowChartChange: (data: FlowChartData) => void;
  onSubFlowChartsChange: (data: FlowChartData[]) => void;
}

const FlowCharts: React.FC<FlowChartsProps> = ({
  flowChartId,
  mainFlowChart,
  subFlowCharts = [],
  onMainFlowChartChange,
  onSubFlowChartsChange,
}) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const safeSubFlowCharts = subFlowCharts ?? [];
  const idSubFlowChartRef = useRef(safeSubFlowCharts.length);

  const addSubFlowChart = () => {
    const newChart: FlowChartData = {
      id: `subflow_${idSubFlowChartRef.current++}`,
      title: "",
      nodes: [],
      edges: [],
    };
    onSubFlowChartsChange([...subFlowCharts, newChart]);
  };

  const deleteSubFlowChart = (id: string) => {
    const updatedSubFlowCharts = subFlowCharts.filter(
      (chart) => chart.id !== id
    );
    onSubFlowChartsChange(updatedSubFlowCharts);
  };

  const updateSubFlowChart = (id: string, updatedData: FlowChartData) => {
    const updatedList = subFlowCharts.map((chart) =>
      chart.id === id ? updatedData : chart
    );
    onSubFlowChartsChange(updatedList);
  };

  return (
    <div>
      <div className="pb-2 font-semibold">FlowChart</div>
      <FlowChartTemplate
        flowChartId={flowChartId}
        value={mainFlowChart}
        onChange={(data) => onMainFlowChartChange(data)}
        onNodeSelect={setSelectedNode}
      />

      {safeSubFlowCharts.length > 0 && (
        <div className="pt-5 font-semibold">Sub-Flow Chart</div>
      )}

      {safeSubFlowCharts.map((chart) => (
        <div className="py-4" key={chart.id}>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Sub-Flow Chart Title"
              className="input input-ghost mb-2 px-2 flex-1 hover:border-gray-500 flex items-center h-10 text-base"
              value={chart.title}
              onChange={(e) => {
                const newTitle = e.target.value;
                updateSubFlowChart(chart.id, { ...chart, title: newTitle });
              }}
            />
            <button
              type="button"
              className="btn btn-ghost mb-2 flex-shrink-0"
              onClick={() => deleteSubFlowChart(chart.id)}
            >
              <TrashIcon className="w-5 h-5 text-red-500" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
          <FlowChartTemplate
            flowChartId={flowChartId}
            value={chart}
            onChange={(updatedChart) =>
              updateSubFlowChart(chart.id, updatedChart)
            }
            onNodeSelect={setSelectedNode}
          />
        </div>
      ))}

      <div className="mt-5">
        <button
          type="button"
          className="btn bg-[#C67A83] text-white border-0 hover:bg-[#b96670]"
          onClick={addSubFlowChart}
        >
          <PlusIcon className="w-5 h-5" /> <span>Add Sub-Flow Chart</span>
        </button>
      </div>

      {/* dialog */}
      <dialog id="upload_file_modal" className="modal z-50">
        <div className="modal-box w-2/3 max-w-5xl z-50 h-4/5 max-h-4/5 flex flex-col justify-start">
          {selectedNode && (
            <div key={selectedNode.id} className="w-full h-full">
              <span className="font-semibold">
                {selectedNode.data.content as string}
              </span>
              <div className="w-full h-full">
                <UploadEvidence selectedNode={selectedNode} />
              </div>
            </div>
          )}
          <div className="modal-action w-full flex justify-center items-center">
            <button
              type="button"
              className="btn"
              onClick={() => {
                (
                  document.getElementById(
                    "upload_file_modal"
                  ) as HTMLDialogElement
                )?.close();
                setSelectedNode(null);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default FlowCharts;
