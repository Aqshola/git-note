import { useRxDb } from "@/libs/rxDb";
import { BaseAsset } from "@/types/rxSchema";
import { randomFileName } from "@/utility/common";
import { v4 as uuidv4 } from "uuid";

export async function saveAsset(file: File) {
    const db = await useRxDb()
    const newAsset = await db.assets.insert({
        id: uuidv4(),
        label: `pastedimage_${randomFileName()}`,
        type: file.type,
    })

    const attachment = await newAsset.putAttachment({
        id: 'file',
        data: file,
        type: file.type,
        createdAt: new Date().toISOString(),
    })

    return {
        asset: newAsset,
        attach: attachment
    }
}

export async function getAssetsByListId(ids: Array<string>) {
    const db = await useRxDb()
    const data = await db.assets.findByIds(ids).exec()
    const mapFile: any = {}

    for (const [key, item] of data.entries()) {
        const attachment = await item.getAttachment('file').getData();
        mapFile[key] = attachment
    }

    return mapFile




}

export async function getListAsset() {
    const db = await useRxDb()

    const listAsset = await db.assets.find().exec()
    return listAsset as BaseAsset[]
}


interface BaseAssetBlob extends BaseAsset {
    blob: File
}
export async function getAssetById(id: string) {
    const db = await useRxDb()
    const itemData = await db.assets.findOne({ selector: { id } }).exec()
    if (!itemData) return
    return {
        ...itemData,
        blob: await itemData.getAttachment('file').getData()
    } as BaseAssetBlob
}

export async function deleteAsset(id: string) {
    const db = await useRxDb()
    await db.assets.findOne({ selector: { id } }).remove()
}