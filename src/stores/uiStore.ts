import customStorage from "@/libs/customStoragePresistent"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface UiState {
    nav: "SHOW" | "HIDE"
    sidebar: "SHOW" | "HIDE"

    showNav: () => void
    hideNav: () => void

    showSidebar: () => void
    hideSidebar: () => void

}


const STORE_NAME = "ui-storage"

export const useUiStore = create<UiState>()(
    persist(
        (set) => ({
            nav: "HIDE",
            sidebar: "HIDE",

            showNav() { set(() => ({ nav: "SHOW", })) },
            hideNav() { set(() => ({ nav: "HIDE", })) },

            showSidebar() { set(() => ({ sidebar: "SHOW", })) },
            hideSidebar() { set(() => ({ sidebar: "HIDE", })) },


        }),
        {
            name: STORE_NAME,
            storage: createJSONStorage(() => customStorage)
        }
    )
)


