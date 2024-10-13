import PouchDb from 'pouchdb'
import PouchDbFind from 'pouchdb-find'
let db: PouchDB.Database<{}>;


export function initDb() {
    if (!db) {
        try {
            PouchDb.plugin(PouchDbFind)
            db = new PouchDb('notebuk')
            console.log("POUCH DB CREATED")
            return db
        } catch (error) {
            console.error("FAILED TO INIT POUCH DB")
            throw error
        }
    }
}

export function useDb() {
    return db
}