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


// Custom storage object with Base64 encryption
const customStorage: StateStorage = {
    getItem: (key: string) => {
        const value = localStorage.getItem(key)
        if (value) {
            // Decode Base64 and parse JSON
            return JSON.parse(atob(value))
        }
        return null
    },
    setItem: (key: string, value: string) => {
        // Stringify and encode to Base64
        const encodedValue = btoa(JSON.stringify(value))
        localStorage.setItem(key, encodedValue)
    },
    removeItem: (key: string) => {
        localStorage.removeItem(key)
    },
}

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
            name: 'notes-storage',
            storage: createJSONStorage(() => customStorage)
        },
    ),
)
