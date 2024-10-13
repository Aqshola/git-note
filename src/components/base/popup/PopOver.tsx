import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react"
import ReactDom from "react-dom";

type Props = {
    children: React.ReactNode
}

export default function PopOver(props: Readonly<Props>) {
    const refParentPopOver = useRef<HTMLDivElement>(null)
    const refPopOver = useRef<HTMLDivElement>(null);


    const [visible, setVisible] = useState(false)
    const [content, setContent] = useState<JSX.Element>()



    function showPopOver() {
        if (!refParentPopOver.current) return
        const parentRect = refParentPopOver.current.getBoundingClientRect()
        const changeVisible = !visible


        if (changeVisible) {
            const portal = ReactDom.createPortal(

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="p-2 bg-white absolute shadow-lg"
                    ref={refPopOver}
                    style={{
                        zIndex: 9999999,
                        top: parentRect.bottom,
                        left: parentRect.x - 100,
                    }}
                >
                    <div>
                        this is popover sadada
                    </div>
                </motion.div>

                , document.body
            )
            setContent(portal)
        } else {
            setContent(<></>)
        }
        console.log("dad")

        setVisible(changeVisible)




    }



    return <div className="relative" ref={refParentPopOver}>
        <div onClick={showPopOver}>
            {props.children}
        </div>


        {content}



    </div>
}