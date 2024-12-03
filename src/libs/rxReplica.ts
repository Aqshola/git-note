import { replicateRxCollection } from 'rxdb/plugins/replication'
import { useRxDb } from './rxDb'

export default async function initReplication() {
    const db = await useRxDb()
    replicateRxCollection({
        collection: db.collections.items,
        replicationIdentifier: "testing-replication",
        push: {
            async handler(changeRows) {
                console.log("called")
                const body = {
                    document: changeRows
                }

                const fetching = await fetch("http://localhost:8080/rxdb/push", {
                    method: "POST",
                    body: JSON.stringify(body)
                })

                const res = await fetching.json()
                console.log(res)
                return []
            }
        }
    })
}