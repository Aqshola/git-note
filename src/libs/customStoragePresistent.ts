import { StateStorage } from "zustand/middleware"

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

export default customStorage