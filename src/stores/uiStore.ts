import customStorage from "@/libs/customStoragePresistent"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface UiState {
    nav: "SHOW" | "HIDE"
    sidebar: "SHOW" | "HIDE"

    settingBar: "SHOW" | "HIDE"

    showNav: () => void
    hideNav: () => void

    showSidebar: () => void
    hideSidebar: () => void

    showSettingBar: () => void
    hideSettingBar: () => void

}


const STORE_NAME = "ui-storage"

export const useUiStore = create<UiState>()(
    persist(
        (set) => ({
            nav: "HIDE",
            sidebar: "HIDE",
            settingBar: "HIDE",

            showNav() { set(() => ({ nav: "SHOW", })) },
            hideNav() { set(() => ({ nav: "HIDE", })) },

            showSidebar() { set(() => ({ sidebar: "SHOW", })) },
            hideSidebar() { set(() => ({ sidebar: "HIDE", })) },

            showSettingBar() { set(() => ({ settingBar: "SHOW", })) },
            hideSettingBar() { set(() => ({ settingBar: "HIDE", })) },


        }),
        {
            name: STORE_NAME,
            storage: createJSONStorage(() => customStorage)
        }
    )
)


