import CustomNodeBase from "./customnode";
import { NodeProps } from "@xyflow/react";

// export function ControlNode({ id }: { id: string }) {
//   return <CustomNodeBase id={id} hasLabel={true} labelText="KAWALAN" />;
// }

export function ControlNode(props: NodeProps) {
  return (
    <CustomNodeBase
      id={props.id}
      hasLabel={true}
      data={props.data}
      labelText="KAWALAN"
      selected={props.selected}
      width={props.width}
      height={props.height}
    />
  );
}
