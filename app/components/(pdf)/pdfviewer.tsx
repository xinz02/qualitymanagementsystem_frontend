// "use client";

// import React, { useEffect } from "react";
// import { useState } from "react";
// import {
//   PDFViewer,
//   Document,
//   Page,
//   View,
//   Image,
//   Text,
//   StyleSheet,
//   Font,
// } from "@react-pdf/renderer";
// import { ProcedureTemplateFormData } from "@/app/interface/ProcedureTemplateFormData";
// import ProcedureHeader from "@/app/components/(pdf)/pdfheader";
// import ProcedureFooter from "@/app/components/(pdf)/pdffooter";
// import CoverPagePDF from "@/app/components/(pdf)/coverpage";
// import HTMLToPDF from "@/app/components/(pdf)/htmltopdf";
// import FlowChartExport from "@/app/components/(pdf)/flowchartexport";
// import { MarkerType } from "@xyflow/react";
// import { Procedure } from "@/app/interface/Procedure";
// import { toast } from "react-toastify";
// import { useParams } from "next/navigation";
// import { FlowChartData } from "@/app/interface/FlowChartData";

// Font.registerHyphenationCallback((word) => [word]);

// Font.register({
//   family: "Arial",
//   fonts: [
//     {
//       src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
//       fontWeight: "normal",
//     },
//     {
//       src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
//       fontWeight: "bold",
//     },
//   ],
// });

// const styles = StyleSheet.create({
//   coverpage: {
//     padding: 40,
//     paddingBottom: 90,
//     fontSize: 12,
//     flexDirection: "column",
//   },
//   page: {
//     paddingVertical: 40,
//     paddingLeft: "2.2cm",
//     paddingRight: "2.2cm",
//     paddingBottom: 90,
//     fontSize: 12,
//     flexDirection: "column",
//     // marginLeft: "3.00cm",
//     // marginRight: "2.0cm",
//   },
//   section: {
//     marginVertical: "1.27cm",
//     marginRight: "2.0cm",
//     marginLeft: "3.00cm",
//     paddingBottom: 8,
//     borderBottom: "1 solid #eee",
//   },
//   viewer: {
//     width: "100%",
//     height: "100vh",
//   },

//   headers: {
//     fontFamily: "Arial",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginVertical: 15,
//   },
// });

// const ProcedureViewPageClient = () => {
//   const params = useParams();
//   const procedureId = params.id as string;

//   const [procedure, setProcedure] = useState<Procedure>();
//   const [mainFlowImage, setMainFlowImage] = useState<
//     { id: string; title: string; image: string }[]
//   >([]);
//   const [subFlowImage, setSubFlowImage] = useState<
//     { id: string; title: string; image: string }[]
//   >([]);
//   const [exportStage, setExportStage] = useState<
//     "idle" | "main" | "sub" | "done"
//   >("idle");
//   const [hasMounted, setHasMounted] = useState(false);

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   const getProcedureById = async (id: string, jwtToken: string) => {
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/procedure/getProcedure/${id}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         }
//       );

//       if (!res.ok) {
//         throw new Error("Failed to fetch procedure");
//       }

//       const result = await res.json();
//       const procedureData: Procedure = result.data;

//       if (!procedureData) {
//         throw new Error("No procedure data found");
//       }

//       setProcedure(procedureData);
//     } catch (error) {
//       console.error("Failed to load procedure:", error);
//       toast.error("Failed to load procedure data");
//     }
//   };

//   useEffect(() => {
//     const jwtToken = localStorage.getItem("jwt") || "";
//     if (jwtToken) {
//       getProcedureById(procedureId, jwtToken);
//     }
//   }, [procedureId]);

//   useEffect(() => {
//     if (
//       procedure?.procedureTemplateData?.cartaFungsi &&
//       exportStage === "idle"
//     ) {
//       setExportStage("main");
//     }
//   }, [procedure]);

//   const handleMainFlowImagesReady = (images: typeof mainFlowImage) => {
//     setMainFlowImage(images);
//     setExportStage("sub");
//   };

//   const handleSubFlowImagesReady = (images: typeof subFlowImage) => {
//     setSubFlowImage((prev) => [...prev, ...images]);

