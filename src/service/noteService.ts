
import { useRxDb } from "@/libs/rxDb";
import { BaseItem } from "@/types/rxSchema";



export async function createNewFolder(folder: BaseItem) {
    const db = await useRxDb()
    const result = await db.items.insert(folder)
    return result
}

export async function createNewSubFolder(id: string, folder: BaseItem) {
    const db = await useRxDb()

    const itemData = await db.items.findOne({ selector: { id } }).exec()
    if (!itemData) return

    const newFolderData: BaseItem = {
        ...folder,
        counter: itemData.counter + 1,
        parentId: itemData.id,
    }

    const resultSubFolder = await db.items.insert(newFolderData)

    const itemDataChildren = [...itemData.childrenIds]
    itemDataChildren.push(resultSubFolder.id)

    await itemData.patch({
        childrenIds: itemDataChildren
    })
    return resultSubFolder
}

export async function getListFolder() {

    const db = await useRxDb()
    const listParentFolder = await db.items.find({
        selector: {
            type: { "$eq": "FOLDER" },
            counter: { "$eq": 1 }
        }
    }).exec()
    return listParentFolder as BaseItem[]
}

export async function getListSubFolder(id: string) {
    const db = await useRxDb()
    const listSubFolder = await db.items.find({ selector: { parentId: id } }).exec()
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


async function recursiveGetSubFolderId(ids: string, childIds: []) {

}

export function testing() {

}