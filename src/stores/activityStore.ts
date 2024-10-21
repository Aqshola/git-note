import customStorage from "@/libs/customStoragePresistent"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface ActivityStore {
    activeFileId: string,
    setActiveFile: (id: string) => void
}


const STORE_NAME = "activity-storage"

export const useActivityStore = create<ActivityStore>()(
    persist(
        (set) => ({
            activeFileId: "",
            setActiveFile(id: string) { set(() => ({ activeFileId: id })) }
        }),
        {
            name: STORE_NAME,
            storage: createJSONStorage(() => customStorage)
        }
    )
)


