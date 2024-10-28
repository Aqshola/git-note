import { useRxDb } from "@/libs/rxDb";
import { randomFileName } from "@/utility/common";
import { blob } from "stream/consumers";

export async function saveAsset(file: File) {
    const db = await useRxDb()
    const newAsset = await db.assets.insert({
        id: randomFileName(),
        label: file.name,
        type: file.type,
    })

    const attachment = await newAsset.putAttachment({
        id: 'file',
        data: file,
        type: file.type,
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