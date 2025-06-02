import { FlowChartData } from "@/app/interface/FlowChartData";
import React from "react";
import { useState, useCallback, useRef } from "react";
import FlowChartTemplate from "./(flowcharttemplate)/flowcharttemplate";
import { PlusIcon, TrashIcon } from "lucide-react";
import { FlowChart } from "@/app/interface/ProcedureTemplateFormData";

// const FlowCharts = () => {
//   const [subFlowcharts, setSubFlowcharts] = useState<FlowChartData[]>([]);

//   // const handleNewProcessNode = useCallback((nodeId: string, title: string) => {
//   //   console.log("called handleNewProcessNode", nodeId, title);
//   //   setSubFlowcharts((prev) => [
//   //     ...prev,
//   //     {
//   //       id: nodeId,
//   //       title: title,
//   //     },
//   //   ]);
//   //   console.log("New process node created:", nodeId, title);
//   // }, []);

//   // console.log("handleNewProcessNode is", handleNewProcessNode);

//   const idSubFlowChartRef = useRef(0);

//   const addSubFlowChart = () => {
//     setSubFlowcharts((prev) => [
//       ...prev,
//       {
//         id: `subflow_${idSubFlowChartRef.current++}`,
//         title: "",
//         nodes: [],
//         edges: [],
//       },
//     ]);
//   };

//   return (
//     <div>
//       <div className="pb-2 font-semibold">FlowChart</div>
//       <FlowChartTemplate
//       // onProcessNodeCreated={handleNewProcessNode}
//       />

//       {subFlowcharts.length > 0 && (
//         <div className="pb-3 font-semibold">Sub-Flow Chart</div>
//       )}

//       {subFlowcharts.map((chart) => (
//         <div key={chart.id}>
//           {/* <h2 className="text-xl font-bold px-2">{chart.title}</h2> */}
//           <input
//             type="text"
//             placeholder="Sub-Flow Chart Title"
//             className="input input-ghost mb-2 px-2 py-0 h-6 w-full hover:border-gray-500"
//             onChange={(e) => {
//               const newTitle = e.target.value;
//               setSubFlowcharts((prev) =>
//                 prev.map((item) =>
//                   item.id === chart.id ? { ...item, title: newTitle } : item
//                 )
//               );
//               console.log(subFlowcharts)
//             }}
//           />
//           <FlowChartTemplate />
//         </div>
//       ))}

//       <div>
//         <button
//           type="button"
//           className="btn bg-[#C67A83] text-white border-0 hover:bg-[#b96670]"
//           onClick={addSubFlowChart}
//         >
//           <PlusIcon className="w-5 h-5" /> <span>Add Sub-Flow Chart</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FlowCharts;

// const FlowCharts = () => {
//   const [mainFlowChart, setMainFlowChart] = useState<FlowChartData>({
//     id: "mainflow",
//     title: "Main Flow Chart",
//     nodes: [],
//     edges: [],
//   });

//   const [subFlowcharts, setSubFlowcharts] = useState<FlowChartData[]>([]);
//   const idSubFlowChartRef = useRef(0);

//   const addSubFlowChart = () => {
//     setSubFlowcharts((prev) => [
//       ...prev,
//       {
//         id: `subflow_${idSubFlowChartRef.current++}`,
//         title: "",
//         nodes: [],
//         edges: [],
//       },
//     ]);
//   };

//   const updateSubFlowChart = (id: string, updatedData: FlowChartData) => {
//     setSubFlowcharts((prev) =>
//       prev.map((chart) => (chart.id === id ? updatedData : chart))
//     );
//   };

//   return (
//     <div>
//       <div className="pb-2 font-semibold">FlowChart</div>
//       <FlowChartTemplate
//         value={mainFlowChart}
//         onChange={(data) => setMainFlowChart(data)}
//       />

//       {subFlowcharts.length > 0 && (
//         <div className=" pt-5 font-semibold">Sub-Flow Chart</div>
//       )}

//       {subFlowcharts.map((chart) => (
//         <div className="py-4" key={chart.id}>
//           <input
//             type="text"
//             placeholder="Sub-Flow Chart Title"
//             className="input input-ghost mb-2 pt-2 px-2 py-0 h-6 w-full hover:border-gray-500"
//             value={chart.title}
//             onChange={(e) => {
//               const newTitle = e.target.value;
//               updateSubFlowChart(chart.id, { ...chart, title: newTitle });
//             }}
//           />
//           <FlowChartTemplate
//             value={chart}
//             onChange={(updatedChart) => updateSubFlowChart(chart.id, updatedChart)}
//           />
//         </div>
//       ))}

//       <div>
//         <button
//           type="button"
//           className="btn bg-[#C67A83] text-white border-0 hover:bg-[#b96670]"
//           onClick={addSubFlowChart}
//         >
//           <PlusIcon className="w-5 h-5" /> <span>Add Sub-Flow Chart</span>
//         </button>
//       </div>

//       {/* ✅ Example: Submit flowchart data */}
//       <button
//       type="button"
//         className="btn mt-4"
//         onClick={() => {
//           const fullFlowData: FlowChart = {
//             mainFlowChart: mainFlowChart,
//             subFlowCharts: subFlowcharts,
//           };
//           console.log("Submit this to DB or API:", fullFlowData);
//         }}
//       >
//         Save All Flow Charts
//       </button>
//     </div>
//   );
// };

interface FlowChartsProps {
  mainFlowChart: FlowChartData;
  subFlowCharts: FlowChartData[];
  onMainFlowChartChange: (data: FlowChartData) => void;
  onSubFlowChartsChange: (data: FlowChartData[]) => void;
}

const FlowCharts: React.FC<FlowChartsProps> = ({
  mainFlowChart,
  subFlowCharts,
  onMainFlowChartChange,
  onSubFlowChartsChange,
}) => {
  const idSubFlowChartRef = useRef(subFlowCharts.length);

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
        value={mainFlowChart}
        onChange={(data) => onMainFlowChartChange(data)}
      />

      {subFlowCharts.length > 0 && (
        <div className="pt-5 font-semibold">Sub-Flow Chart</div>
      )}

      {subFlowCharts.map((chart) => (
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
            value={chart}
            onChange={(updatedChart) =>
              updateSubFlowChart(chart.id, updatedChart)
            }
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
    </div>
  );
};

export default FlowCharts;
