import { Extension } from "@tiptap/react";

const FirstLineHeading = Extension.create({
    name: 'firstLineHeading',

    addGlobalAttributes() {
        return [
            {
                types: ['doc'],
                attributes: {
                    firstLineProcessed: {
                        default: false,
                        parseHTML: () => false,
                        renderHTML: () => ({}),
                    },
                },
            },
        ]
    },

    onUpdate(this) {
        const { doc, tr } = this.editor.state
        const firstNode = doc.firstChild

        if (!doc.attrs.firstLineProcessed && firstNode && firstNode.type.name === 'paragraph') {
            tr.setNodeMarkup(0, this.editor.schema.nodes.heading, { level: 1 })
            tr.setDocAttribute('firstLineProcessed', true)
            this.editor.view.dispatch(tr)
        }
    }
})

export default FirstLineHeading