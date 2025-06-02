import React from 'react';
import { getStraightPath } from '@xyflow/react';
import { ConnectionLineComponentProps } from '@xyflow/react';

// function CustomConnectionLine({ fromX, fromY, toX, toY, connectionLineStyle }: {fromX: any, fromY: any, toX: any, toY: any, connectionLineStyle: any}) {
//   const [edgePath] = getStraightPath({
//     sourceX: fromX,
//     sourceY: fromY,
//     targetX: toX,
//     targetY: toY,
//   });

//   return (
//     <g>
//       <path style={connectionLineStyle} fill="none" d={edgePath} />
//     </g>
//   );
// }

// export default CustomConnectionLine;

function CustomConnectionLine({ fromX, fromY, toX, toY, connectionLineStyle }: ConnectionLineComponentProps) {
    const [edgePath] = getStraightPath({
      sourceX: fromX,
      sourceY: fromY,
      targetX: toX,
      targetY: toY,
    });
  
    return (
      <g>
        <path style={connectionLineStyle} fill="none" d={edgePath} />
      </g>
    );
  }
  
  export default CustomConnectionLine;


// import React from 'react';
// import { getStraightPath, ConnectionLineComponentProps } from '@xyflow/react';

// function CustomConnectionLine({
//   fromX,
//   fromY,
//   toX,
//   toY,
//   connectionLineStyle,
// }: ConnectionLineComponentProps<any>) {
//   const [edgePath] = getStraightPath({
//     sourceX: fromX,
//     sourceY: fromY,
//     targetX: toX,
//     targetY: toY,
//   });

//   return (
//     <g>
//       <path style={connectionLineStyle} fill="none" d={edgePath} />
//     </g>
//   );
// }

// export default CustomConnectionLine;
