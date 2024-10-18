import { schemaItems } from '@/types/pouchSchema';
import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
import PouchDBRelational from 'relational-pouch'
let db: PouchDB.RelDatabase;

export function initPouchDb() {
    PouchDB.plugin(PouchDBFind)
    PouchDB.plugin(PouchDBRelational)

    const init = new PouchDB("notebuk")
    const relDB = init.setSchema([schemaItems])

    db = relDB
}

export function usePouchDB() {

    return db
}