import { RxJsonSchema } from "rxdb";
import { JSONContent } from "@tiptap/react";


export interface BaseItem {
    id: string
    type: 'FOLDER' | 'FILE',
    label: string

    content: string // parsed as JSONContent
    path: Array<string>
    counter: number
    rename: boolean,
    open: boolean

    parentId: string | null,
    childrenIds: Array<string> | null,

    createdAt: string //from rxdb,
    updatedAt: string
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
            type: "array"
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
        },
        createdAt: {
            "type": "string",
            "format": "date-time",
        },
        updatedAt: {
            "type": "string",
            "format": "date-time",
        }

    },
    required: ["type", "label", "id", "content", "path", "counter"]

}