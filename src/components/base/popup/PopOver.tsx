import { generateRandomId } from "@/common/generator";
import { checkLayoutPlatform } from "@/common/ui";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react"
import ReactDom from "react-dom";

type Props = {
    children: React.ReactNode
}

export default function Popover(props: Readonly<Props>) {
    const refParentPopover = useRef<HTMLDivElement>(null)
    const refPopover = useRef<HTMLDivElement>(null);


    const [visible, setVisible] = useState(false)
    const [location, setLocation] = useState({ top: 0, left: 0, right: 0, bottom: 0 })



    function showPopOver() {
        if (!refParentPopover.current) return
        const parentRect = refParentPopover.current.getBoundingClientRect()
        setLocation({
            ...location,
            top: parentRect.top + parentRect.height,
            left: parentRect.left,
        })
        setVisible(!visible)
    }



    return <div className="relative" ref={refParentPopover}>
        <button onClick={showPopOver}>
            {props.children}
        </button>

        {
            ReactDom.createPortal(

                <AnimatePresence mode="wait">
                    {visible && (
                        <motion.div
                            key={generateRandomId()}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="p-2 bg-white absolute shadow-lg"
                            ref={refPopover}
                            style={{
                                zIndex: 9999999,
                                top: location.top,
                                left: location.left,
                            }}
                        >
                            <div>
                                this is popover sadada
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                , document.querySelector("#popover-portal") ?? document.body
            )
        }




    </div>
}