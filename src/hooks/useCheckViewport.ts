import { isMobile } from "@/utility/common";

export function useCheckViewPort() {
    const statusMobile = isMobile()
    if (statusMobile) {
        return 'MOBILE'
    }
    return 'DESKTOP'


}


