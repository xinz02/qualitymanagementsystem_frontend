import React from "react";
import { useCallback, useRef } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  Panel,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
  Edge,
  Node,
  ReactFlowInstance,
  MarkerType,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { ProcessNode } from "../(node)/processnode";
// import FloatingEdge from "./(edge)/floatingedge";
// import CustomConnectionLine from "./(edge)/customconnectionline";
import { MechanismNode } from "../(node)/mechanismnode";
import { InputNode } from "../(node)/inputnode";
import { ControlNode } from "../(node)/controlnode";
import { OutputInputNode } from "../(node)/outputinputnode";
import { OutputNode } from "../(node)/outputnode";
import DnDPanel from "../draganddrop/dndpanel";

import { DnDProvider, useDnD } from "../draganddrop/DnDContext";
import { FlowChartData } from "@/app/interface/FlowChartData";

//  const connectionLineStyle = {
//     stroke: '#b1b1b7',
//   };

//   const edgeTypes = {
//     floating: FloatingEdge,
//   };

//   const defaultEdgeOptions = {
//     type: 'floating',
//     markerEnd: {
//       type: MarkerType.ArrowClosed,
//       color: '#b1b1b7',
//     },
//   };

//   const [nodes, setNodes] = useState(initialNodes);
//   const [edges, setEdges] = useState(initialEdges);

//   const onNodesChange = useCallback(
//     (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     []
//   );
//   const onEdgesChange = useCallback(
//     (changes: EdgeChange<any>[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     []
//   );

// const onConnect = useCallback(
//   (params: any) => setEdges((eds) => addEdge(params, eds)),
//   [setEdges],
// );

// const FlowChart = () => {
//   const nodeTypes = { process: ProcessNode, mechanism: MechanismNode };

//   const initialNodes = [
//     {
//       id: "1",
//       data: { label: "Hello" },
//       position: { x: 0, y: 0 },
//       type: "input",
//     },
//     {
//       id: "2",
//       data: { label: "World" },
//       position: { x: 100, y: 100 },
//     },
//     {
//       id: "3",
//       data: {},
//       position: { x: 150, y: 150 },
//       type: "process",
//     },
//     {
//       id: "4",
//       data: {},
//       position: { x: 200, y: 200 },
//       type: "mechanism",
//     },
//   ];

//   const initialEdges: any[] | (() => any[]) = [];

//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

//   const onConnect = useCallback((params: any) => {
//     const updatedParams = {
//       ...params,
//       type: "step", // Specify the edge type here
//       markerEnd: {
//         type: "arrowclosed", // Use 'arrow' or 'arrowclosed' for different arrow styles
//         color: "#b1b1b7",
//       },
//     };
//     setEdges((eds) => addEdge(updatedParams, eds));
//   }, []);

//   return (
//     <>
//       <div>FlowChart</div>
//       <div className="h-150 w-full border-1">
//         <ReactFlow
//           nodes={nodes}
//           nodeTypes={nodeTypes}
//           onNodesChange={onNodesChange}
//           edges={edges}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           fitView
//           connectionRadius={20}
//           // edgeTypes={edgeTypes}
//           // defaultEdgeOptions={defaultEdgeOptions}
//           // connectionLineComponent={CustomConnectionLine}
//           // connectionLineStyle={connectionLineStyle}
//         >
//           <Panel position="top-left" className="px-5 py-2 bg-white shadow-md">
//            <DnDPanel />
//           </Panel>

//           <Controls />
//           <MiniMap />
//           <Background bgColor="#f9f9f9" />
//         </ReactFlow>
//       </div>
//     </>
//   );
// };

// export default FlowChart;

// import DropHandler from "./drophandler";

//! ver 2
// type FlowChartTemplateProps = {
//   onProcessNodeCreated?: (nodeId: string, title: string) => void;
// };

// const FlowChartTemplateComponents = ({
//   onProcessNodeCreated
// }: FlowChartTemplateProps) => {
//   const idRef = useRef(0);
//   const getId = () => `dndnode_${idRef.current++}`;

//   const nodeTypes = {
//     process: ProcessNode,
//     mechanism: MechanismNode,
//     inputNode: InputNode,
//     control: ControlNode,
//     outputNode: OutputNode,
//     outputinput: OutputInputNode,
//   };
//   // const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
//   const reactFlowWrapper = useRef(null);
//   const { screenToFlowPosition } = useReactFlow();
//   const [type, setType] = useDnD();

