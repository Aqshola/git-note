export interface baseItem {
    label: string
    type: 'FILE' | 'FOLDER',
    counter: number,
    rename: boolean,
    open: false
}


export interface itemDB {
    id: string
    rev: string

    children: Array<baseItem & itemDB>
}


export type itemFromDB = baseItem & itemDB


export type folderTreeType = {
    _id: string
    label: string
    type: 'FILE' | 'FOLDER',
    child: Array<folderTreeType>
    counter: number,
    rename: boolean,
    open: false
}