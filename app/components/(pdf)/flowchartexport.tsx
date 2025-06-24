import React, { useEffect, useState, useRef } from "react";
import { toPng } from "html-to-image";
import {
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
} from "@xyflow/react";
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
  const hasExportedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null); // add ref to outer container

  const { getNodes, fitView, getNodesBounds } = useReactFlow();

  const exportImage = async () => {
    if (hasExportedRef.current) return;

    try {
      // Scope the query within this chart's container
      const viewport = containerRef.current?.querySelector(
        ".react-flow__viewport"
      );

      if (!viewport) throw new Error("ReactFlow viewport not found");

      const nodes = getNodes();
      const nodesBounds = getNodesBounds(nodes);

      const padding = 50;
      const imageWidth = nodesBounds.width + padding * 2;
      const imageHeight = nodesBounds.height + padding * 2;
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
        pixelRatio: 2,
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
    const timer = setTimeout(() => {
      fitView({ padding: 0.2 });
      exportImage();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef} // bind ref here
      style={{ width: "100%", height: "100%" }}
    >
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
