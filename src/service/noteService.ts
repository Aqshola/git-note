
import { useRxDb } from "@/libs/rxDb";
import { BaseItem } from "@/types/rxSchema";



export async function createNewFolder(folder: BaseItem) {
    const db = await useRxDb()
    const result = await db.items.insert(folder)
    return result
}

export async function createNewSubFolder(id: string, folder: BaseItem) {

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

export async function updateFolderName(id: string, newName: string) {
    const db = await useRxDb()
    const itemData = await db.items.findOne({ selector: { id: id } }).exec()
    if (!itemData) return

    const updateResult = await itemData.patch({
        label: newName,
        rename: false
    })

    console.log(updateResult)


}

export function testing() {

}