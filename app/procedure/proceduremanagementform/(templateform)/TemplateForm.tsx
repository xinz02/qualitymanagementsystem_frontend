import { ProcedureTemplateFormData } from "@/app/interface/ProcedureTemplateFormData";
import React from "react";
import { useState, useEffect } from "react";
import RichTextEditor from "@/app/components/(richtexteditor)/richtexteditor";
import FlowCharts from "@/app/components/(flowchart)/flowchart";
import BasicInfoTab from "./(FormTabs)/basicinfotab";
import FlowChartTab from "./(FormTabs)/flowcharttab";
import { RichTextTab } from "./(FormTabs)/richtexttabs";

interface StepFormProps {
  formData: ProcedureTemplateFormData | null;
  setFormData: React.Dispatch<
    React.SetStateAction<ProcedureTemplateFormData | null>
  >;
}

// const StepForm = ({ formData, setFormData }: StepFormProps) => {
//   // const [formData, setFormData] = useState<ProcedureTemplateFormData>({
//   //   namaDokumen: "",
//   //   nomborDokumen: "",
//   //   pindaanDokumen: [
//   //     {
//   //       pindaan: "",
//   //       tarikh: "",
//   //       butiran: "",
//   //       disediakan: "",
//   //       diluluskan: "",
//   //     },
//   //   ],
//   //   cartaFungsi: {
//   //     mainFlowChart: {
//   //       id: "",
//   //       title: "",
//   //       nodes: [],
//   //       edges: [],
//   //     },
//   //     subFlowCharts: [],
//   //   },
//   //   tujuan: "",
//   //   objektif: "",
//   //   skop: "",
//   //   terminologi: "",
//   //   singkatan: "",
//   //   rujukan: "",
//   //   prosedur: "",
//   //   rekodDanSimpanan: "",
//   //   lampiran: "",
//   // });
//   // useEffect(() => {
//   //   if (!formData) {
//   //     setFormData({
//   //       namaDokumen: "",
//   //       nomborDokumen: "",
//   //       pindaanDokumen: [
//   //         {
//   //           pindaan: "",
//   //           tarikh: "",
//   //           butiran: "",
//   //           disediakan: "",
//   //           diluluskan: "",
//   //         },
//   //       ],
//   //       cartaFungsi: {
//   //         mainFlowChart: {
//   //           id: "mainflow",
//   //           title: "Main Flow Chart",
//   //           nodes: [],
//   //           edges: [],
//   //         },
//   //         subFlowCharts: [],
//   //       },
//   //       tujuan: "",
//   //       objektif: "",
//   //       skop: "",
//   //       terminologi: "",
//   //       singkatan: "",
//   //       rujukan: "",
//   //       prosedur: "",
//   //       rekodDanSimpanan: "",
//   //       lampiran: "",
//   //     });
//   //   }
//   // }, [formData, setFormData]);
//   useEffect(() => {
//     setFormData((prev) => {
//       if (prev === null) {
//         return {
//           namaDokumen: "",
//           nomborDokumen: "",
//           pindaanDokumen: [
//             {
//               pindaan: "",
//               tarikh: "",
//               butiran: "",
//               disediakan: "",
//               diluluskan: "",
//             },
//           ],
//           cartaFungsi: {
//             mainFlowChart: {
//               id: "mainflow",
//               title: "Main Flow Chart",
//               nodes: [],
//               edges: [],
//             },
//             subFlowCharts: [],
//           },
//           tujuan: "",
//           objektif: "",
//           skop: "",
//           terminologi: "",
//           singkatan: "",
//           rujukan: "",
//           prosedur: "",
//           rekodDanSimpanan: "",
//           lampiran: "",
//         };
//       }
//       return prev;
//     });
//   }, []);

//   if (!formData) return null;

//   return (
//     <div className="my-5">
//       <div className="tabs tabs-lift">
//         {/* Tab 1 */}
//         <input
//           type="radio"
//           name="templateFormTab"
//           className="tab"
//           aria-label="Basic Info"
//           defaultChecked
//         />
//         <div className="tab-content bg-base-100 border-base-300 p-6">
//           <fieldset className="flex items-center gap-2 py-3 mr-25">
//             <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
//               Nama Dokumen:
//             </legend>
//             <input
//               type="text"
//               onChange={(e) =>
//                 setFormData({ ...formData, namaDokumen: e.target.value })
//               }
//               className="border border-gray-500 rounded-lg px-2 py-0.5 text-base w-auto flex-1"
//             />
//           </fieldset>

