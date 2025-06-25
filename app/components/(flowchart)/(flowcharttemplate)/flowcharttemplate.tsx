import React from "react";
import { useCallback, useRef } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
  MarkerType,
  Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { ProcessNode } from "../(node)/processnode";
import { MechanismNode } from "../(node)/mechanismnode";
import { InputNode } from "../(node)/inputnode";
import { ControlNode } from "../(node)/controlnode";
import { OutputInputNode } from "../(node)/outputinputnode";
import { OutputNode } from "../(node)/outputnode";
import DnDPanel from "../draganddrop/dndpanel";
import { DnDProvider, useDnD } from "../draganddrop/DnDContext";
import { FlowChartData } from "@/app/interface/FlowChartData";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

interface FlowChartTemplateComponentsProps {
  flowChartId: string;
  value: FlowChartData;
  onChange: (data: FlowChartData) => void;
  onNodeSelect?: (node: Node) => void; // <--- NEW
}

const FlowChartTemplateComponents = ({
  flowChartId,
  value,
  onChange,
  onNodeSelect,
}: FlowChartTemplateComponentsProps) => {
  const getId = () => `node_${uuidv4()}`;

  const nodeTypes = {
    process: ProcessNode,
    mechanism: MechanismNode,
    inputNode: InputNode,
    controlNode: ControlNode,
    outputNode: OutputNode,
    outputinput: OutputInputNode,
  };

  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [type, setType] = useDnD();

  const [nodes, setNodes, onNodesChange] = useNodesState(value.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(value.edges || []);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  // const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFileData[]>([]);

  useEffect(() => {
    onChange({
      ...value,
      nodes,
      edges,
    });
  }, [nodes, edges]);

  useEffect(() => {
    setNodes((prev) => (prev.length === 0 ? value.nodes || [] : prev));
    setEdges((prev) => (prev.length === 0 ? value.edges || [] : prev));
  }, []);

  const onConnect = useCallback((params: any) => {
    const updatedParams = {
      ...params,
      type: "step",
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 15,
        height: 15,
        color: "#FF0000",
      },
      style: {
        strokeWidth: 1.5,
        stroke: "#FF0000",
      },
    };
    setEdges((eds) => addEdge(updatedParams, eds));
  }, []);

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      if (!type) return;
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type: type as unknown as string,
        position,
        data: {
          label: `${type} node`,
          content: "",
          flowChartId: flowChartId,
          flowChart: value.id,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  const onDragStart: React.DragEventHandler<HTMLDivElement> = (event) => {
    const nodeType = (event.target as HTMLDivElement).dataset.nodeType;
    if (nodeType && setType) setType(nodeType);
    event.dataTransfer.setData("text/plain", nodeType || "");
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div>
      <DnDPanel />

      <div className="h-150 w-full border-1" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          fitView
          zoomOnDoubleClick={false}
          onNodeDoubleClick={(_, node) => {
            if (node.type === "process") {
              setSelectedNode(node);
              onNodeSelect?.(node);
              console.log("selectedNode: ", selectedNode);
              (
                document.getElementById(
                  "upload_file_modal"
                ) as HTMLDialogElement
              )?.showModal();
            }
          }}
        >
          <Controls />
          <MiniMap pannable />
          <Background bgColor="#f9f9f9" />
        </ReactFlow>
      </div>
    </div>
  );
};

const FlowChartTemplate = ({
  flowChartId,
  value,
  onChange,
  onNodeSelect,
}: FlowChartTemplateComponentsProps) => {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <FlowChartTemplateComponents
          flowChartId={flowChartId}
          value={value}
          onChange={onChange}
          onNodeSelect={onNodeSelect} // <--- NEW
        />
      </DnDProvider>
    </ReactFlowProvider>
  );
};

export default FlowChartTemplate;
