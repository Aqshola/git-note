import { RxJsonSchema } from "rxdb";


export interface BaseItem {
    id: string
    type: 'FOLDER' | 'FILE',
    label: string

    content: string
    path: string
    counter: number
    rename: boolean,
    open: false

    parentId: string | null,
    childrenIds: Array<string> | null,
}


export const itemSchema: RxJsonSchema<BaseItem> = {
    title: "ITEM SCHEMA",
    version: 0,
    primaryKey: "id",
    type: "object",
    properties: {
        type: {
            type: "string",
            enum: ['FOLDER', 'FILE']
        },
        label: {
            type: "string"
        },
        id: {
            type: "string",
            maxLength: 100,
        },
        content: {
            type: "string"
        },
        path: {
            type: "string"
        },
        counter: {
            type: "number"
        },
        open: {
            type: "boolean",
            default: false
        },
        rename: {
            type: "boolean",
            default: false,
        },
        parentId: {
            type: "string"
        },
        childrenIds: {
            type: "array"
        }
    },
    required: ["type", "label", "id", "content", "path", "counter"]

}