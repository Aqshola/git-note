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
    updateNote: (id: string) => void
    deleteNote: (id: string) => void
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
            addNote(note) { },
            updateNote(id) { },
            deleteNote(id) { }
        }),
        {
            name: 'notes-storage',
            storage: createJSONStorage(() => customStorage)
        },
    ),
)
