import { RxDatabase, createRxDatabase, addRxPlugin, RxCollection } from 'rxdb'
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { assetSchema, itemSchema } from '@/types/rxSchema';
import { RxDBAttachmentsPlugin } from 'rxdb/plugins/attachments';


let db: RxDatabase<{
    [key: string]: RxCollection;
}>;

export async function initRxDb() {
    // addRxPlugin(RxDBDevModePlugin); //should hide in prod, also have side effect add iframe in document body
    addRxPlugin(RxDBUpdatePlugin)
    addRxPlugin(RxDBAttachmentsPlugin)
    const init = await createRxDatabase({
        name: 'notebuk',
        storage: getRxStorageDexie(),
        password: "TESTING123"
    })


    await init.addCollections({
        items: {
            schema: itemSchema
        },
        assets: {
            schema: assetSchema,

        }
    })
    db = init

}

export async function useRxDb() {
    return db
}