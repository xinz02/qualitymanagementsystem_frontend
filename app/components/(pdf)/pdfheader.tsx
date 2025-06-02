import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  header: {
    textAlign: "right",
    fontFamily: "Arial",
    fontSize: 12,
    fontWeight: "bold",
    color: "#808080",
    textWrap: "balance",
    paddingLeft: 35,
    marginBottom: 15,
    width: "100%",
    borderBottom: "0.4 solid #000",
    // paddingLeft: 50,
  },
});

type ProcedureHeaderProps = {
  namaDokumen: string;
};

const ProcedureHeader = ({ namaDokumen }: ProcedureHeaderProps) => {
  return (
    <View fixed>
      <Text style={[styles.header, { paddingBottom: 6 }]}>{namaDokumen}</Text>
    </View>
  );
};

export default ProcedureHeader;
