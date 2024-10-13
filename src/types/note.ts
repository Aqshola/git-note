export type folderTreeType = {
    _id: string
    label: string
    type: 'FILE' | 'FOLDER',
    child: Array<folderTreeType>
    counter: number,
    rename: boolean,
    open: false
}