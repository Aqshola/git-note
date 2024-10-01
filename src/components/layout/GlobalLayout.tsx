import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import AnimatedOutlet from "../animate/AnimatedOutlet";

export default function GlobalLayout() {
    const location = useLocation()
    return <AnimatePresence mode="wait">

        <motion.div className="max-w-screen-2xl overflow-x-hidden" key={location.pathname}>

            <motion.div key={location.pathname}
                initial={{ opacity: 0, x: 50 }}
                animate={{
                    opacity: 1, x: 0
                }}
                exit={{
                    opacity: 0, x: 50
                }}
                transition={{
                    type: "spring"
                }}
            >
                <AnimatedOutlet />
            </motion.div>
        </motion.div>

    </AnimatePresence>

}