//   const initialNodes: any[] = [];
//   const initialEdges: any[] = [];

//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

//   const onConnect = useCallback((params: any) => {
//     const updatedParams = {
//       ...params,
//       type: "step",
//       markerEnd: {
//         type: "arrowclosed",
//         color: "#b1b1b7",
//       },
//     };
//     setEdges((eds) => addEdge(updatedParams, eds));
//   }, []);

//   const onDragOver = useCallback((event: any) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = "move";
//   }, []);

//   const onDrop = useCallback(
//     (event: any) => {
//       event.preventDefault();

//       // check if the dropped element is valid
//       if (!type) {
//         return;
//       }

//       const position = screenToFlowPosition({
//         x: event.clientX,
//         y: event.clientY,
//       });
//       const newNode = {
//         id: getId(),
//         type,
//         position,
//         data: {
//           label: `${type} node`,
//           onProcessNodeCreated: onProcessNodeCreated,
//         },
//       };

//       setNodes((nds) => nds.concat(newNode));
//       console.log("New node created:", newNode);
//     },
//     [screenToFlowPosition, type]
//   );

//   // const onDrop = useCallback(
//   //   (event: any) => {
//   //     event.preventDefault();
//   //     const nodeType = event.dataTransfer.getData('text/plain');
//   //     if (!nodeType) return;

//   //     const position = screenToFlowPosition({
//   //       x: event.clientX,
//   //       y: event.clientY,
//   //     });

//   //     const newNode = {
//   //       id: getId(),
//   //       type: nodeType,
//   //       position,
//   //       data: { label: `${nodeType} node` },
//   //     };

//   //     setNodes((nds) => nds.concat(newNode));
//   //   },
//   //   [screenToFlowPosition]
//   // );

//   const onDragStart: React.DragEventHandler<HTMLDivElement> = (event) => {
//     const nodeType = (event.target as HTMLDivElement).dataset.nodeType;
//     if (nodeType && setType) {
//       setType(nodeType);
//     }
//     event.dataTransfer.setData("text/plain", nodeType || "");
//     event.dataTransfer.effectAllowed = "move";
//   };

//   // const onDragStart = (event: any, nodeType: any) => {
//   //   if (setType) {
//   //     setType(nodeType);
//   //   }
//   //   event.dataTransfer.setData("text/plain", nodeType);
//   //   event.dataTransfer.effectAllowed = "move";
//   // };

//   return (
//     <>
//       <div className="pb-1">FlowChart</div>
//       <div className="h-150 w-full border-1" ref={reactFlowWrapper}>
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           nodeTypes={nodeTypes}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           onDragStart={onDragStart}
//           onDragOver={onDragOver}
//           onDrop={onDrop}
//           fitView
//         >
//           <Panel position="top-left" className="px-5 py-2 bg-white shadow-md">
//             <DnDPanel />
//           </Panel>

//           {/* <DropHandler
//             reactFlowWrapper={reactFlowWrapper}
//             setNodes={setNodes}
//           /> */}

//           <Controls />
//           <MiniMap pannable />
//           <Background bgColor="#f9f9f9" />
//         </ReactFlow>
//       </div>
//     </>
//   );
// };

// const FlowChartTemplate = ({
//   onProcessNodeCreated,
// }: FlowChartTemplateProps) => {
//   console.log("FlowChartTemplate onProcessNodeCreated", onProcessNodeCreated);
//   return (
//     <>
//       <ReactFlowProvider>
//         <DnDProvider>
//           <FlowChartTemplateComponents
//             onProcessNodeCreated={onProcessNodeCreated}
//           />
//         </DnDProvider>
//       </ReactFlowProvider>
//     </>
//   );
// };
// export default FlowChartTemplate;
// export default () => (
//   <ReactFlowProvider>
//     <DnDProvider>
//       <FlowChartTemplate />
//     </DnDProvider>
//   </ReactFlowProvider>
// );

//! ver 3
// const FlowChartTemplateComponents = () => {
//   const idRef = useRef(0);
//   const getId = () => `dndnode_${idRef.current++}`;

//   const nodeTypes = {
//     process: ProcessNode,
//     mechanism: MechanismNode,
//     inputNode: InputNode,
//     control: ControlNode,
//     outputNode: OutputNode,
//     outputinput: OutputInputNode,
//   };

