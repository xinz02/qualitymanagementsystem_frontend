"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import "./styles.css";
import { JSX } from "react";
import FlowChartExport from "../components/(pdf)/flowchartexport";

export default function ProcedureAutoSplit() {
  // const sourceRef = useRef<HTMLDivElement>(null);
  // const [pages, setPages] = useState<JSX.Element[]>([]);

  // useEffect(() => {
  //   if (!sourceRef.current) return;

  //   const container = sourceRef.current;
  //   const items = Array.from(container.children) as HTMLElement[];
  //   const pageHeight = 1122; // 297mm in pixels at 96dpi

  //   let currentPage: HTMLElement[] = [];
  //   let currentHeight = 0;
  //   const allPages: JSX.Element[] = [];

  //   items.forEach((item, index) => {
  //     const itemHeight = item.offsetHeight;

  //     if (currentHeight + itemHeight > pageHeight) {
  //       allPages.push(
  //         <div key={`page-${allPages.length}`} className="page">
  //           {currentPage.map((el, idx) => (
  //             <div
  //               key={idx}
  //               dangerouslySetInnerHTML={{ __html: el.outerHTML }}
  //             />
  //           ))}
  //         </div>
  //       );
  //       currentPage = [item];
  //       currentHeight = itemHeight;
  //     } else {
  //       currentPage.push(item);
  //       currentHeight += itemHeight;
  //     }
  //   });

  //   if (currentPage.length > 0) {
  //     allPages.push(
  //       <div key={`page-${allPages.length}`} className="page">
  //         {currentPage.map((el, idx) => (
  //           <div key={idx} dangerouslySetInnerHTML={{ __html: el.outerHTML }} />
  //         ))}
  //       </div>
  //     );
  //   }

  //   setPages(allPages);
  // }, []);

  // return (
  //   <>
  //     {/* Hidden source content */}
  //     <div
  //       ref={sourceRef}
  //       style={{ visibility: "hidden", position: "absolute", top: 0, left: 0 }}
  //     >
  //       {Array.from({ length: 80 }, (_, i) => (
  //         <div className="section" key={i}>
  //           <h3>Section {i + 1}</h3>
  //           <p>
  //             Ini adalah contoh kandungan untuk prosedur. Setiap bahagian akan
  //             diukur dan dibahagikan ke dalam halaman secara automatik.
  //           </p>
  //         </div>
  //       ))}
  //     </div>

  //     {/* Rendered pages */}
  //     <div className="document-container">{pages}</div>
  //   </>
  // );

  const [flowImages, setFlowImages] = useState<
    { id: string; title: string; image: string }[]
  >([]);

  const onImagesReadyFunc = useCallback((images: any[]) => {
    setFlowImages(images); // or whatever you do
  }, []);

  const flowCharts = {
    mainFlowChart: {
      id: "mainflow",
      title: "Main Flow Chart",
      nodes: [
        {
          id: "dndnode_0",
          type: "process",
          position: {
            x: 546.0119938964843,
            y: 296.5249938964844,
          },
          measured: {
            width: 193,
            height: 86,
          },
          data: {
            label: "process node",
          },
        },
        {
          id: "dndnode_1",
          type: "inputNode",
          position: {
            x: 327.71199084472653,
            y: 290.2874927520752,
          },
          measured: {
            width: 174,
            height: 98,
          },
          data: {
            label: "inputNode node",
          },
        },
      ],
      edges: [
        {
          id: "xy-edge__dndnode_1right-source-dndnode_1-dndnode_0left-target-dndnode_0",
          source: "dndnode_1",
          sourceHandle: "right-source-dndnode_1",
          target: "dndnode_0",
          targetHandle: "left-target-dndnode_0",
          type: "step",
          // "markerEnd": {
          //   "color": "#b1b1b7",
          //   "type": "arrowclosed"
          // }
        },
      ],
    },
    subFlowCharts: [
      {
        id: "subflow_0",
        title: "8.1 abc",
        nodes: [
          {
            id: "dndnode_0",
            type: "process",
            position: {
              x: 610.0673821259659,
              y: 297.4398247460284,
            },
            measured: {
              width: 164,
              height: 78,
            },
            data: {
              label: "process node",
            },
          },
          {
            id: "dndnode_2",
            type: "outputNode",
            position: {
              x: 830.5110862398544,
              y: 284.64134703773084,
            },
            measured: {
              width: 162,
              height: 85,
            },
            data: {
              label: "outputNode node",
            },
          },
          {
            id: "dndnode_3",
            type: "inputNode",
            position: {
              x: 337.78253189332054,
              y: 285.53710038547683,
            },
            measured: {
              width: 168,
              height: 84,
            },
            data: {
              label: "inputNode node",
            },
          },
        ],
        edges: [
          {
            id: "xy-edge__dndnode_3right-source-dndnode_3-dndnode_0left-target-dndnode_0",
            source: "dndnode_3",
            sourceHandle: "right-source-dndnode_3",
            target: "dndnode_0",
            targetHandle: "left-target-dndnode_0",
            type: "step",
            // "markerEnd": {
            //   "color": "#b1b1b7",
            //   "type": "arrowclosed"
            // }
          },
          {
            id: "xy-edge__dndnode_0right-source-dndnode_0-dndnode_2left-target-dndnode_2",
            source: "dndnode_0",
            sourceHandle: "right-source-dndnode_0",
            target: "dndnode_2",
            targetHandle: "left-target-dndnode_2",
            type: "step",
            // "markerEnd": {
            //   "color": "#b1b1b7",
            //   "type": "arrowclosed"
            // }
          },
        ],
      },
    ],
  };

  // const [flowImages, setFlowImages] = useState<
  //   { id: string; title: string; image: string }[]
  // >([]);

  // if (flowImages.length === 0) {
  //   return (
  //     // <FlowChartExport flowCharts={flowCharts} onImagesReady={setFlowImages} />
  //   );
  // }

  return (
    <>
      <div className="pb-2 font-semibold">FlowChart</div>
      {flowImages.map((img) => (
        <img src={img.image} style={{ width: 500, height: "auto" }} />
      ))}
      {/* <FlowChartExport
        flowCharts={flowCharts}
        onImagesReady={onImagesReadyFunc}
      /> */}
    </>
  );
}