//           <fieldset className="flex items-center gap-2 py-3 mr-25">
//             <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
//               Nombor Dokumen:
//             </legend>
//             <input
//               type="text"
//               onChange={(e) =>
//                 setFormData({ ...formData, nomborDokumen: e.target.value })
//               }
//               className="border border-gray-500 rounded-lg px-2 py-0.5 text-base w-auto flex-1"
//             />
//           </fieldset>

//           <table className="table w-full border my-4">
//             <thead>
//               <tr className="bg-gray-100 text-sm">
//                 <th className="border px-2 py-1">Pindaan</th>
//                 <th className="border px-2 py-1">Tarikh</th>
//                 <th className="border px-2 py-1">Butiran</th>
//                 <th className="border px-2 py-1">Disediakan</th>
//                 <th className="border px-2 py-1">Diluluskan</th>
//                 <th className="border px-2 py-1">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {formData.pindaanDokumen.map((row, index) => (
//                 <tr key={index}>
//                   {(
//                     [
//                       "pindaan",
//                       "tarikh",
//                       "butiran",
//                       "disediakan",
//                       "diluluskan",
//                     ] as const
//                   ).map((field) => (
//                     <td key={field} className="border px-2 py-1">
//                       <input
//                         type="text"
//                         value={row[field]}
//                         onChange={(e) => {
//                           const updated = [...formData.pindaanDokumen];
//                           updated[index] = {
//                             ...updated[index],
//                             [field]: e.target.value,
//                           };
//                           setFormData({ ...formData, pindaanDokumen: updated });
//                         }}
//                         className="w-full px-2 py-1 border rounded text-sm"
//                       />
//                     </td>
//                   ))}
//                   <td className="border px-2 py-1 text-center">
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const updated = formData.pindaanDokumen.filter(
//                           (_, i) => i !== index
//                         );
//                         setFormData({ ...formData, pindaanDokumen: updated });
//                       }}
//                       className="text-red-600 hover:underline text-sm"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <button
//             type="button"
//             onClick={() =>
//               setFormData({
//                 ...formData,
//                 pindaanDokumen: [
//                   ...formData.pindaanDokumen,
//                   {
//                     pindaan: "",
//                     tarikh: "",
//                     butiran: "",
//                     disediakan: "",
//                     diluluskan: "",
//                   },
//                 ],
//               })
//             }
//             className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
//           >
//             + Add Row
//           </button>
//         </div>

//         {/* Tab 2 */}
//         <input
//           type="radio"
//           name="templateFormTab"
//           className="tab"
//           aria-label="Flow Chart"
//         />
//         <div className="tab-content bg-base-100 border-base-300 p-6">
//           {/* <FlowCharts
//             mainFlowChart={formData.cartaFungsi.mainFlowChart}
//             subFlowCharts={formData.cartaFungsi.subFlowCharts}
//             // onMainFlowChartChange={(newMainChart) =>
//             //   setFormData((prev) => {
//             //     if (!prev) return null;
//             //     return {
//             //       ...prev,
//             //       cartaFungsi: {
//             //         ...prev.cartaFungsi,
//             //         mainFlowChart: newMainChart,
//             //       },
//             //     };
//             //   })
//             // }
//             // onSubFlowChartsChange={(newSubCharts) =>
//             //   setFormData((prev) => {
//             //     if (!prev) return null;
//             //     return {
//             //       ...prev,
//             //       cartaFungsi: {
//             //         ...prev.cartaFungsi,
//             //         subFlowCharts: newSubCharts,
//             //       },
//             //     };
//             //   })
//             // }
//           /> */}
//           <FlowCharts
//             mainFlowChart={formData.cartaFungsi.mainFlowChart}
//             subFlowCharts={formData.cartaFungsi.subFlowCharts}
//             onMainFlowChartChange={(newMainChart) =>
//               setFormData((prev) => {
//                 if (!prev) return null;
//                 return {
//                   ...prev,
//                   cartaFungsi: {
//                     ...prev.cartaFungsi,
//                     mainFlowChart: newMainChart,
//                   },
//                 };
//               })
//             }
//             onSubFlowChartsChange={(newSubCharts) =>
//               setFormData((prev) => {
//                 if (!prev) return null;
//                 return {
//                   ...prev,
//                   cartaFungsi: {
//                     ...prev.cartaFungsi,
//                     subFlowCharts: newSubCharts,
//                   },
//                 };
//               })
//             }
//           />
//         </div>

//         {/* Tab 3 */}
//         <input
//           type="radio"
//           name="templateFormTab"
//           className="tab"
//           aria-label="Section 1"
//         />
//         <div className="tab-content bg-base-100 border-base-300 p-6">
//           <RichTextEditor
//             label="Tujuan"
//             value={formData.tujuan}
//             onChange={(val) =>
//               setFormData((prev) => {
//                 if (!prev) return null;
//                 return { ...prev, tujuan: val };
//               })
//             }
//           />
//           <RichTextEditor
//             label="Objektif"
//             value={formData.objektif}
//             onChange={(val) =>
//               setFormData((prev) => {
//                 if (!prev) return null;
//                 return { ...prev, objektif: val };
//               })
//             }
//           />
//           <RichTextEditor
//             label="Skop"
//             value={formData.skop}
//             onChange={(val) =>
//               setFormData((prev) => {
//                 if (!prev) return null;
//                 return { ...prev, skop: val };
//               })
//             }
//           />
//         </div>

//         {/* Tab 4 */}
//         <input
//           type="radio"
//           name="templateFormTab"
//           className="tab"
//           aria-label="Section 2"
//         />
//         <div className="tab-content bg-base-100 border-base-300 p-6">
//           <RichTextEditor
//             label="Terminologi"
//             value={formData.terminologi}
//             onChange={(val) =>
//               setFormData((prev) => {
//                 if (!prev) return null;
//                 return { ...prev, terminologi: val };
//               })
//             }
//           />
//           <RichTextEditor
//             label="Singkatan"
//             value={formData.singkatan}
//             onChange={(val) =>
//               setFormData((prev) => {
//                 if (!prev) return null;
//                 return { ...prev, singkatan: val };
//               })
//             }
//           />
//           <RichTextEditor
//             label="Rujukan"
//             value={formData.rujukan}
//             onChange={(val) =>
//               setFormData((prev) => {
//                 if (!prev) return null;
//                 return { ...prev, rujukan: val };
//               })
//             }
//           />
//         </div>

//         {/* Tab 5 */}
//         <input
//           type="radio"
//           name="templateFormTab"
//           className="tab"
//           aria-label="Section 3"
//         />
//         <div className="tab-content bg-base-100 border-base-300 p-6">
//           <RichTextEditor
//             label="Prosedur"
//             value={formData.prosedur}
//             height={650}
//             onChange={(val) =>
//               setFormData((prev) => {
//                 if (!prev) return null;
//                 return { ...prev, prosedur: val };
//               })
//             }
//           />
//         </div>

//         {/* Tab 6 */}
//         <input
//           type="radio"
//           name="templateFormTab"
//           className="tab"
//           aria-label="Section 4"
//         />
//         <div className="tab-content bg-base-100 border-base-300 p-6">
//           <RichTextEditor
//             label="Rekod dan Simpanan"
//             value={formData.rekodDanSimpanan}
//             onChange={(val) =>
//               setFormData((prev) => {
//                 if (!prev) return null;
//                 return { ...prev, rekodDanSimpanan: val };
//               })
//             }
//           />
//           <RichTextEditor
//             label="Lampiran"
//             value={formData.lampiran}
//             onChange={(val) =>
//               setFormData((prev) => {
//                 if (!prev) return null;
//                 return { ...prev, lampiran: val };
//               })
//             }
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StepForm;

//! ver2
// import React, { useState, useEffect, useCallback } from "react";
// import RichTextEditor from "@/app/components/(richtexteditor)/richtexteditor";
// import FlowCharts from "@/app/components/(flowchart)/flowchart";

// // Memoize the RichTextEditor to prevent unnecessary re-renders
// const MemoizedRichTextEditor = React.memo(RichTextEditor);

// const StepForm = ({ formData, setFormData }: StepFormProps) => {
//   // Local state for simple fields to prevent full form re-renders
//   const [localFormData, setLocalFormData] = useState({
//     namaDokumen: formData?.namaDokumen || "",
//     nomborDokumen: formData?.nomborDokumen || "",
//   });

//   // Update local state immediately, parent state on blur
//   const handleInputChange = useCallback(
//     (field: keyof typeof localFormData, value: string) => {
//       setLocalFormData((prev) => ({ ...prev, [field]: value }));
//     },
//     []
//   );

//   const handleInputBlur = useCallback(
//     (field: keyof typeof localFormData) => {
//       if (formData) {
//         setFormData({ ...formData, [field]: localFormData[field] });
//       }
//     },
//     [formData, localFormData, setFormData]
//   );

//   // Initialize form
//   useEffect(() => {
//     if (!formData) {
//       setFormData({
//         namaDokumen: "",
//         nomborDokumen: "",
//         pindaanDokumen: [
//           {
//             pindaan: "",
//             tarikh: "",
//             butiran: "",
//             disediakan: "",
//             diluluskan: "",
//           },
//         ],
//         cartaFungsi: {
//           mainFlowChart: {
//             id: "mainflow",
//             title: "Main Flow Chart",
//             nodes: [],
//             edges: [],
//           },
//           subFlowCharts: [],
//         },
//         tujuan: "",
//         objektif: "",
//         skop: "",
//         terminologi: "",
//         singkatan: "",
//         rujukan: "",
//         prosedur: "",
//         rekodDanSimpanan: "",
//         lampiran: "",
//       });
//     }
//   }, [formData, setFormData]);

//   // Memoize the amendment rows to prevent unnecessary re-renders
//   const AmendmentRow = React.memo(
//     ({
//       row,
//       index,
//       onChange,
//       onDelete,
//     }: {
//       row: any;
//       index: number;
//       onChange: (index: number, field: string, value: string) => void;
//       onDelete: (index: number) => void;
//     }) => {
//       return (
//         <tr>
//           {(
//             [
//               "pindaan",
//               "tarikh",
//               "butiran",
//               "disediakan",
//               "diluluskan",
//             ] as const
//           ).map((field) => (
//             <td key={field} className="border px-2 py-1">
//               <input
//                 type="text"
//                 value={row[field]}
//                 onChange={(e) => onChange(index, field, e.target.value)}
//                 className="w-full px-2 py-1 border rounded text-sm"
//               />
//             </td>
//           ))}
//           <td className="border px-2 py-1 text-center">
//             <button
//               type="button"
//               onClick={() => onDelete(index)}
//               className="text-red-600 hover:underline text-sm"
//             >
//               Delete
//             </button>
//           </td>
//         </tr>
//       );
//     }
//   );

//   if (!formData) return null;

//   return (
//     <div className="my-5">
//       <div className="tabs tabs-lift">
//         {/* Tab 1 - Optimized */}
//         <input
//           type="radio"
//           name="templateFormTab"
//           className="tab"
//           aria-label="Basic Info"
//           defaultChecked
//         />
//         <div className="tab-content bg-base-100 border-base-300 p-6">
//           <fieldset className="flex items-center gap-2 py-3 mr-25">
//             <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
//               Nama Dokumen:
//             </legend>
//             <input
//               type="text"
//               value={localFormData.namaDokumen}
//               onChange={(e) => handleInputChange("namaDokumen", e.target.value)}
//               onBlur={() => handleInputBlur("namaDokumen")}
//               className="border border-gray-500 rounded-lg px-2 py-0.5 text-base w-auto flex-1"
//             />
//           </fieldset>

//           <fieldset className="flex items-center gap-2 py-3 mr-25">
//             <legend className="fieldset-legend text-base font-semibold float-left w-auto px-1">
//               Nombor Dokumen:
//             </legend>
//             <input
//               type="text"
//               value={localFormData.nomborDokumen}
//               onChange={(e) =>
//                 handleInputChange("nomborDokumen", e.target.value)
//               }
//               onBlur={() => handleInputBlur("nomborDokumen")}
//               className="border border-gray-500 rounded-lg px-2 py-0.5 text-base w-auto flex-1"
//             />
//           </fieldset>

//           <table className="table w-full border my-4">
//             <thead>
//               <tr className="bg-gray-100 text-sm">
//                 <th className="border px-2 py-1">Pindaan</th>
//                 <th className="border px-2 py-1">Tarikh</th>
//                 <th className="border px-2 py-1">Butiran</th>
//                 <th className="border px-2 py-1">Disediakan</th>
//                 <th className="border px-2 py-1">Diluluskan</th>
//                 <th className="border px-2 py-1">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {formData.pindaanDokumen.map((row: any, index: any) => (
//                 <AmendmentRow
//                   key={index}
//                   row={row}
//                   index={index}
//                   onChange={(i, field, value) => {
//                     const updated = [...formData.pindaanDokumen];
//                     updated[i] = { ...updated[i], [field]: value };
//                     setFormData({ ...formData, pindaanDokumen: updated });
//                   }}
//                   onDelete={(i) => {
//                     const updated = formData.pindaanDokumen.filter(
//                       (_: any, idx: any) => idx !== i
//                     );
//                     setFormData({ ...formData, pindaanDokumen: updated });
//                   }}
//                 />
//               ))}
//             </tbody>
//           </table>

//           <button
//             type="button"
//             onClick={() =>
//               setFormData({
//                 ...formData,
//                 pindaanDokumen: [
//                   ...formData.pindaanDokumen,
//                   {
//                     pindaan: "",
//                     tarikh: "",
//                     butiran: "",
//                     disediakan: "",
//                     diluluskan: "",
//                   },
//                 ],
//               })
//             }
//             className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
//           >
//             + Add Row
//           </button>
//         </div>

//         {/* Tab 2 */}
//         <input
//           type="radio"
//           name="templateFormTab"
//           className="tab"
//           aria-label="Flow Chart"
//         />
//         <div className="tab-content bg-base-100 border-base-300 p-6">
//           {/* <FlowCharts
//             mainFlowChart={formData.cartaFungsi.mainFlowChart}
//             subFlowCharts={formData.cartaFungsi.subFlowCharts}
//             onMainFlowChartChange={(newMainChart) =>
//               setFormData((prev) => {
//                 if (!prev) return null;
//                 return {
//                   ...prev,
//                   cartaFungsi: {
//                     ...prev.cartaFungsi,
//                     mainFlowChart: newMainChart,
//                   },
//                 };
//               })
//             }
//             onSubFlowChartsChange={(newSubCharts) =>
//               setFormData((prev) => {
//                 if (!prev) return null;
//                 return {
//                   ...prev,
//                   cartaFungsi: {
//                     ...prev.cartaFungsi,
//                     subFlowCharts: newSubCharts,
//                   },
//                 };
//               })
//             }
//           /> */}
//         </div>

//         {/* Other tabs with memoized components */}
//         {/* Tab 3 */}
//         <input
//           type="radio"
//           name="templateFormTab"
//           className="tab"
//           aria-label="Section 1"
//         />
//         <div className="tab-content bg-base-100 border-base-300 p-6">
//           <MemoizedRichTextEditor
//             label="Tujuan"
//             value={formData.tujuan}
//             onChange={(val: any) =>
//               setFormData((prev: any) =>
//                 prev ? { ...prev, tujuan: val } : null
//               )
//             }
//           />

//           <MemoizedRichTextEditor
//             label="Objektif"
//             value={formData.objektif}
//             onChange={(val: any) =>
//               setFormData((prev: any) =>
//                 prev ? { ...prev, objektif: val } : null
//               )
//             }
//           />

//           <MemoizedRichTextEditor
//             label="Skop"
//             value={formData.skop}
//             onChange={(val: any) =>
//               setFormData((prev: any) => (prev ? { ...prev, skop: val } : null))
//             }
//           />
//         </div>

//         {/* Other tabs... */}
//         {/* Tab 4 */}
//         <input
//           type="radio"
//           name="templateFormTab"
//           className="tab"
//           aria-label="Section 2"
//         />
//         <div className="tab-content bg-base-100 border-base-300 p-6">
//           <MemoizedRichTextEditor
//             label="Terminologi"
//             value={formData.terminologi}
//             onChange={(val: any) =>
//               setFormData((prev: any) =>
//                 prev ? { ...prev, terminologi: val } : null
//               )
//             }
//           />
//           <MemoizedRichTextEditor
//             label="Singkatan"
//             value={formData.singkatan}
//             onChange={(val: any) =>
//               setFormData((prev: any) =>
//                 prev ? { ...prev, singkatan: val } : null
//               )
//             }
//           />
//           <MemoizedRichTextEditor
//             label="Rujukan"
//             value={formData.rujukan}
//             onChange={(val: any) =>
//               setFormData((prev: any) =>
//                 prev ? { ...prev, rujukan: val } : null
//               )
//             }
//           />
//         </div>

//         {/* Tab 5 */}
//         <input
//           type="radio"
//           name="templateFormTab"
//           className="tab"
//           aria-label="Section 3"
//         />
//         <div className="tab-content bg-base-100 border-base-300 p-6">
//           {/* <RichTextEditor
//             label="Prosedur"
//             value={formData.prosedur}
//             height={650}
//             onChange={(val) =>
//               setFormData((prev) => {
//                 if (!prev) return null;
//                 return { ...prev, prosedur: val };
//               })
//             }
//           /> */}

//           <MemoizedRichTextEditor
//             label="Prosedur"
//             height={650}
//             value={formData.prosedur}
//             onChange={(val: any) =>
//               setFormData((prev: any) =>
//                 prev ? { ...prev, prosedur: val } : null
//               )
//             }
//           />
//         </div>

//         {/* Tab 6 */}
//         <input
//           type="radio"
//           name="templateFormTab"
//           className="tab"
//           aria-label="Section 4"
//         />
//         <div className="tab-content bg-base-100 border-base-300 p-6">
//           <MemoizedRichTextEditor
//             label="Rekod dan Simpanan"
//             value={formData.rekodDanSimpanan}
//             onChange={(val: any) =>
//               setFormData((prev: any) =>
//                 prev ? { ...prev, rekodDanSimpanan: val } : null
//               )
//             }
//           />
//           <MemoizedRichTextEditor
//             label="Lampiran"
//             value={formData.lampiran}
//             onChange={(val: any) =>
//               setFormData((prev: any) =>
//                 prev ? { ...prev, lampiran: val } : null
//               )
//             }
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default React.memo(StepForm);

const StepForm = ({ formData, setFormData }: StepFormProps) => {
  const [activeTab, setActiveTab] = useState("basic-info");

  useEffect(() => {
    setFormData((prev) => {
      if (prev === null) {
        return {
          namaDokumen: "",
          nomborDokumen: "",
          pindaanDokumen: [
            {
              pindaan: "",
              tarikh: "",
              butiran: "",
              disediakan: "",
              diluluskan: "",
            },
          ],
          cartaFungsi: {
            mainFlowChart: {
              id: "mainflow",
              title: "Main Flow Chart",
              nodes: [],
              edges: [],
            },
            subFlowCharts: [],
          },
          tujuan: "",
          objektif: "",
          skop: "",
          terminologi: "",
          singkatan: "",
          rujukan: "",
          prosedur: "",
          rekodDanSimpanan: "",
          lampiran: "",
        };
      }
      return prev;
    });
  }, [setFormData]);

  if (!formData) return null;

  const tabs = [
    { id: "basic-info", label: "Basic Info" },
    { id: "flow-chart", label: "Flow Chart" },
    { id: "section-1", label: "Section 1" },
    { id: "section-2", label: "Section 2" },
    { id: "section-3", label: "Section 3" },
    { id: "section-4", label: "Section 4" },
  ];

  return (
    <div className="my-5">
      <div className="tabs tabs-lift">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "tab-active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        <button
          type="button"
          // key={tab.id}
          // className={`tab ${activeTab === tab.id ? "tab-active" : ""}`}
          className="tab hover:bg-white hover:font-semibold"
          onClick={() => {
            setFormData(null);
          }}
        >
          <span className="text-red-400">Delete Procedure Template</span>
        </button>
      </div>

      <div className="h-fit overflow-auto">
        {activeTab === "basic-info" && (
          <BasicInfoTab formData={formData} setFormData={setFormData} />
        )}
        {activeTab === "flow-chart" && (
          <FlowChartTab formData={formData} setFormData={setFormData} />
        )}
        {activeTab === "section-1" && (
          <RichTextTab
            formData={formData}
            setFormData={setFormData}
            fields={[
              { label: "Tujuan", key: "tujuan" },
              { label: "Objektif", key: "objektif" },
              { label: "Skop", key: "skop" },
            ]}
          />
        )}
        {activeTab === "section-2" && (
          <RichTextTab
            formData={formData}
            setFormData={setFormData}
            fields={[
              { label: "Terminologi", key: "terminologi" },
              { label: "Singkatan", key: "singkatan" },
              { label: "Rujukan", key: "rujukan" },
            ]}
          />
        )}
        {activeTab === "section-3" && (
          <RichTextTab
            formData={formData}
            setFormData={setFormData}
            fields={[{ label: "Prosedur", key: "prosedur", height: 650 }]}
          />
        )}
        {activeTab === "section-4" && (
          <RichTextTab
            formData={formData}
            setFormData={setFormData}
            fields={[
              { label: "Rekod dan Simpanan", key: "rekodDanSimpanan" },
              { label: "Lampiran", key: "lampiran" },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default StepForm;
