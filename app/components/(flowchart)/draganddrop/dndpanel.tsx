// import React from "react";

// const DnDPanel = () => {
//   return (
//     <div className="w-200">
//       <div className="p-2">DnDPanel</div>
//       <div className="w-full flex justify-between pb-2">
//         {/* Process Node */}
//         <div className="tooltip" data-tip="Process Node">
//           <div className="h-16 w-28 border-1 rounded-xl bg-white text-center p-2 hover:cursor-grab active:cursor-grabbing flex items-center justify-center">
//             Process Node
//           </div>
//         </div>

//         {/* Input Node */}
//         <div className="tooltip" data-tip="Input Node">
//           <div className="h-16 w-28 border-1 rounded-xl bg-white text-center p-2 hover:cursor-grab active:cursor-grabbing flex items-center justify-center">
//             {" "}
//             Input Node
//           </div>
//         </div>

//         {/* Output Node */}
//         <div className="tooltip" data-tip="Output Node">
//           <div className="h-16 w-28 border-1 rounded-xl bg-white text-center p-2 hover:cursor-grab active:cursor-grabbing flex items-center justify-center">
//             {" "}
//             Output Node
//           </div>
//         </div>

//         {/* Output/Input Node */}
//         <div className="tooltip" data-tip="Output/Input Node">
//           <div className="h-16 w-28 border-1 rounded-xl bg-white text-center p-2 hover:cursor-grab active:cursor-grabbing flex items-center justify-center">
//             {" "}
//             Output/Input Node
//           </div>
//         </div>

//         {/* Mechanism Node */}
//         <div className="tooltip" data-tip="Mechanism Node">
//           <div className="h-16 w-28 border-1 rounded-xl bg-white text-center p-2 hover:cursor-grab active:cursor-grabbing flex items-center justify-center">
//             {" "}
//             Mekanisme Node
//           </div>
//         </div>

//         {/* Control Node */}
//         <div className="tooltip" data-tip="Control Node">
//           <div className="h-16 w-28 border-1 rounded-xl bg-white text-center p-2 hover:cursor-grab active:cursor-grabbing flex items-center justify-center">
//             {" "}
//             Kawalan Node
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DnDPanel;

import React from "react";
import { useDnD } from "./DnDContext";

const DnDPanel = () => {
  const [_, setType] = useDnD();

  const onDragStart = (event: any, nodeType: any) => {
    if (setType) {
      setType(nodeType);
    }
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-200">
      <div className="w-full flex flex-wrap justify-between pb-2">
        <div className="tooltip" data-tip="Process Node">
          <div
            className="h-16 w-28 border-1 rounded-xl bg-white text-center p-2 flex items-center justify-center hover:cursor-grab active:cursor-grabbing"
            onDragStart={(event) => onDragStart(event, "process")}
            draggable
          >
            Node Proses
          </div>
        </div>

        <div className="tooltip" data-tip="Input Node">
          <div
            className="h-16 w-28 border-1 rounded-xl bg-white text-center p-2 flex items-center justify-center hover:cursor-grab active:cursor-grabbing"
            onDragStart={(event) => onDragStart(event, "inputNode")}
            draggable
          >
            Node Input
          </div>
        </div>

        <div className="tooltip" data-tip="Output Node">
          <div
            className="h-16 w-28 border-1 rounded-xl bg-white text-center p-2 flex items-center justify-center hover:cursor-grab active:cursor-grabbing"
            onDragStart={(event) => onDragStart(event, "outputNode")}
            draggable
          >
            Node Output
          </div>
        </div>

        <div className="tooltip" data-tip="Output/Input Node">
          <div
            className="h-16 w-28 border-1 rounded-xl bg-white text-center p-2 flex items-center justify-center hover:cursor-grab active:cursor-grabbing"
            onDragStart={(event) => onDragStart(event, "outputinput")}
            draggable
          >
            Node Output/Input
          </div>
        </div>

        <div className="tooltip" data-tip="Mechanism Node">
          <div
            className="h-16 w-28 border-1 rounded-xl bg-white text-center p-2 flex items-center justify-center hover:cursor-grab active:cursor-grabbing"
            onDragStart={(event) => onDragStart(event, "mechanism")}
            draggable
          >
            Node Mekanisme
          </div>
        </div>

        <div className="tooltip" data-tip="Control Node">
          <div
            className="h-16 w-28 border-1 rounded-xl bg-white text-center p-2 flex items-center justify-center hover:cursor-grab active:cursor-grabbing"
            onDragStart={(event) => onDragStart(event, "controlNode")}
            draggable
          >
            Node Kawalan
          </div>
        </div>
      </div>
    </div>
  );
};

export default DnDPanel;
