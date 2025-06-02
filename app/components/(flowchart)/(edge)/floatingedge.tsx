import { BaseEdge, getStraightPath, useInternalNode } from '@xyflow/react';
import { EdgeProps } from '@xyflow/react';

import { getEdgeParams } from './utils';

// function FloatingEdge({ id, source, target, markerEnd, style } : {id: any, source: any, target: any, markerEnd: any, style: any}) {
//   const sourceNode = useInternalNode(source);
//   const targetNode = useInternalNode(target);

//   if (!sourceNode || !targetNode) {
//     return null;
//   }

//   const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

//   const [path] = getStraightPath({
//     sourceX: sx,
//     sourceY: sy,
//     targetX: tx,
//     targetY: ty,
//   });

//   return (
//     <BaseEdge
//       id={id}
//       className="react-flow__edge-path"
//       path={path}
//       markerEnd={markerEnd}
//       style={style}
//     />
//   );
// }

// export default FloatingEdge;
function FloatingEdge({ id, source, target, markerEnd, style } : EdgeProps) {
    const sourceNode = useInternalNode(source);
    const targetNode = useInternalNode(target);
  
    if (!sourceNode || !targetNode) {
      return null;
    }
  
    const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);
  
    const [path] = getStraightPath({
      sourceX: sx,
      sourceY: sy,
      targetX: tx,
      targetY: ty,
    });
  
    return (
      <BaseEdge
        id={id}
        className="react-flow__edge-path"
        path={path}
        markerEnd={markerEnd}
        style={style}
      />
    );
  }
  
  export default FloatingEdge;


// import {
//     BaseEdge,
//     getStraightPath,
//     EdgeProps,
//     useReactFlow,
//   } from "@xyflow/react";
  
//   import { getEdgeParams } from "./utils";
  
//   function FloatingEdge({
//     id,
//     source,
//     target,
//     markerEnd,
//     style,
//   }: EdgeProps) {
//     const { getNode } = useReactFlow();
  
//     const sourceNode = getNode(source);
//     const targetNode = getNode(target);
  
//     if (!sourceNode || !targetNode) {
//       return null;
//     }
  
//     const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);
  
//     const [path] = getStraightPath({
//       sourceX: sx,
//       sourceY: sy,
//       targetX: tx,
//       targetY: ty,
//     });
  
//     return (
//       <BaseEdge
//         id={id}
//         path={path}
//         markerEnd={markerEnd}
//         style={style}
//       />
//     );
//   }
  
//   export default FloatingEdge;
  