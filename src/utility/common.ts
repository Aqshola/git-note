export function generateBase36ID(length = 6) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

export const debounce = (func: (args: any) => any, timeout = 300) => {
    let timer: any
    return (...args: any) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

export function randomFileName() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

