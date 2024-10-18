import { RxDatabase, createRxDatabase, addRxPlugin, RxCollection } from 'rxdb'
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { itemSchema } from '@/types/rxSchema';


let db: RxDatabase<{
    [key: string]: RxCollection;
}>;

export async function initRxDb() {
    addRxPlugin(RxDBDevModePlugin);
    addRxPlugin(RxDBUpdatePlugin)
    const init = await createRxDatabase({
        name: 'notebuk',
        storage: getRxStorageDexie(),
        password: "TESTING123"
    })


    await init.addCollections({
        items: {
            schema: itemSchema
        }
    })
    db = init

}

export async function useRxDb() {
    return db
}