import CustomNodeBase from "./customnode";
import { NodeProps } from "@xyflow/react";

// export function OutputNode({ id }: { id: string }) {
//   return <CustomNodeBase id={id} hasLabel={true} labelText="OUTPUT" />;
// }

export function OutputNode(props: NodeProps) {
  return (
    <CustomNodeBase
      id={props.id}
      hasLabel={true}
      data={props.data}
      labelText="OUTPUT"
      selected={props.selected}
      width={props.width}
      height={props.height}
    />
  );
}
