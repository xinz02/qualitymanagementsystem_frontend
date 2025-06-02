import React from "react";
import { useCallback, useState } from "react";
import { Handle, Position, PanelPosition, useConnection } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// type ProcessDocument = {
//   id: string;
//   name: string;
//   description: string;
// };

// export function ProcessNode() {
//   // const onChange = useCallback((evt: any) => {
//   //     console.log(evt.target.value);
//   //   }, []);

//   return (
//     <div className="react-flow__node-default ">
//       <div
//       className="flex items-center justify-center"
//       style={{
//         ["fieldSizing" as any]: "content",
//       }}
//       >
//         {/* <input id="text" name="text" className="nodrag" />
//         <input
//           type="text"
//           placeholder="Type here"
//           className="input w-full h-full text-balance nodrag"
//         /> */}
//         <textarea
//           name="textarea"
//           id=""
//           style={{
//             ["fieldSizing" as any]: "content",
//             minHeight: "10px",
//             maxHeight: "150px",
//             minWidth: "100px",
//             maxWidth: "120px",
//             textAlign: "center",
//             // border: "1px solid black",
//           }}
//           className="min-h-[200px] min-w-[200px] text-balance nodrag"
//         ></textarea>
//         <Handle type="source" position={Position.Right}/>
//       </div>

//     </div>
//   );
// }

// export function ProcessNode({ id }: { id: string }) {
//   return (
//     <div className="react-flow__node-default">
//       <div className="flex items-center justify-center">
//         <textarea
//           className="min-h-[200px] min-w-[200px] text-balance nodrag"
//           style={{
//             minHeight: "10px",
//             maxHeight: "150px",
//             minWidth: "100px",
//             maxWidth: "120px",
//             textAlign: "center",
//           }}
//         />
//       </div>

//       {/* Left side - both source and target */}
//       <Handle id={`left-source-${id}`} type="source" position={Position.Left} />
//       {/* <Handle id={`left-target-${id}`} type="target" position={Position.Left} /> */}

//       {/* Right side - both source and target */}
//       <Handle id={`right-source-${id}`} type="source" position={Position.Right} />
//       <Handle id={`right-target-${id}`} type="target" position={Position.Right} />

//       {/* Top side - both source and target */}
//       <Handle id={`top-source-${id}`} type="source" position={Position.Top} />
//       <Handle id={`top-target-${id}`} type="target" position={Position.Top} />

//       {/* Bottom side - both source and target */}
//       <Handle id={`bottom-source-${id}`} type="source" position={Position.Bottom} />
//       <Handle id={`bottom-target-${id}`} type="target" position={Position.Bottom} />
//     </div>
//   );
// }

// export function ProcessNode({ id }: { id: any }) {
//   const [focused, setFocused] = useState(false);

//   const connection = useConnection();

//   const isTarget = connection.inProgress && connection.fromNode.id !== id;

//   // const label = isTarget ? 'Drop here' : 'Drag to connect';
// // react-flow__node-default
//   return (
//     <div className=" bg-white border-1 p-4 rounded-xl hover:shadow-[0_1px_4px_1px_rgba(0,0,0,0.08)]"
//     style={{
//       border: focused ? "2px solid #555" : "1px solid #000",
//     }}>
//       <div
//         className="flex items-center justify-center h-auto w-auto"
//         style={{
//           ["fieldSizing" as any]: "content",

//         }}
//       >
//         {!connection.inProgress && (
//           <>
//             <Handle
//               id={`top-source-${id}`}
//               className="customHandle"
//               position={Position.Top}
//               type="source"
//             />
//             <Handle
//               id={`bottom-source-${id}`}
//               className="customHandle"
//               position={Position.Bottom}
//               type="source"
//             />
//             <Handle
//               id={`right-source-${id}`}
//               className="customHandle"
//               position={Position.Right}
//               type="source"
//             />
//             <Handle
//               id={`left-source-${id}`}
//               className="customHandle"
//               position={Position.Left}
//               type="source"
//             />
//           </>
//         )}
//         {/* We want to disable the target handle, if the connection was started from this node */}
//         {(!connection.inProgress || isTarget) && (
//           <>
//             <Handle
//               id={`left-target-${id}`}
//               className="customHandle"
//               position={Position.Left}
//               type="target"
//               isConnectableStart={false}
//             />
//             <Handle
//               id={`right-target-${id}`}
//               className="customHandle"
//               position={Position.Right}
//               type="target"
//               isConnectableStart={false}
//             />
//             <Handle
//               id={`top-target-${id}`}
//               className="customHandle"
//               position={Position.Top}
//               type="target"
//               isConnectableStart={false}
//             />
//             <Handle
//               id={`bottom-target-${id}`}
//               className="customHandle"
//               position={Position.Bottom}
//               type="target"
//               isConnectableStart={false}
//               style={{}}
//             />
//           </>
//         )}
//         <textarea
//           name="textarea"
//           id=""
//           style={{
//             // ["fieldSizin g" as any]: "content",
//             overflow: "auto",
//             resize: "both",
//             minHeight: "10px",
//             // maxHeight: "150px",
//             minWidth: "100px",
//             // maxWidth: "120px",
//             textAlign: "center",
//             // border: "1px solid black",
//           }}
//           className="text-balance nodrag"
//           onFocus={() => setFocused(true)}
//           onBlur={() => setFocused(false)}
//         ></textarea>
//         {/* <Handle type="source" position={Position.Right}/> */}
//       </div>
//     </div>
//   );
// }

// ProcessNode.tsx
import CustomNodeBase from "./customnode";
import { NodeProps } from "@xyflow/react";

export function ProcessNode(props: NodeProps) {
  return (
    <>
      {/* <NodeResizer minWidth={100} minHeight={30} /> */}
      {/* <NodeResizer
        color="#ff0071"
        isVisible={props.selected}
        minWidth={100}
        minHeight={30}
      /> */}
      <CustomNodeBase
        id={props.id}
        data={props.data}
        hasLabel={false}
        selected={props.selected}
        width={props.width}
        height={props.height}
      />
    </>
  );
}
