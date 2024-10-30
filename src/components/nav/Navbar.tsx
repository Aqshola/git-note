import { useUiStore } from "@/stores/uiStore"
import { motion } from 'framer-motion'

export default function Navbar() {
    const iconNavAnimateVariant = {
        show: {
            x: 0,
        },
        hide: {
            x: -10
        }
    }

    const uiStore = useUiStore((state) => state)


    function toggleSidebarStatus() {
        if (uiStore.sidebar == "HIDE") {
            uiStore.showSidebar()
            return
        }
        uiStore.hideSidebar()
    }
    return (

        <div className="py-4 px-5 flex justify-between items-center border-b border-line-gray">
            <button onClick={toggleSidebarStatus}>

                <motion.svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="24" height="19" rx="2.5" stroke="black" />
                    <motion.rect transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }} variants={iconNavAnimateVariant}
                        animate={uiStore.sidebar == "SHOW" ? 'show' : 'hide'}
                        x="0.5" y="0.5" width="8" height="19" rx="2.5" fill="#D9D9D9" stroke="black"
                    />
                </motion.svg>
            </button>
            <div>
                {/* <button>
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 13L5 9M5 9L9 5M5 9L19 9M14 13V14C14 15.6569 12.6569 17 11 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H11C12.6569 1 14 2.34315 14 4V5" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                </button> */}
            </div>

        </div >

    )
}