import { TableCell } from '@tiptap/extension-table-cell'
import { mergeAttributes } from '@tiptap/core'

export const CustomTableCell = TableCell.extend({
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
            style: `border: 1px solid ${attributes.borderColor}`,
          }
        },
      },
    }
  },
})
