import { generateRandomId } from "@/common/generator";
import { checkLayoutPlatform } from "@/common/ui";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react"
import ReactDom from "react-dom";

type Props = {
    children: React.ReactNode,
    buttonChildren: React.ReactNode
}

export default function Popover(props: Readonly<Props>) {
    const refParentPopover = useRef<HTMLDivElement>(null)
    const refPopover = useRef<HTMLDivElement>(null);
    const refButtonPopover = useRef<HTMLButtonElement>(null)


    const [visible, setVisible] = useState(false)
    const [translate, setTranslate] = useState({ x: 0, y: 0 })

    function handlePopoverPosition() {
        if (!refParentPopover.current || !refPopover.current) return

        const parentRect = refParentPopover.current.getBoundingClientRect()
        const popoverRect = refPopover.current.getBoundingClientRect()

        const newTranslateX = parentRect.left + parentRect.width / 2 - popoverRect.width
        const newTranslateY = parentRect.top + parentRect.height

        setTranslate({
            x: newTranslateX,
            y: newTranslateY
        })
    }


    function showPopover(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation()
        if (!refParentPopover.current) return
        setVisible(!visible)

        setTimeout(() => {
            handlePopoverPosition()
        }, 0);
    }

    function handleResize() {
        if (visible) {
            handlePopoverPosition()
        }
    }

    function handleClickHide(e: MouseEvent) {
        if (refButtonPopover.current && !refButtonPopover.current.contains(e.target as Node)) {
            setVisible(false)
        }
    }



    useEffect(() => {
        handlePopoverPosition()
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [visible])

    useEffect(() => {
        if (visible) {
            document.addEventListener("mousedown", handleClickHide)
        } else {
            document.removeEventListener("mousedown", handleClickHide)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickHide)
        }

    }, [visible])





    return <div className="relative" ref={refParentPopover}>
        <button onClick={showPopover} ref={refButtonPopover}>
            {props.buttonChildren}
        </button>

        {
            ReactDom.createPortal(
                <AnimatePresence mode="wait">
                    {visible && (
                        <motion.div
                            key={generateRandomId()}
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 1, }}
                            exit={{ opacity: 0, }}
                            transition={{ duration: 0.2 }}
                            className="p-3 bg-white absolute shadow-lg rounded border"
                            ref={refPopover}
                            style={{
                                zIndex: 9999999,
                                top: 0,
                                left: 0,
                                transform: `translate(${translate.x}px, ${translate.y}px)`, // Use transform for positioning
                            }}
                        >
                            {props.children}
                        </motion.div>
                    )}
                </AnimatePresence>

                , document.querySelector("#popover-portal") ?? document.body
            )
        }




    </div>
}