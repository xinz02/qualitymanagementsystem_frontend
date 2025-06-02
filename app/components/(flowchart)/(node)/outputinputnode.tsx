import CustomNodeBase from "./customnode";
import { NodeProps } from "@xyflow/react";

// export function OutputInputNode({ id }: { id: string }) {
//   return <CustomNodeBase id={id} hasLabel={true} labelText="OUTPUT / INPUT" />;
// }

export function OutputInputNode(props: NodeProps) {
  return (
    <CustomNodeBase
      id={props.id}
      hasLabel={true}
      data={props.data}
      labelText="OUTPUT / INPUT"
      selected={props.selected}
      width={props.width}
      height={props.height}
    />
  );
}
