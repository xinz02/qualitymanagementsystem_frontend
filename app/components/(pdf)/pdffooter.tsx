import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { Table, TR, TD } from "@ag-media/react-pdf-table";

const styles = StyleSheet.create({
  table: {
    width: "100%",
    color: "#808080",
    // position: "absolute",
    // bottom: -40, // Adjust according to your page padding
  },
  tr: {
    width: "100%",
  },
  td1: {
    flexBasis: "20%",
    textAlign: "center",
    paddingHorizontal: 5,
    color: "#808080",
    borderColor: "#808080",
  },
  td2: {
    flexBasis: "2%",
    textAlign: "center",
    justifyContent: "center",
    color: "#808080",
    borderColor: "#808080",
  },
  td3: {
    flexBasis: "30%",
    textAlign: "center",
    paddingHorizontal: 5,
    color: "#808080",
    borderColor: "#808080",
  },
  td4: {
    flexBasis: "25%",
    textAlign: "center",
    paddingHorizontal: 5,
    color: "#808080",
    borderColor: "#808080",
  },
  td5: {
    flexBasis: "23%",
    textAlign: "center",
    paddingHorizontal: 5,
    color: "#808080",
    borderColor: "#808080",
  },
});

type ProcedureFooterProps = {
  nomborDokumen: string;
  pindaan: string;
  tarikh: string;
};

const ProcedureFooter = ({
  nomborDokumen,
  pindaan,
  tarikh,
}: ProcedureFooterProps) => {
  return (
    <View
      fixed
      style={{
        position: "absolute",
        bottom: 40, // match your page padding
        left: 40,
        right: 40,
      }}
    >
      <Table style={styles.table}>
        <TR style={styles.tr}>
          <TD style={styles.td1}>No. Dokumen</TD>
          <TD style={styles.td2}>:</TD>
          <TD style={styles.td3}>{nomborDokumen}</TD>
          <TD style={styles.td4}></TD>
          <TD style={styles.td5}>
            {/* Mukasurat 2/11 */}
            <Text
              render={({ pageNumber, totalPages }) =>
                `Mukasurat ${pageNumber - 1}/${totalPages - 1}`
              }
            />
          </TD>
        </TR>
        <TR>
          <TD style={styles.td1}>Pindaan</TD>
          <TD style={styles.td2}>:</TD>
          <TD style={styles.td3}>{pindaan}</TD>
          <TD style={styles.td4}></TD>
          <TD style={styles.td5}></TD>
        </TR>
        <TR>
          <TD style={styles.td1}>Tarikh</TD>
          <TD style={styles.td2}>:</TD>
          <TD style={styles.td3}>{tarikh}</TD>
          <TD style={styles.td4}></TD>
          <TD style={styles.td5}></TD>
        </TR>
      </Table>
    </View>
  );
};

export default ProcedureFooter;
