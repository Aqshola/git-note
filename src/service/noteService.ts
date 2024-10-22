
import { useRxDb } from "@/libs/rxDb";
import { BaseItem } from "@/types/rxSchema";
import { v4 as uuidv4 } from 'uuid';



type createNewFolderParam = {
    label: string,
    open: boolean,
    rename: boolean,

}
export async function createNewFolder(folderData: createNewFolderParam) {
    const newFolder: BaseItem = {
        id: uuidv4(),
        label: folderData.label,
        counter: 1,
        open: folderData.open,
        rename: folderData.rename,
        childrenIds: [],
        content: "",
        createdAt: new Date().toISOString(),
        parentId: "",
        path: [],
        type: "FOLDER"
    }
    const db = await useRxDb()
    const result = await db.items.insert(newFolder)
    return result
}
export async function createNewFile(label: string) {
    const newFile: BaseItem = {
        id: uuidv4(),
        label: label,
        childrenIds: [],
        content: "",
        counter: 1,
        open: false,
        rename: false,
        createdAt: new Date().toISOString(),
        parentId: '',
        path: [],
        type: "FILE"
    }

    const db = await useRxDb()
    const result = await db.items.insert(newFile)
    return result



}

type createNewSubFolderParam = {
    label: string,
    open: boolean,
    rename: boolean,

}

export async function createNewSubFolder(id: string, folderData: createNewSubFolderParam) {
    const db = await useRxDb()

    const itemData = await db.items.findOne({ selector: { id } }).exec()
    if (!itemData) return

    const path = [...itemData.path, itemData.id]
    const newFolderData: BaseItem = {
        id: uuidv4(),
        label: folderData.label,
        open: folderData.open,
        rename: folderData.rename,
        type: "FOLDER",
        path: path,
        content: "",
        childrenIds: [],
        counter: itemData.counter + 1,
        parentId: itemData.id,
        createdAt: new Date().toISOString(),
    }

    const resultSubFolder = await db.items.insert(newFolderData)

    const itemDataChildren = [...itemData.childrenIds]
    itemDataChildren.push(resultSubFolder.id)

    await itemData.patch({
        childrenIds: itemDataChildren
    })
    return resultSubFolder
}


export async function createNewSubFile(id: string, folderData: createNewSubFolderParam) {
    const db = await useRxDb()

    const itemData = await db.items.findOne({ selector: { id } }).exec()
    if (!itemData) return

    const path = [...itemData.path, itemData.id]
    const newFolderData: BaseItem = {
        id: uuidv4(),
        label: folderData.label,
        open: false,
        rename: false,
        type: "FILE",
        path: path,
        content: "",
        childrenIds: [],
        counter: itemData.counter + 1,
        parentId: itemData.id,
        createdAt: new Date().toISOString(),
    }

    const resultSubFolder = await db.items.insert(newFolderData)

    const itemDataChildren = [...itemData.childrenIds]
    itemDataChildren.push(resultSubFolder.id)

    await itemData.patch({
        childrenIds: itemDataChildren
    })
    return resultSubFolder
}

export async function getListItem() {

    const db = await useRxDb()
    const listParentFolder = await db.items.find({
        selector: {
            counter: { "$eq": 1 }
        },
        sort: [
            { type: 'desc' }, { createdAt: 'desc' },
        ]
    }).exec()
    return listParentFolder as BaseItem[]
}

export async function getListSubItem(id: string) {
    const db = await useRxDb()
    const listSubFolder = await db.items.find({
        selector: { parentId: id }, sort: [
            { type: 'desc' }, { createdAt: 'desc' },
        ]
    }).exec()
    return listSubFolder as BaseItem[]

}

export async function updateFolderName(id: string, newName: string) {
    const db = await useRxDb()
    const itemData = await db.items.findOne({ selector: { id } }).exec()
    if (!itemData) return

    const updateResult = await itemData.patch({
        label: newName,
        rename: false
    })

    return updateResult


}

export async function updateFileName(id: string, newName: string) {
    const db = await useRxDb()
    const itemData = await db.items.findOne({ selector: { id } }).exec()
    if (!itemData) return

    const updateResult = await itemData.patch({
        label: newName,
    })

    return updateResult
}

export async function deleteFolder(id: string) {
    const db = await useRxDb()
    const itemData = await db.items.findOne({ selector: { id } }).exec()
    if (!itemData) return


    const deletedChild = [...itemData.childrenIds]

    const queue = [...itemData.childrenIds]


    while (queue.length > 0) {
        const currentId = queue.pop()
        const lookUp = await db.items.findOne({ selector: { id: currentId } }).exec()
        if (!lookUp) { continue }
        if (lookUp.childrenIds.length > 0) {
            deletedChild.push(...lookUp.childrenIds)
            queue.push(...lookUp.childrenIds)
        }
    }



    if (itemData.parentId != "") {
        const parentItem = await db.items.findOne({ selector: { id: itemData.parentId } }).exec()
        const childrenParent = parentItem.childrenIds.filter((list: string) => list != id)
        parentItem.patch({
            childrenIds: childrenParent
        })
    }

    await db.items.find({
        selector: {
            id: {
                "$in": deletedChild
            }
        }
    }).remove()
    await itemData.remove()

}

export async function getDetailFile(id: string) {
    const db = await useRxDb()
    const itemData = await db.items.findOne({ selector: { id } }).exec()
    if (!itemData) return
    return itemData as BaseItem

}

export async function getItemPath(ids: Array<string>) {
    const db = await useRxDb()
    const listItem = await db.items.find({
        selector: {
            id: {
                "$in": ids
            }
        },
        sort: [
            { type: 'desc' }, { createdAt: 'asc' },
        ]
    }).exec()

    return listItem.map((item) => ({
        id: item.id,
        label: item.label
    }))
}
