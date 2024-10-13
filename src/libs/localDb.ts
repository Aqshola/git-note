import { RxDatabase, createRxDatabase, addRxPlugin } from 'rxdb'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';


let db: RxDatabase;

async function initDb() {
    addRxPlugin(RxDBDevModePlugin);
    const init = await createRxDatabase({
        name: 'notebuk',
        storage: getRxStorageDexie(),
        password: "TESTING123"
    })

    db = init
}

async function useDb() {
    if (!db) return false
    return db
}