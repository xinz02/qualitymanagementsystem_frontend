// MechanismNode.tsx
import CustomNodeBase from "./customnode";
import { NodeProps } from "@xyflow/react";

// export function MechanismNode({ id }: { id: string }) {
//   return <CustomNodeBase id={id} hasLabel={true} labelText="MEKANISME" />;
// }

export function MechanismNode(props: NodeProps) {
  return (
    <CustomNodeBase
      id={props.id}
      hasLabel={true}
      data={props.data}
      labelText="MEKANISME"
      selected={props.selected}
      width={props.width}
      height={props.height}
    />
  );
}
