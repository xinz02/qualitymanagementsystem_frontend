import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { parseDocument } from "htmlparser2";
import { Element, Text as DomText, Node } from "domhandler";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";

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
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
      fontStyle: "italic",
    },
  ],
});

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: 8,
    textAlign: "justify",
    lineHeight: 1.2,
    fontSize: 12,
    fontFamily: "Arial",
  },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  strike: { textDecoration: "line-through" },
  underline: { textDecoration: "underline" },
  subscript: { fontSize: 8, marginBottom: -2 },
  superscript: {
    fontSize: 8,
    position: "relative",
    top: "-0.5em",
    verticalAlign: "super",
  },

  listItem: {
    marginBottom: 3,
    flexDirection: "row",
    alignItems: "center", // ensures vertical alignment
  },
  bullet: {
    width: "auto",

    textAlign: "center", // optional, improves aesthetics
  },

  unorderedList: {
    marginVertical: 6,
    paddingLeft: 15,
  },
  orderedList: {
    marginVertical: 6,
    paddingLeft: 16,
  },
  nestedList: {
    paddingLeft: 20,
  },
  // table: {
  //   borderCollapse: "collapse",
  //   marginBottom: 10,
  // },
  // tableRow: { flexDirection: "row" },
  // // tableCell: {
  // //   padding: 4,
  // //   fontSize: 12,
  // //   fontFamily: "Arial",
  // //   borderWidth: 1,
  // //   borderColor: "#000",
  // //   width: undefined as string | undefined,
  // //   flex: undefined as string | undefined,
  // //   flexGrow: 1, // Allow cell to grow
  // //   flexShrink: 1, // Allow cell to shrink
  // //   flexWrap: "wrap", // Enable text wrapping
  // //   minHeight: 5, // Minimum height
  // //   height: "auto",
  // // },
  // tableCell: {
  //   padding: 4,
  //   fontSize: 12,
  //   fontFamily: "Arial",
  //   borderTopWidth: 1,
  //   borderLeftWidth: 1,
  //   borderColor: "#000",
  //   flexGrow: 1,
  //   flexShrink: 1,
  //   flexWrap: "wrap",
  //   minHeight: 5,
  // },
  //!
  table: {
    width: "100%",
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderRightWidth: 0,
    // borderBottomWidth: 0,
    // borderColor: "#000",
    marginBottom: 10,
    marginTop: 5,
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
  },
  tableCell: {
    padding: 4,
    fontSize: 12,
    fontFamily: "Arial",
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderTopWidth: 0,
    // borderLeftWidth: 0,
    // borderColor: "#000",
    flexGrow: 1,
    flexShrink: 1,
    flexWrap: "wrap",
    minHeight: 5,
  },
  cellContent: {
    width: "100%", // Takes full cell width
    flexWrap: "wrap", // Ensures text wraps
    lineHeight: 1.2, // Proper line spacing
  },
  tableHeader: { backgroundColor: "#b9b9b9", fontWeight: "normal" },
  // table: {
  //   width: "100%",
  //   marginBottom: 10,
  //   borderCollapse: "collapse", // This is important for proper border collapsing
  // },
  // tableRow: {
  //   flexDirection: "row",
  //   width: "100%",
  // },
  // tableCell: {
  //   padding: 4,
  //   fontSize: 12,
  //   fontFamily: "Arial",
  //   flexGrow: 1,
  //   flexShrink: 1,
  //   flexWrap: "wrap",
  //   minHeight: 5,
  //   borderWidth: 1, // Default border width
  //   borderColor: "#000", // Default border color
  //   borderStyle: "solid", // Ensure border is solid
  // },
  // cellContent: {
  //   width: "100%",
  //   flexWrap: "wrap",
  //   lineHeight: 1.2,
  // },
  // tableHeader: {
  //   backgroundColor: "#b9b9b9",
  //   fontWeight: "normal",
  //   borderWidth: 1,
  //   borderColor: "#000",
  //   borderStyle: "solid",
  // },
  // transparentBorder: {
  //   borderWidth: 1,
  //   borderColor: "transparent",
  //   borderStyle: "solid",
  // },
});

