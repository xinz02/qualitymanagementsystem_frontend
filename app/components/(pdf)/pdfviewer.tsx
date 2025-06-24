"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import {
  PDFViewer,
  Document,
  Page,
  View,
  Image,
  Text,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";
import {
  PindaanDokumenSimplified,
  ProcedureTemplateFormData,
} from "@/app/interface/ProcedureTemplateFormData";
import ProcedureHeader from "@/app/components/(pdf)/pdfheader";
import ProcedureFooter from "@/app/components/(pdf)/pdffooter";
import CoverPagePDF from "@/app/components/(pdf)/coverpage";
import HTMLToPDF from "@/app/components/(pdf)/htmltopdf";
import FlowChartExport from "@/app/components/(pdf)/flowchartexport";

interface ProcedurePDFViewerProps {
  pindaanDokumen: PindaanDokumenSimplified[];
  templateData: ProcedureTemplateFormData;
  onPDFReady: () => void;
}

Font.registerHyphenationCallback((word) => [word]);

Font.register({
  family: "Arial",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  coverpage: {
    padding: 40,
    paddingBottom: 90,
    fontSize: 12,
    flexDirection: "column",
  },
  page: {
    paddingTop: 40,
    paddingLeft: "2.2cm",
    paddingRight: "2.2cm",
    paddingBottom: 90,
    fontSize: 12,
    flexDirection: "column",
  },
  section: {
    marginVertical: "1.27cm",
    marginRight: "2.0cm",
    marginLeft: "3.00cm",
    paddingBottom: 8,
    borderBottom: "1 solid #eee",
  },
  viewer: {
    width: "80%",
    height: "100vh",
  },
  headers: {
    fontFamily: "Arial",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 12,
  },
  TOCTitle: {
    fontFamily: "Arial",
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 8,
    textDecoration: "none",
    color: "black",
  },
});

const ProcedurePDFViewer = ({
  pindaanDokumen,
  templateData,
  onPDFReady,
}: ProcedurePDFViewerProps) => {
  
  const [mainFlowImage, setMainFlowImage] = useState<
    { id: string; title: string; image: string }[]
  >([]);

  const [subFlowImage, setSubFlowImage] = useState<
    { id: string; title: string; image: string }[]
  >([]);

  const flowCharts = templateData.cartaFungsi;

  if (flowCharts) {
    if (mainFlowImage.length === 0) {
      return (
        <FlowChartExport
          flowCharts={flowCharts.mainFlowChart}
          onImagesReady={setMainFlowImage}
        />
      );
    }

    if (flowCharts.subFlowCharts.length > 0 && subFlowImage.length === 0) {
      return (
        <>
          {flowCharts.subFlowCharts.length > 0 &&
            flowCharts.subFlowCharts.map((subFlowChart, index) => (
              <FlowChartExport
                key={index}
                flowCharts={subFlowChart}
                // onImagesReady={(images) =>
                //   setSubFlowImage([...subFlowImage, ...images])
                // }
                onImagesReady={(images) =>
                  setSubFlowImage((prev) => [...prev, ...images])
                }
              />
            ))}
        </>
      );
    }
  }

  const bookmarks: { title: string; id: string }[] = [
    { title: "1  CARTA FUNGSI", id: "#cartaFungsi" },
    { title: "2  TUJUAN", id: "#tujuan" },
    { title: "3  OBJEKTIF", id: "#objektif" },
    { title: "4  SKOP", id: "#skop" },
    { title: "5  TERMINOLOGI", id: "#terminologi" },
    { title: "6  SINGKATAN", id: "#singkatan" },
    { title: "7  RUJUKAN", id: "#rujukan" },
    { title: "8  PROSEDUR", id: "#prosedur" },
    { title: "9  REKOD DAN SIMPANAN", id: "#rekodDanSimpanan" },
    { title: "10  LAMPIRAN", id: "#lampiran" },
  ];

  return (
    <>
      {templateData ? (
        <div
          className="w-full h-full flex justify-center items-center"
          onLoad={() => {
            onPDFReady();
          }}
        >
          <PDFViewer style={styles.viewer}>
            <Document>
              {/* Cover Page */}
              <Page size="A4" style={styles.coverpage}>
                <CoverPagePDF
                  namaDokumen={templateData.namaDokumen}
                  nomborDokumen={templateData.nomborDokumen}
                  pindaanDokumen={pindaanDokumen}
                />
              </Page>

              {/* Other pages */}
              <Page size="A4" style={styles.page}>
                <ProcedureHeader namaDokumen={templateData.namaDokumen} />

                {/* TOC */}
                <View>
                  <View>
                    <Text
                      style={{
                        width: "100%",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontFamily: "Arial",
                        fontSize: 12,
                        marginBottom: 25,
                      }}
                    >
                      ISI KANDUNGAN
                    </Text>
                  </View>
                  <View>
                    {bookmarks.map((bookmark, index) => (
                      <Link
                        key={index}
                        src={bookmark.id}
                        style={styles.TOCTitle}
                      >
                        {bookmark.title}
                      </Link>
                    ))}
                  </View>
                </View>

                <View break>
                  <Text style={styles.headers} id="cartaFungsi">
                    1 Carta Fungsi
                  </Text>

                  {mainFlowImage.map((img) => (
                    <View key={img.id} style={{ marginVertical: 10 }}>
                      <Image
                        src={img.image}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </View>
                  ))}

                  {subFlowImage &&
                    subFlowImage.map((img) => (
                      <View key={img.id} style={{ marginVertical: 10 }}>
                        <Text style={{ fontFamily: "Arial", fontSize: 12 }}>
                          {img.title}{" "}
                        </Text>
                        <Image
                          src={img.image}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </View>
                    ))}

                  <Text style={styles.headers} id="tujuan">
                    2 Tujuan
                  </Text>
                  <HTMLToPDF html={templateData.tujuan} />
                  <Text style={styles.headers} id="objektif">
                    3 Objektif
                  </Text>
                  <HTMLToPDF html={templateData.objektif} />
                  <Text style={styles.headers} id="skop">
                    4 Skop
                  </Text>
                  <HTMLToPDF html={templateData.skop} />
                  <Text style={styles.headers} id="terminologi">
                    5 Terminologi
                  </Text>
                  <HTMLToPDF html={templateData.terminologi} />
                  <Text style={styles.headers} id="singkatan">
                    6 Singkatan
                  </Text>
                  <HTMLToPDF html={templateData.singkatan} />
                  <Text style={styles.headers} id="rujukan">
                    7 Rujukan
                  </Text>
                  <HTMLToPDF html={templateData.rujukan} />
                  <Text style={styles.headers} id="prosedur">
                    8 Prosedur
                  </Text>
                  <HTMLToPDF html={templateData.prosedur} />
                  <Text style={styles.headers} id="rekodDanSimpanan">
                    9 Rekod dan Simpanan
                  </Text>
                  <HTMLToPDF html={templateData.rekodDanSimpanan} />
                  <Text style={styles.headers} id="lampiran">
                    10 Lampiran
                  </Text>
                  <HTMLToPDF html={templateData.lampiran} />
                </View>

                <ProcedureFooter
                  nomborDokumen={templateData.nomborDokumen}
                  pindaan={
                    pindaanDokumen.length > 0
                      ? pindaanDokumen[pindaanDokumen.length - 1].versi
                      : ""
                  }
                  tarikh={
                    pindaanDokumen.length > 0
                      ? pindaanDokumen[pindaanDokumen.length - 1].tarikh
                      : ""
                  }
                />
              </Page>
            </Document>
          </PDFViewer>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProcedurePDFViewer;
