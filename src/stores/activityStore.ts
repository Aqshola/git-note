import customStorage from "@/libs/customStoragePresistent"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface ActivityStore {
    activeFileId: string,

    updateFileId: string

    valueUpdateFileLabel: string
    setActiveFile: (id: string) => void
    setupdateFileId: (value: string) => void

    setValueUpdateFileLabel: (value: string) => void
}


const STORE_NAME = "activity-storage"

export const useActivityStore = create<ActivityStore>()(
    persist(
        (set) => ({
            activeFileId: "",
            updateFileId: "",
            valueUpdateFileLabel: "",
            setActiveFile(id) {
                set(() => ({ activeFileId: id }))
            },
            setupdateFileId(value) {
                set(() => ({ updateFileId: value }))
            },
            setValueUpdateFileLabel(value) {
                set(() => ({ valueUpdateFileLabel: value }))
            }

        }),
        {
            name: STORE_NAME,
            storage: createJSONStorage(() => customStorage)
        }
    )
)


