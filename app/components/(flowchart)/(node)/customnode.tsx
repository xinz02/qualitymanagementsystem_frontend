// CustomNodeBase.tsx
import {
  Handle,
  Position,
  useConnection,
  useReactFlow,
  useUpdateNodeInternals,
  NodeResizer,
} from "@xyflow/react";
import { useState } from "react";

type CustomNodeProps = {
  id: string;
  hasLabel?: boolean;
  labelText?: string;
  data?: any;
  selected: any;
  width: any;
  height: any;
};

export default function CustomNodeBase({
  id,
  hasLabel = false,
  labelText,
  data,
  selected,
  width,
  height,
}: CustomNodeProps) {
  const [focused, setFocused] = useState(false);
  const connection = useConnection();

  const isTarget = connection.inProgress && connection.fromNode.id !== id;

  const { setNodes } = useReactFlow(); // get setter from React Flow
  const updateNodeInternals = useUpdateNodeInternals();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;

    // Update content in the node's data
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, content: newContent } }
          : node
      )
    );

    // Optional: If node size/handles change, inform React Flow to re-render connections
    updateNodeInternals(id);
  };

  return (
    <>
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        // minWidth={width}
        // minHeight={height}
        minWidth={150}
        minHeight={65}
        onResizeEnd={(event, params: { width: any; height: any }) => {
          try {
            setNodes((nds) =>
              nds.map((node) =>
                node.id === id
                  ? {
                      ...node,
                      width: params.width,
                      height: params.height,

                      style: {
                        ...node.style,
                        width: params.width,
                        height: params.height,
                      },
                    }
                  : node
              )
            );
          } catch (error) {
            console.error("Resize error:", error);
          }
        }}
      />
      <div //hover:shadow-[0_1px_4px_1px_rgba(0,0,0,0.08)]
        className="bg-white w-full h-full px-2 py-3 rounded-xl shadow-[0_1px_4px_1px_rgba(0,0,0,0.08)]"
        style={{
          width: width,
          height: height,
          minWidth: "150px",
          minHeight: "65px",
          border: focused
            ? "2px solid #555" // If focused
            : hasLabel
            ? "transparent" // If hasLabel is true
            : "1px solid #000", // If !hasLabel
        }}
      >
        <div className="flex flex-col items-center justify-center h-full">
          {hasLabel && <div className="font-bold text-[12px]">{labelText}</div>}

          {/* All Handles */}
          {!connection.inProgress && (
            <>
              <Handle
                id={`top-source-${id}`}
                className="customHandle"
                position={Position.Top}
                type="source"
              />
              <Handle
                id={`bottom-source-${id}`}
                className="customHandle"
                position={Position.Bottom}
                type="source"
              />
              <Handle
                id={`right-source-${id}`}
                className="customHandle"
                position={Position.Right}
                type="source"
              />
              <Handle
                id={`left-source-${id}`}
                className="customHandle"
                position={Position.Left}
                type="source"
              />
            </>
          )}

          {(!connection.inProgress || isTarget) && (
            <>
              <Handle
                id={`left-target-${id}`}
                className="customHandle"
                position={Position.Left}
                type="target"
                isConnectableStart={false}
              />
              <Handle
                id={`right-target-${id}`}
                className="customHandle"
                position={Position.Right}
                type="target"
                isConnectableStart={false}
              />
              <Handle
                id={`top-target-${id}`}
                className="customHandle"
                position={Position.Top}
                type="target"
                isConnectableStart={false}
              />
              <Handle
                id={`bottom-target-${id}`}
                className="customHandle"
                position={Position.Bottom}
                type="target"
                isConnectableStart={false}
              />
            </>
          )}

          <textarea
            className="text-balance nodrag text-center "
            style={{
              overflow: "none",
              width: "100%",
              height: "100%",
              resize: "none",
              alignContent: "center",
              fontSize: "12px",
              color: hasLabel ? "#656565" : "#000",
            }}
            value={data?.content || ""}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
      </div>
    </>
  );
}
