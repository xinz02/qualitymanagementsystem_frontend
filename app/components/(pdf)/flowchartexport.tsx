// import React from "react";
// import { toPng } from "html-to-image";
// import {
//   ReactFlow,
//   ReactFlowProvider,
//   useReactFlow,
//   getNodesBounds,
//   getViewportForBounds,
// } from "@xyflow/react";
// import { FlowChart } from "@/app/interface/ProcedureTemplateFormData";
// import { useRef } from "react";
// import { ProcessNode } from "../../(flowchart)/(node)/processnode";
// import { MechanismNode } from "../../(flowchart)/(node)/mechanismnode";
// import { InputNode } from "../../(flowchart)/(node)/inputnode";
// import { ControlNode } from "../../(flowchart)/(node)/controlnode";
// import { OutputInputNode } from "../../(flowchart)/(node)/outputinputnode";
// import { OutputNode } from "../../(flowchart)/(node)/outputnode";

// interface FlowChartExportProps {
//   flowCharts: FlowChart;
//   onImagesReady: (
//     images: { id: string; title: string; image: string }[]
//   ) => void;
// }

// const nodeTypes = {
//   process: ProcessNode,
//   mechanism: MechanismNode,
//   inputNode: InputNode,
//   controlNode: ControlNode,
//   outputNode: OutputNode,
//   outputinput: OutputInputNode,
// };

// const FlowChartExport = ({
//   flowCharts,
//   onImagesReady,
// }: FlowChartExportProps) => {
//   const wrapperRef = useRef<HTMLDivElement>(null);
//   const hasExportedRef = useRef(false);
//   const { getNodes } = useReactFlow();
//   const nodes = getNodes();

//   const exportImage = async () => {
//     const imageWidth = 1024;
//     const imageHeight = 768;

//     const nodesBounds = getNodesBounds(nodes);
//     const viewport = getViewportForBounds(
//       nodesBounds,
//       imageWidth,
//       imageHeight,
//       0.5,
//       2,
//       0
//     );

//     if (!wrapperRef.current || hasExportedRef.current) return;
//     try {
//       // const image = await toPng(wrapperRef.current, { quality: 1.0 });
//       const image = await toPng(wrapperRef.current, {
//         width: imageWidth,
//         height: imageHeight,
//         style: {
//           transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
//           // transformOrigin: "top left",
//         },
//       });

//       console.log("Image exported successfully", image);

//       hasExportedRef.current = true;
//       onImagesReady([
//         {
//           id: flowCharts.mainFlowChart.id,
//           title: flowCharts.mainFlowChart.title,
//           image,
//         },
//       ]);
//     } catch (error) {
//       console.error("Image export failed", error);
//     }
//   };

//   return (
//     <>
//       //!
//       {/* <div
//         ref={wrapperRef}
//         style={{
//           width: 500,
//           height: 500,
//           backgroundColor: "white",
//           position: "relative",
//         }}
//       >
//         <ReactFlowProvider>
//           <ReactFlow
//             nodes={flowCharts.mainFlowChart.nodes}
//             edges={flowCharts.mainFlowChart.edges}
//             nodeTypes={nodeTypes}
//             onInit={(instance) => {
//               instance.fitView(); // optionally trigger this
//             }}
//             fitView
//           ></ReactFlow>
//         </ReactFlowProvider>
//       </div> */}
//       //!
//       <div
//         style={{
//           position: "relative",
//           backgroundColor: "white",
//         }}
//       >
//         <div
//           ref={wrapperRef}
//           style={{ width: 500, height: 250, backgroundColor: "white" }}
//         >
//           <ReactFlowProvider>
//             <ReactFlow
//               nodes={flowCharts.mainFlowChart.nodes}
//               edges={flowCharts.mainFlowChart.edges}
//               nodeTypes={nodeTypes}
//               fitView
//               onInit={(instance) => {
//                 instance.fitView();
//                 setTimeout(() => {
//                   exportImage(); // delay ensures rendering is stable
//                 }, 500);
//               }}
//             />
//           </ReactFlowProvider>
//         </div>
//       </div>
//       {/* {flowCharts.subFlowCharts.map((sub) => (
//         <div
//           key={sub.id}
//           ref={(el) => {
//             if (el) subRefs.current[sub.id] = el;
//           }}
//           style={{
//             width: "auto",
//             height: "auto",
//             backgroundColor: "white",
//             position: "relative",
//           }}
//         >
//           <ReactFlowProvider>
//             <ReactFlow
//               nodes={sub.nodes}
//               edges={sub.edges}
//               nodeTypes={nodeTypes}
//               fitView
//             ></ReactFlow>
//           </ReactFlowProvider>
//         </div>
//       ))} */}
//       {/* <img src={image || ""} alt="Flow Chart" /> */}
//       {/* <div
//         ref={mainRef}
//         style={{
//           width: 1000,
//           height: 600,
//           position: "absolute",
//           top: "-9999px",
//           left: "-9999px",
//           visibility: "hidden", // hides visually but DOM still renders
//         }}
//       >
//         <ReactFlowProvider>
//           <ReactFlow
//             nodes={flowCharts.mainFlowChart.nodes}
//             edges={flowCharts.mainFlowChart.edges}
//             nodeTypes={nodeTypes}
//             fitView
//             onInit={(instance) => {
//               instance.fitView(); // optionally trigger this
//             }}
//           />
//         </ReactFlowProvider>
//       </div> */}
//     </>
//   );
// };

// export default FlowChartExport;

