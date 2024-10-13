type Platform = "MOBILE" | "WEB" | "UNKNOWN"
export function checkLayoutPlatform(): Platform {
    const windowWidth = window.innerWidth
    console.log(windowWidth)
    return "WEB"
}