const parseInlineStyle = (styleStr: string = ""): Record<string, string> => {
  return styleStr
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .reduce((styleObj, rule) => {
      const [key, value] = rule.split(":").map((s) => s.trim());
      if (key && value) styleObj[key] = value;
      return styleObj;
    }, {} as Record<string, string>);
};

const parseBorderShorthand = (value: string) => {
  const parts = value.trim().split(/\s+/); // Split by whitespace
  let width = 0;
  let style = "solid";
  let color = "#000";

  for (const part of parts) {
    if (part.endsWith("px")) {
      width = parseFloat(part);
    } else if (["solid", "dashed", "dotted", "double", "none"].includes(part)) {
      style = part;
    } else {
      color = part;
    }
  }

  return { borderWidth: width, borderStyle: style, borderColor: color };
};

const HTMLToPDF = ({ html }: { html: string }) => {
  const root = parseDocument(html);

  // const renderListItems = (
  //   nodes: Node[],
  //   listType: "ul" | "ol" = "ul",
  //   level = 0
  // ): React.ReactNode[] => {
  //   return nodes
  //     .filter((node) => node.type === "tag" && (node as Element).name === "li")
  //     .map((liNode, liIndex) => {
  //       const liElement = liNode as Element;
  //       const children = renderNodes(liElement.children);

  //       return (
  //         <View key={`${level}-${liIndex}`}>
  //           <View style={styles.listItem}>
  //             <Text
  //               style={[
  //                 styles.bullet,
  //                 {
  //                   fontSize: 12,
  //                   fontFamily: "Arial",
  //                   paddingTop: listType === "ul" ? 7 : 4,
  //                   paddingRight: listType === "ul" ? 4 : 3,
  //                 },
  //               ]}
  //             >
  //               {listType === "ul" ? "•" : `${liIndex + 1}.`}
  //             </Text>
  //             <Text style={{ fontSize: 12, fontFamily: "Arial" }}>
  //               {children.filter((child) => {
  //                 if (React.isValidElement(child) && child.type === View) {
  //                   return false;
  //                 }
  //                 return true;
  //               })}
  //             </Text>
  //           </View>

  //           {liElement.children.map((child, i) => {
  //             if (child.type === "tag" && (child as Element).name === "ul") {
  //               return (
  //                 <View key={`nested-ul-${i}`} style={styles.nestedList}>
  //                   {renderListItems(child.children, "ul", level + 1)}
  //                 </View>
  //               );
  //             }
  //             if (child.type === "tag" && (child as Element).name === "ol") {
  //               return (
  //                 <View key={`nested-ol-${i}`} style={styles.nestedList}>
  //                   {renderListItems(child.children, "ol", level + 1)}
  //                 </View>
  //               );
  //             }
  //             return null;
  //           })}
  //         </View>
  //       );
  //     });
  // };
  const renderListItems = (
    nodes: Node[],
    listType: "ul" | "ol" = "ul",
    level = 0
  ): React.ReactNode[] => {
    return nodes
      .filter((node) => node.type === "tag" && (node as Element).name === "li")
      .map((liNode, liIndex) => {
        const liElement = liNode as Element;
        const children = renderNodes(liElement.children);

        return (
          <View key={`li-${level}-${liIndex}`}>
            <View style={styles.listItem}>
              <Text
                style={[
                  styles.bullet,
                  {
                    fontSize: 12,
                    fontFamily: "Arial",
                    paddingTop: listType === "ul" ? 4 : 4,
                    paddingRight: listType === "ul" ? 4 : 3,
                  },
                ]}
              >
                {listType === "ul" ? "•" : `${liIndex + 1}.`}
              </Text>
              <Text style={{ fontSize: 12, fontFamily: "Arial" }}>
                {children.filter((child) => {
                  if (React.isValidElement(child) && child.type === View) {
                    return false;
                  }
                  return true;
                })}
              </Text>
            </View>

            {liElement.children.map((child, i) => {
              if (child.type === "tag" && (child as Element).name === "ul") {
                return (
                  <View
                    key={`nested-ul-${level}-${i}`}
                    style={styles.nestedList}
                  >
                    {renderListItems(child.children, "ul", level + 1)}
                  </View>
                );
              }
              if (child.type === "tag" && (child as Element).name === "ol") {
                return (
                  <View
                    key={`nested-ol-${level}-${i}`}
                    style={styles.nestedList}
                  >
                    {renderListItems(child.children, "ol", level + 1)}
                  </View>
                );
              }
              return null;
            })}
          </View>
        );
      });
  };

  const renderNodes = (nodes: Node[]): React.ReactNode[] => {
    return nodes.map((node, i) => {
      if (node.type === "text") {
        return <Text key={i}>{(node as DomText).data}</Text>;
      }

      if (node.type === "tag") {
        const el = node as Element;
        const children = renderNodes(el.children || []);

        switch (el.name) {
          case "p": {
            const styleMap = parseInlineStyle(el.attribs?.style);
            const textAlign = ((): "left" | "center" | "right" | "justify" => {
              const align = styleMap["text-align"];
              if (["left", "center", "right", "justify"].includes(align)) {
                return align as "left" | "center" | "right" | "justify";
              }
              return "left";
            })();

            return (
              <Text wrap key={i} style={{ ...styles.paragraph, textAlign }}>
                {children}
              </Text>
            );
          }

          case "span": {
            const styleMap = parseInlineStyle(el.attribs?.style);
            const fontSize = styleMap["font-size"]?.replace("pt", "");
            const fontFamily = "Arial";

            return (
              <Text
                wrap
                key={i}
                style={{
                  fontSize: parseFloat(fontSize) || 12,
                  fontFamily: fontFamily || "Arial",
                  lineHeight: 1.2,
                }}
              >
                {children}
              </Text>
            );
          }

          case "strong":
          case "b":
            return (
              <Text key={i} style={styles.bold}>
                {children}
              </Text>
            );

          case "em":
          case "i":
            return (
              <Text key={i} style={styles.italic}>
                {children}
              </Text>
            );

          case "s":
          case "strike":
            return (
              <Text key={i} style={styles.strike}>
                {children}
              </Text>
            );

          case "u":
            return (
              <Text key={i} style={styles.underline}>
                {children}
              </Text>
            );

          case "sub":
            return (
              <View key={i} style={styles.subscript}>
                <Text>{children}</Text>
              </View>
            );

          case "sup":
            return (
              <View key={i} style={styles.superscript}>
                <Text>{children}</Text>
              </View>
            );

          case "ul":
            return (
              <View
                key={i}
                style={[
                  styles.unorderedList,
                  el.parent && "name" in el.parent && el.parent.name === "li"
                    ? styles.nestedList
                    : {},
                ]}
              >
                {renderListItems(el.children, "ul")}
              </View>
            );

          case "ol":
            return (
              <View
                key={i}
                style={[
                  styles.orderedList,
                  el.parent && "name" in el.parent && el.parent.name === "li"
                    ? styles.nestedList
                    : {},
                ]}
              >
                {renderListItems(el.children, "ol")}
              </View>
            );

          case "li":
            return null; // Handled by renderListItems

          case "table": {
            console.log(children);
            const styleMap = parseInlineStyle(el.attribs?.style);
            return (
              <View wrap key={i} style={[styles.table, { width: "100%" }]}>
                <Table>{children}</Table>
                {/* <View>{children}</View> */}
              </View>
            );
          }

          case "tbody":
            return <View wrap>{children}</View>;

          case "tr":
            return (
              <View key={i}>
                <TR
                  wrap={false}
                  // key={i}
                  style={{
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    width: "100%",
                  }}
                >
                  {children}
                </TR>
                {/* <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    width: "100%",
                  }}
                >
                  {children}
                </View> */}
              </View>
            );

          case "td": {
            const colWidth = el.attribs?.colwidth
              ? parseInt(el.attribs.colwidth, 10)
              : undefined;

            const isTransparent =
              el.attribs?.["data-border-color"] === "transparent";

            const cellStyles = {
              ...styles.tableCell,
              border: isTransparent ? "1pt solid #fff" : "1pt solid #000",
              // borderWidth: isTransparent ? 0.00001 : 1,
              // borderColor: isTransparent ? "transparent" : "#000",
              flex: colWidth ? `0 0 ${colWidth}pt` : 1,
              width: colWidth ? `${colWidth}pt` : "auto",
            };

            return (
              <TD wrap key={i} style={cellStyles}>
                <View wrap>{renderNodes(el.children)}</View>
              </TD>
              // <View wrap key={i} style={cellStyles}>
              //   <View wrap>{renderNodes(el.children)}</View>
              // </View>
            );
          }

          // case "td": {
          //   const styleMap = parseInlineStyle(el.attribs?.style);
          //   const colWidth = el.attribs?.colwidth
          //     ? parseInt(el.attribs.colwidth, 10)
          //     : undefined;

          //   const borderValues = styleMap["border"]
          //     ? parseBorderShorthand(styleMap["border"])
          //     : { borderWidth: 1, borderStyle: "solid", borderColor: "#000" };

          //   const isTransparent =
          //     borderValues.borderColor === "transparent" ||
          //     borderValues.borderColor === "#ffffff00";

          //   const cellStyles = {
          //     ...styles.tableCell,
          //     borderWidth: isTransparent ? 0.00001 : borderValues.borderWidth,
          //     borderColor: isTransparent
          //       ? "#ffffff00"
          //       : borderValues.borderColor,
          //     flex: colWidth ? `0 0 ${colWidth}pt` : 1,
          //     width: colWidth ? `${colWidth}pt` : "auto",
          //   };

          //   return (
          //     <View wrap key={i} style={cellStyles}>
          //       <View wrap>{renderNodes(el.children)}</View>
          //     </View>
          //   );
          // }
          // case "td": {
          //   const styleMap = parseInlineStyle(el.attribs?.style);
          //   const colWidth = el.attribs?.colwidth
          //     ? parseInt(el.attribs.colwidth, 10)
          //     : undefined;

          //   const { borderWidth, borderColor } = styleMap["border"]
          //     ? parseBorderShorthand(styleMap["border"])
          //     : { borderWidth: 0.999, borderColor: "#000" };

          //   const isTransparent =
          //     borderColor === "transparent" || borderColor === "#ffffff00";

          //   const cellStyles = {
          //     ...styles.tableCell,
          //     borderTopWidth: isTransparent ? 0 : borderWidth,
          //     borderLeftWidth: isTransparent ? 0 : borderWidth,
          //     borderRightWidth: 0.999, // simulate border collapse
          //     borderBottomWidth: 0.999, // simulate border collapse
          //     borderColor: borderColor,
          //     flex: colWidth ? `0 0 ${colWidth}pt` : 1,
          //     width: colWidth ? `${colWidth}pt` : "auto",
          //   };

          //   return (
          //     <View wrap key={i} style={cellStyles}>
          //       <View wrap>{renderNodes(el.children)}</View>
          //     </View>
          //   );
          // }

          case "th":
            return (
              <TH key={i} style={styles.tableHeader}>
                {children}
              </TH>
            );
          // return <View style={styles.tableHeader}>{children}</View>;

          default:
            return null;
        }
      }

      return null;
    });
  };

  return <>{renderNodes(root.children)}</>;
};

export default HTMLToPDF;
