import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import AnimatedOutlet from "../animate/AnimatedOutlet";

export default function GlobalLayout() {
    const location = useLocation()

    const landingPageVariants = {
        initial: {
            opacity: 0, x: 50
        },
        animate: {
            opacity: 1, x: 0
        },
        exit: {
            opacity: 0, x: 50
        }
    }

    const noneVariants = {

    }


    return <AnimatePresence mode="wait">

        <motion.div className="max-w-screen-2xl overflow-x-hidden mx-auto" key={location.pathname}>
            <motion.div key={location.pathname}
                variants={location.pathname == '/' ? landingPageVariants : noneVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                    type: "spring"
                }}
            >
                <AnimatedOutlet />
            </motion.div>
        </motion.div>

    </AnimatePresence>

}