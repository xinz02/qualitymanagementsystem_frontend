import React from "react";
import { View, Image, Text, StyleSheet } from "@react-pdf/renderer";
import { Table, TH, TR, TD } from "@ag-media/react-pdf-table";
import { PindaanDokumenSimplified } from "@/app/interface/ProcedureTemplateFormData";
import { User } from "@/app/interface/User";

const styles = StyleSheet.create({
  pindaanHeader: {
    flexDirection: "row",
    backgroundColor: "#b9b9b9",
    fontWeight: "normal",
  },
  pindaanRow: {
    padding: 5,
    fontSize: 12,
    fontFamily: "Arial",
    minHeight: 25,
  },

  tableCell: {
    padding: 4,
    borderRight: "1 solid black",
    fontSize: 12,
    fontFamily: "Arial",
    minHeight: 25,
  },
});

type CoverpageProps = {
  namaDokumen: string;
  nomborDokumen: string;
  pindaanDokumen: PindaanDokumenSimplified[];
};

const CoverPagePDF = ({
  namaDokumen,
  nomborDokumen,
  pindaanDokumen,
}: CoverpageProps) => {
  const rowsPerPage = 10;
  const pages = [];
  for (let i = 0; i < pindaanDokumen.length; i += rowsPerPage) {
    pages.push(pindaanDokumen.slice(i, i + rowsPerPage));
  }

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "stretch",
        }}
      >
        {/* Left side - Image */}
        <View
          style={{
            width: "9cm",
            height: "100%",
            marginRight: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // border: "1 solid #000",
          }}
        >
          <Image
            source="/Picture2.png"
            style={{
              width: "6.45cm",
              height: "1.74cm",
            }}
          />
        </View>

        {/* Right side - Content */}
        <View
          style={{
            // flex: 1,
            width: "8cm", // Fixed width for right side
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginBottom: 15 }}>
            <Text
              style={{
                fontFamily: "Arial",
                fontSize: 10,
                fontWeight: "bold",
                paddingBottom: 10,
              }}
            >
              Nama Dokumen:
            </Text>
            <Text
              style={{
                fontFamily: "Arial",
                fontSize: 28,
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              {namaDokumen}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "Arial",
                fontSize: 10,
                fontWeight: "bold",
                paddingBottom: 10,
              }}
            >
              Nombor Dokumen:
            </Text>
            <Text
              style={{
                fontFamily: "Arial",
                fontSize: 28,
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              {nomborDokumen}
            </Text>
          </View>
        </View>
      </View>

      {/* <View style={{ marginTop: 30 }}>
        <Table wrap={true}>
          <TH style={[styles.pindaanHeader]}>
            <TD style={[styles.pindaanRow, { flex: 1 }]}>Pindaan</TD>
            <TD style={[styles.pindaanRow, { flex: 2 }]}>Tarikh</TD>
            <TD style={[styles.pindaanRow, { flex: 3 }]}>Butiran</TD>
            <TD style={[styles.pindaanRow, { flex: 2 }]}>Disediakan</TD>
            <TD style={[styles.pindaanRow, { flex: 2 }]}>Diluluskan</TD>
          </TH>
          {pindaanDokumen.length < 11
            ? [...Array(11)].map((_, index) => {
                const item = pindaanDokumen[index] || {
                  pindaan: "",
                  tarikh: "",
                  butiran: "",
                  disediakan: "",
                  diluluskan: "",
                };
                return (
                  <TR key={index}>
                    <TD
                      style={[
                        styles.pindaanRow,
                        {
                          textAlign: "center",
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        },
                      ]}
                    >
                      {index}
                    </TD>
                    <TD style={[styles.pindaanRow, { flex: 2 }]}>
                      {item.tarikh}
                    </TD>
                    <TD style={[styles.pindaanRow, { flex: 3 }]}>
                      {item.butiran}
                    </TD>
                    <TD style={[styles.pindaanRow, { flex: 2 }]}>
                      {item.disediakan}
                    </TD>
                    <TD style={[styles.pindaanRow, { flex: 2 }]}>
                      {item.diluluskan}
                    </TD>
                  </TR>
                );
              })
            : pindaanDokumen.map((item, index) => (
                <TR key={index}>
                  <TD
                    style={[
                      styles.pindaanRow,
                      {
                        textAlign: "center",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    {item.pindaan}
                  </TD>
                  <TD style={[styles.pindaanRow, { flex: 2 }]}>
                    {item.tarikh}
                  </TD>
                  <TD style={[styles.pindaanRow, { flex: 3 }]}>
                    {item.butiran}
                  </TD>
                  <TD style={[styles.pindaanRow, { flex: 2 }]}>
                    {item.disediakan}
                  </TD>
                  <TD style={[styles.pindaanRow, { flex: 2 }]}>
                    {item.diluluskan}
                  </TD>
                </TR>
              ))}
        </Table>
      </View> */}

      {/* Table Header */}
      <View
        wrap={false}
        style={{
          flexDirection: "row",
          backgroundColor: "#b9b9b9",
          border: "1 solid black",
          borderRight: "none",
          borderBottom: "1 solid black",
          marginTop: 25,
        }}
      >
        <Text style={[styles.tableCell, { flex: 1 }]}>Versi</Text>
        <Text style={[styles.tableCell, { flex: 2 }]}>Tarikh</Text>
        <Text style={[styles.tableCell, { flex: 3 }]}>Butiran</Text>
        <Text style={[styles.tableCell, { flex: 4 }]}>Deskripsi Perubahan</Text>
        <Text style={[styles.tableCell, { flex: 2 }]}>Disediakan</Text>
        <Text style={[styles.tableCell, { flex: 2 }]}>Diluluskan</Text>
      </View>

      {/* Table Rows */}
      {(pindaanDokumen.length < 10 ? [...Array(10)] : pindaanDokumen).map(
        (item, index) => {
          const rowData =
            pindaanDokumen.length < 10
              ? pindaanDokumen[index] || {
                  versi: index + 1,
                  tarikh: "",
                  butiran: "",
                  deskripsiPerubahan: "",
                  disediakan: [],
                  diluluskan: "",
                }
              : item;

          const lastIndex =
            pindaanDokumen.length < 10 ? 10 : pindaanDokumen.length;

          return (
            <View
              key={index}
              wrap={false} // Prevent row from breaking mid-row
              style={{
                flexDirection: "row",
                borderLeft: "1 solid black",
                borderTop: index === 0 ? "none" : "0.5 solid black",
                // borderRight: "1 solid black",
                // borderBottom: "1 solid black",
                borderBottom:
                  index === lastIndex ? "1 solid black" : "0.5 solid black",
                minHeight: 25, // Ensure minimum row height
              }}
            >
              <Text
                style={[styles.tableCell, { flex: 1, textAlign: "center" }]}
              >
                {rowData.versi}
              </Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>
                {rowData.tarikh}
              </Text>
              <Text style={[styles.tableCell, { flex: 3 }]}>
                {rowData.butiran}
              </Text>
              <Text style={[styles.tableCell, { flex: 4 }]}>
                {rowData.deskripsiPerubahan}
              </Text>
              {/* <Text style={[styles.tableCell, { flex: 2 }]}>
                {rowData.disediakan}
                {rowData.disediakan
                              ? rowData.disediakan
                                  .map((user: User) => user.name)
                                  .join(", ")
                              : "N/A"}
              </Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>
                {rowData.diluluskan.name}
              </Text> */}
              <Text style={[styles.tableCell, { flex: 2 }]}>
                {rowData.disediakan && Array.isArray(rowData.disediakan)
                  ? rowData.disediakan.map((user: User) => user.name).join(", ")
                  : ""}
              </Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>
                {rowData.diluluskan && typeof rowData.diluluskan === "object"
                  ? rowData.diluluskan.name
                  : ""}
              </Text>
            </View>
          );
        }
      )}
    </>
  );
};

export default CoverPagePDF;
