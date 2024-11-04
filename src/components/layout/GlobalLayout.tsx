import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import AnimatedOutlet from "../animate/AnimatedOutlet";
import PageLayout from "./PageLayout";

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

    const routeDashboard = ['/note', '/asset-preview']

    const useDashboardLayout = routeDashboard.includes(location.pathname)


    if (useDashboardLayout) {
        return <PageLayout><Outlet /></PageLayout>
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