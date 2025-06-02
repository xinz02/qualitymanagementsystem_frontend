// // TableBorderExtension.ts
// import { Extension } from '@tiptap/core';
// import { Node } from 'prosemirror-model';

// interface TableBorderColorOptions {
//   HTMLAttributes: Record<string, any>;
// }

// declare module '@tiptap/core' {
//   interface Commands<ReturnType> {
//     tableBorderColor: {
//       /**
//        * Set the table border color
//        */
//       setTableBorderColor: (color: string) => ReturnType;
//     };
//   }
// }

// export const TableBorderColor = Extension.create<TableBorderColorOptions>({
//   name: 'tableBorderColor',
  
//   addOptions() {
//     return {
//       HTMLAttributes: {},
//     };
//   },

//   // Add custom attributes to the table element
//   addGlobalAttributes() {
//     return [
//       {
//         types: ['table, th, td'],
//         attributes: {
//           borderColor: {
//             default: '#000000',
//             parseHTML: (element: HTMLElement) => element.getAttribute('data-border-color') || '#000000',
//             renderHTML: (attributes: Record<string, any>) => {
//               if (!attributes.borderColor) {
//                 return {};
//               }
              
//               console.log('changing border color:' + attributes.borderColor);

//               return {
//                 'data-border-color': attributes.borderColor,
//                 style: `--table-border-color: ${attributes.borderColor};`,
//               };
//             },
//           },
//         },
//       },
//     ];
//   },

//   addCommands() {
//     return {
//       setTableBorderColor: (color: string) => ({ editor, commands }) => {
//         // Find if there's a table node selected
//         const { selection } = editor.state;
//         const table: Node | null = editor.state.doc.nodeAt(selection.$anchor.pos);
        
//         // If not inside a table, do nothing
//         if (!table) {
//           return false;
//         }

//         console.log('called command:' + color + selection+ table);
        
//         return commands.updateAttributes('table', { borderColor: color });
//       },
//     };
//   },
// });

import { Table } from '@tiptap/extension-table'
import { mergeAttributes } from '@tiptap/core'

export const CustomTable = Table.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      borderColor: {
        default: null,
        parseHTML: element => element.getAttribute('data-border-color'),
        renderHTML: attributes => {
          if (!attributes.borderColor) return {}
          return {
            'data-border-color': attributes.borderColor,
            style: `border: 1px solid ${attributes.borderColor};`,
          }
        },
      },
    }
  },
})


