import customStorage from "@/libs/customStoragePresistent"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface ActivityStore {
    activeFileId: string,

    updateFileId: string

    valueUpdateFileLabel: string

    activeAssetId: string

    refreshAssetList: boolean

    viewMode: 'NOTE' | 'ASSET'





    setActiveFile: (id: string) => void
    setupdateFileId: (value: string) => void

    setValueUpdateFileLabel: (value: string) => void

    setActiveAssetId: (value: string) => void

    setRefereshAssetList: (value: boolean) => void

    setViewMode: (value: 'NOTE' | 'ASSET') => void




}


const STORE_NAME = "activity-storage"

export const useActivityStore = create<ActivityStore>()(
    persist(
        (set) => ({
            activeFileId: "",
            updateFileId: "",
            valueUpdateFileLabel: "",

            activeAssetId: "",
            refreshAssetList: false,
            viewMode: "NOTE",


            setActiveFile(id) {
                set(() => ({ activeFileId: id }))
            },
            setupdateFileId(value) {
                set(() => ({ updateFileId: value }))
            },
            setValueUpdateFileLabel(value) {
                set(() => ({ valueUpdateFileLabel: value }))
            },
            setRefereshAssetList(value) {
                set(() => ({ refreshAssetList: value }))
            },

            setActiveAssetId(value) {
                set(() => ({ activeAssetId: value }))
            },

            setViewMode(value) {
                set(() => ({ viewMode: value }))
            }
        }),
        {
            name: STORE_NAME,
            storage: createJSONStorage(() => customStorage)
        }
    )
)


