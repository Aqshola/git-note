import customStorage from "@/libs/customStoragePresistent"
import syncState from "@/libs/syncState"
import { create } from "zustand"
import { StateStorage, createJSONStorage, persist } from "zustand/middleware"



export type Note = {
    title: string
    content: string
    id: string
}

interface NoteState {
    notes: Array<Note>
    lastVisited: string | null

    addNote: (note: Note) => void
    updateNote: (note: Note) => void
    deleteNote: (id: string) => void

    setLastVisit: (id: string) => void

    getNoteByID: (id: string) => Note | null
}



const STORE_NAME = 'notes-storage'

export const useNotesStore = create<NoteState>()(
    persist(
        (set, get) => ({
            notes: [],
            lastVisited: null,
            addNote(note) { set(() => ({ notes: [...this.notes, note] })) },
            updateNote(note) {
                const indexEdit = this.notes.map(data => data.id).indexOf(note.id)
                const currentNote = this.notes
                currentNote[indexEdit] = note
                set(() => ({ notes: currentNote }))
            },
            deleteNote(id) { },
            setLastVisit(id) { set(() => ({ lastVisited: id })) },
            getNoteByID(id) {
                const filtered = this.notes.filter(data => data.id == id)

                if (filtered.length > 0) {
                    return filtered[0]
                }
                return null
            }
        }),
        {
            name: STORE_NAME,
            storage: createJSONStorage(() => customStorage)
        },
    ),
)

syncState(STORE_NAME)