import React, { useEffect, useState, useRef } from "react";
import { toPng } from "html-to-image";
import {
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
} from "@xyflow/react";
import { FlowChart } from "@/app/interface/ProcedureTemplateFormData";
import { ProcessNode } from "../(flowchart)/(node)/processnode";
import { MechanismNode } from "../(flowchart)/(node)/mechanismnode";
import { InputNode } from "../(flowchart)/(node)/inputnode";
import { ControlNode } from "../(flowchart)/(node)/controlnode";
import { OutputInputNode } from "../(flowchart)/(node)/outputinputnode";
import { OutputNode } from "../(flowchart)/(node)/outputnode";
import { FlowChartData } from "@/app/interface/FlowChartData";

interface FlowChartExportProps {
  flowCharts: FlowChartData;
  onImagesReady: (
    images: { id: string; title: string; image: string }[]
  ) => void;
}

const nodeTypes = {
  process: ProcessNode,
  mechanism: MechanismNode,
  inputNode: InputNode,
  controlNode: ControlNode,
  outputNode: OutputNode,
  outputinput: OutputInputNode,
};

const FlowChartExportInner = ({
  flowCharts,
  onImagesReady,
}: FlowChartExportProps) => {
  //   const wrapperRef = useRef<HTMLDivElement>(null);
  //   const hasExportedRef = useRef(false);
  //   const { getNodes, fitView } = useReactFlow();
  //   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  //   const calculateDimensions = () => {
  //     const nodes = getNodes();
  //     if (nodes.length === 0) return;

  //     const nodesBounds = getNodesBounds(nodes);
  //     const width = Math.max(nodesBounds.width + 100, 500); // Minimum width of 500
  //     const height = Math.max(nodesBounds.height + 100, 100); // Minimum height of 300

  //     setDimensions({ width, height });
  //   };

  //   const exportImage = async () => {
  //     if (!wrapperRef.current || hasExportedRef.current) return;

  //     try {
  //       calculateDimensions();

  //       // Wait for dimensions to update and ReactFlow to re-render
  //       await new Promise((resolve) => setTimeout(resolve, 100));

  //       const nodes = getNodes();
  //       const nodesBounds = getNodesBounds(nodes);

  //       // Add some padding around the flowchart
  //       const padding = 50;
  //       const width = nodesBounds.width + padding * 2;
  //       const height = nodesBounds.height + padding * 2;

  //       const image = await toPng(wrapperRef.current, {
  //         width,
  //         height,
  //         style: {
  //           width: `${width}px`,
  //           height: `${height}px`,
  //         },
  //       });

  //       console.log("Image exported successfully", image);
  //       hasExportedRef.current = true;

  //       onImagesReady([
  //         {
  //           id: flowCharts.id,
  //           title: flowCharts.title,
  //           image,
  //         },
  //       ]);
  //     } catch (error) {
  //       console.error("Image export failed", error);
  //     }
  //   };

  //   useEffect(() => {
  //     calculateDimensions();
  //   }, [flowCharts]);

  //   return (
  //     <div
  //       style={{
  //         position: "relative",
  //         backgroundColor: "white",
  //         width: dimensions.width || "100%",
  //         height: dimensions.height || "100%",
  //       }}
  //       ref={wrapperRef}
  //     >
  //       <ReactFlow
  //         nodes={flowCharts.nodes}
  //         edges={flowCharts.edges}
  //         nodeTypes={nodeTypes}
  //         fitView
  //         proOptions={{ hideAttribution: true }}
  //         onInit={(instance) => {
  //           instance.fitView({ padding: 0.05 });
  //           setTimeout(() => {
  //             exportImage();
  //           }, 500);
  //         }}
  //         style={{
  //           width: "100%",
  //           height: "100%",
  //         }}
  //       />
  //       {/* {flowCharts.subFlowCharts.map((sub) => (
  //         <div
  //           key={sub.id}
  //           style={{
  //             width: "100%",
  //             height: "100%",
  //             backgroundColor: "white",
  //             position: "relative",
  //           }}
  //         >
  //           <ReactFlow
  //             nodes={sub.nodes}
  //             edges={sub.edges}
  //             nodeTypes={nodeTypes}
  //             fitView
  //             proOptions={{ hideAttribution: true }}
  //           />
  //         </div>
  //       ))} */}
  //     </div>
  //   );
  // };
  const hasExportedRef = useRef(false);
  const { getNodes, fitView } = useReactFlow();

  const exportImage = async () => {
    if (hasExportedRef.current) return;

    try {
      const viewport = document.querySelector(".react-flow__viewport");
      if (!viewport) {
        throw new Error("ReactFlow viewport not found");
      }

      const nodes = getNodes();
      if (nodes.length === 0) return;

      // Get the bounds of all nodes
      const nodesBounds = getNodesBounds(nodes);

      // Add padding (50px on each side)
      const padding = 50;
      const imageWidth = nodesBounds.width + padding * 2;
      const imageHeight = nodesBounds.height + padding * 2;

      // Calculate the transform needed to center the content
      const transform = `translate(${padding - nodesBounds.x}px, ${
        padding - nodesBounds.y
      }px)`;

      const image = await toPng(viewport as HTMLElement, {
        backgroundColor: "white",
        width: imageWidth,
        height: imageHeight,
        style: {
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          transform: transform,
        },
        pixelRatio: 2, // For higher quality
      });

      hasExportedRef.current = true;
      onImagesReady([
        {
          id: flowCharts.id,
          title: flowCharts.title,
          image,
        },
      ]);
    } catch (error) {
      console.error("Image export failed", error);
    }
  };

  useEffect(() => {
    // Fit view and then export
    const timer = setTimeout(() => {
      fitView({ padding: 0.2 });
      exportImage();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={flowCharts.nodes}
        edges={flowCharts.edges}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        fitView
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

const FlowChartExport = (props: FlowChartExportProps) => {
  return (
    <ReactFlowProvider>
      <FlowChartExportInner {...props} />
    </ReactFlowProvider>
  );
};

export default FlowChartExport;
