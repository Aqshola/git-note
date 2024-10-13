import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from 'framer-motion'
import { div } from "framer-motion/client"
import { folderTreeType } from "@/types/note"
import PopOver from "@/components/base/popup/PopOver"
type FolderTree = {
    folderData: folderTreeType
    callbackRename: (id: string, newName: string) => void

}

export default function FolderTree(props: Readonly<FolderTree>) {


    const refInputNameFolder = useRef<HTMLInputElement>(null)
    const folderData = props.folderData
    const paddingLeft = 0 + (folderData.counter * 12)
    const [viewChild, setViewChild] = useState<boolean>(folderData.open)
    const [renameChild, setRenameChild] = useState(folderData.rename)


    useEffect(() => {
        if (folderData.rename && refInputNameFolder.current) {
            refInputNameFolder.current?.focus()
        }

    }, [])

    function toggleViewChild() {
        if (folderData.type == 'FILE' || folderData.child.length == 0) return
        setViewChild(!viewChild)
    }

    function handleFinishRenameFolder(e: React.FocusEvent<HTMLInputElement, Element>) {
        const name = e.target.value
        props.callbackRename(folderData._id, name)
        setRenameChild(false)
    }



    return (

        <motion.div animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} className="w-full relative overflow-hidden">
            <motion.div onClick={toggleViewChild} className={clsx("w-full rounded text-write-gray text-nowrap  text-ellipsis flex items-center gap-3 cursor-pointer ",
                'pr-3 py-2', folderData.type == 'FILE' && 'cursor-pointer')} style={{
                    marginLeft: `${paddingLeft}px`
                }}>
                {folderData.type == 'FOLDER' && (
                    <div className={clsx('transition-transform duration-300', viewChild ? 'rotate-90' : 'rotate-0')}>
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.25 1.91658L5.33333 5.99992L1.25 10.0833" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                )}

                {renameChild && folderData.type == "FOLDER" ? (
                    <input
                        ref={refInputNameFolder}
                        placeholder="Input folder name"
                        defaultValue={folderData.label}
                        onBlur={(e) => handleFinishRenameFolder(e)}
                        className="w-full px-2 py-1 bg-transparent border border-purple-primary rounded" />
                ) : (
                    <div>{folderData.label}</div>

                )}

                <div className="ml-auto">
                    <PopOver>
                        <button className="relative inline-block z-30">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                            </svg>
                        </button>
                    </PopOver>
                </div>


            </motion.div>
            <AnimatePresence>
                {folderData.type == 'FOLDER' && folderData.child.length > 0 && viewChild && (
                    folderData.child.map((el) => (
                        <motion.div key={el._id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FolderTree folderData={el}
                                callbackRename={props.callbackRename}
                            />
                        </motion.div>
                    ))
                )}
            </AnimatePresence>
        </motion.div>

    )
}