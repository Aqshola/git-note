import { useDb } from "@/libs/pouchDb";
import { folderTreeType } from "@/types/note";


export async function createNewFolder(folder: folderTreeType) {
    const db = useDb()
    db.put(folder)
}

export async function getListFolder(): Promise<folderTreeType[]> {
    const db = useDb()
    const listFolder = await db.find({
        selector: { type: "FOLDER" }
    })
    return listFolder.docs as unknown as folderTreeType[]
}

export async function updateFolderName(id: string, newName: string) {
    const db = useDb()
    const data = await db.get(id)
    console.log(data)
    if (data) {
        db.put({
            ...data,
            _id: id,
            _rev: data._rev,
            label: newName,
            rename: false,
        })
    }
}