//   const reactFlowWrapper = useRef(null);
//   const { screenToFlowPosition } = useReactFlow();
//   const [type, setType] = useDnD();

//   const initialNodes: any[] = [];
//   const initialEdges: any[] = [];

//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

//   const onConnect = useCallback((params: any) => {
//     const updatedParams = {
//       ...params,
//       type: "step",
//       markerEnd: {
//         type: "arrowclosed",
//         color: "#b1b1b7",
//       },
//     };
//     setEdges((eds) => addEdge(updatedParams, eds));
//   }, []);

//   const onDragOver = useCallback((event: any) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = "move";
//   }, []);

//   const onDrop = useCallback(
//     (event: any) => {
//       event.preventDefault();

//       if (!type) {
//         return;
//       }

//       const position = screenToFlowPosition({
//         x: event.clientX,
//         y: event.clientY,
//       });
//       const newNode = {
//         id: getId(),
//         type,
//         position,
//         data: {
//           label: `${type} node`,
//         },
//       };

//       setNodes((nds) => nds.concat(newNode));
//       console.log("New node created:", newNode);
//     },
//     [screenToFlowPosition, type]
//   );

//   const onDragStart: React.DragEventHandler<HTMLDivElement> = (event) => {
//     const nodeType = (event.target as HTMLDivElement).dataset.nodeType;
//     if (nodeType && setType) {
//       setType(nodeType);
//     }
//     event.dataTransfer.setData("text/plain", nodeType || "");
//     event.dataTransfer.effectAllowed = "move";
//   };

//   return (
//     <>
//       <div className="mb-8">

//         <div className="h-150 w-full border-1" ref={reactFlowWrapper}>
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             nodeTypes={nodeTypes}
//             onNodesChange={onNodesChange}
//             onEdgesChange={onEdgesChange}
//             onConnect={onConnect}
//             onDragStart={onDragStart}
//             onDragOver={onDragOver}
//             onDrop={onDrop}
//             fitView
//           >
//             <Panel position="top-left" className="px-5 py-2 bg-white shadow-md">
//               <DnDPanel />
//             </Panel>
//             <Controls />
//             <MiniMap pannable />
//             <Background bgColor="#f9f9f9" />
//           </ReactFlow>
//         </div>
//       </div>
//     </>
//   );
// };

// const FlowChartTemplate = () => {
//   return (
//     <>
//       <ReactFlowProvider>
//         <DnDProvider>
//           <FlowChartTemplateComponents />
//         </DnDProvider>
//       </ReactFlowProvider>
//     </>
//   );
// };
// export default FlowChartTemplate;

//! ver 4
import { useEffect } from "react";

interface FlowChartTemplateComponentsProps {
  value: FlowChartData;
  onChange: (data: FlowChartData) => void;
}

const FlowChartTemplateComponents = ({
  value,
  onChange,
}: FlowChartTemplateComponentsProps) => {
  // const idRef = useRef(0);
  // const getId = () => `dndnode_${idRef.current++}`;
  const initialId = value.nodes?.length
    ? parseInt(value.nodes[value.nodes.length - 1].id.replace("dndnode_", "")) +
      1
    : 0;

  const idRef = useRef<number>(initialId);

  const getId = () => `dndnode_${idRef.current++}`;

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

  // Update parent when nodes/edges change
  useEffect(() => {
    onChange({
      ...value,
      nodes,
      edges,
    });
  }, [nodes, edges]);

  useEffect(() => {
    // Only update if initial value differs
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
      {/* <Panel position="top-left" className="px-5 py-2 bg-white shadow-md"> */}
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
          // snapToGrid
          // snapGrid={[10, 10]}
        >
          {/* <Panel position="top-left" className="px-5 py-2 bg-white shadow-md">
          <DnDPanel />
        </Panel> */}
          <Controls />
          <MiniMap pannable />
          <Background bgColor="#f9f9f9" />
        </ReactFlow>
      </div>
    </div>
  );
};

const FlowChartTemplate = ({
  value,
  onChange,
}: FlowChartTemplateComponentsProps) => {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <FlowChartTemplateComponents value={value} onChange={onChange} />
      </DnDProvider>
    </ReactFlowProvider>
  );
};

export default FlowChartTemplate;