//     if (
//       subFlowImage.length + images.length >=
//       (procedure?.procedureTemplateData?.cartaFungsi?.subFlowCharts.length || 0)
//     ) {
//       setExportStage("done");
//     }
//   };

//   const flowCharts = procedure?.procedureTemplateData?.cartaFungsi;

//   if (!hasMounted) return null;

//   return (
//     <>
//       {/* Export phase */}
//       {/* {exportStage === "main" && flowCharts && (
//         <FlowChartExport
//           flowCharts={flowCharts.mainFlowChart}
//           onImagesReady={handleMainFlowImagesReady}
//         />
//       )}

//       {exportStage === "sub" &&
//         flowCharts?.subFlowCharts.map(
//           (subFlowChart: FlowChartData, index: any) => (
//             <FlowChartExport
//               key={index}
//               flowCharts={subFlowChart}
//               onImagesReady={handleSubFlowImagesReady}
//             />
//           )
//         )} */}

//       {/* PDF Viewer */}
//       {procedure?.procedureTemplateData && exportStage === "done" && (
//         <PDFViewer style={styles.viewer}>
//           <Document>
//             <Page size="A4" style={styles.coverpage}>
//               <CoverPagePDF
//                 namaDokumen={procedure.procedureTemplateData.namaDokumen}
//                 nomborDokumen={procedure.procedureTemplateData.nomborDokumen}
//                 pindaanDokumen={procedure.procedureTemplateData.pindaanDokumen}
//               />
//             </Page>

//             <Page size="A4" style={styles.page}>
//               <ProcedureHeader
//                 namaDokumen={procedure.procedureTemplateData.namaDokumen}
//               />
//               <View>
//                 <Text style={styles.headers}>1 Carta Fungsi</Text>

//                 {mainFlowImage.map((img) => (
//                   <View key={img.id} style={{ marginVertical: 10 }}>
//                     <Image src={img.image} style={{ width: "100%" }} />
//                   </View>
//                 ))}

//                 {subFlowImage.map((img) => (
//                   <View key={img.id} style={{ marginVertical: 10 }}>
//                     <Text style={{ fontFamily: "Arial", fontSize: 12 }}>
//                       {img.title}
//                     </Text>
//                     <Image src={img.image} style={{ width: "100%" }} />
//                   </View>
//                 ))}

//                 <Text style={styles.headers}>2 Tujuan</Text>
//                 <HTMLToPDF html={procedure.procedureTemplateData.tujuan} />
//                 <Text style={styles.headers}>3 Objektif</Text>
//                 <HTMLToPDF html={procedure.procedureTemplateData.objektif} />
//                 <Text style={styles.headers}>4 Skop</Text>
//                 <HTMLToPDF html={procedure.procedureTemplateData.skop} />
//                 <Text style={styles.headers}>5 Terminologi</Text>
//                 <HTMLToPDF html={procedure.procedureTemplateData.terminologi} />
//                 <Text style={styles.headers}>6 Singkatan</Text>
//                 <HTMLToPDF html={procedure.procedureTemplateData.singkatan} />
//                 <Text style={styles.headers}>7 Rujukan</Text>
//                 <HTMLToPDF html={procedure.procedureTemplateData.rujukan} />
//                 <Text style={styles.headers}>8 Prosedur</Text>
//                 <HTMLToPDF html={procedure.procedureTemplateData.prosedur} />
//                 <Text style={styles.headers}>9 Rekod dan Simpanan</Text>
//                 <HTMLToPDF
//                   html={procedure.procedureTemplateData.rekodDanSimpanan}
//                 />
//                 <Text style={styles.headers}>10 Lampiran</Text>
//                 <HTMLToPDF html={procedure.procedureTemplateData.lampiran} />
//               </View>

//               <ProcedureFooter
//                 nomborDokumen={procedure.procedureTemplateData.nomborDokumen}
//                 pindaan={
//                   procedure.procedureTemplateData.pindaanDokumen.at(-1)
//                     ?.pindaan || ""
//                 }
//                 tarikh={
//                   procedure.procedureTemplateData.pindaanDokumen.at(-1)
//                     ?.tarikh || ""
//                 }
//               />
//             </Page>
//           </Document>
//         </PDFViewer>
//       )}
//     </>
//   );
// };

// export default ProcedureViewPageClient;
