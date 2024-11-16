type Platform = "MOBILE" | "WEB" | "UNKNOWN"
let mylatesttap: any; //double tap
export function checkLayoutPlatform(): Platform {
    const windowWidth = window.innerWidth
    console.log(windowWidth)
    return "WEB"
}

export function doubleTap(callback: (args?: any) => any, callbackFail?: (args?: any) => any) {



    let now = new Date().getTime();
    let timesince = now - mylatesttap;
    if ((timesince < 600) && (timesince > 0)) {
        callback()
    } else {
        if (callbackFail) {
            callbackFail()
        }
    }

    mylatesttap = new Date().getTime();


}