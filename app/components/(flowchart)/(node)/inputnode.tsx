import CustomNodeBase from "./customnode";
import { NodeProps } from "@xyflow/react";

// export function InputNode({ id }: { id: string }) {
//   return <CustomNodeBase id={id} hasLabel={true} labelText="INPUT" />;
// }

export function InputNode(props: NodeProps) {
  return (
    <CustomNodeBase
      id={props.id}
      hasLabel={true}
      data={props.data}
      labelText="INPUT"
      selected={props.selected}
      width={props.width}
      height={props.height}
    />
  );
}
