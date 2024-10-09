import clsx from "clsx"
import { useState } from "react"
import { AnimatePresence, motion } from 'framer-motion'

type FolderTree = {
    id: string
    label: string
    type: 'FILE' | 'FOLDER',
    child: Array<FolderTree>
    counter?: number
}

export default function FolderTree({ counter = 0, ...child }: Readonly<FolderTree>) {


    const paddingLeft = 0 + (counter * 12)
    const [viewChild, setViewChild] = useState(false)


    function toggleViewChild() {
        if (child.type == 'FILE' || child.child.length == 0) return
        setViewChild(!viewChild)
    }

    return (

        <motion.div animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} className="w-full">
            <motion.div onClick={toggleViewChild} className={clsx("w-full rounded text-write-gray text-nowrap overflow-x-hidden text-ellipsis flex items-center gap-3 cursor-pointer",
                'pr-3 py-2', child.type == 'FILE' && 'cursor-pointer')} style={{
                    marginLeft: `${paddingLeft}px`
                }}>
                {child.type == 'FOLDER' && (
                    <div className={clsx('transition-transform duration-300', viewChild ? 'rotate-90' : 'rotate-0')}>
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.25 1.91658L5.33333 5.99992L1.25 10.0833" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                )}
                {child.label}
            </motion.div>
            <AnimatePresence>
                {child.type == 'FOLDER' && child.child.length > 0 && viewChild && (
                    child.child.map((el) => (
                        <motion.div key={el.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FolderTree child={el.child} id={el.id} label={el.label}
                                type={el.type}
                                counter={counter + 1} />
                        </motion.div>
                    ))
                )}
            </AnimatePresence>
        </motion.div>

    )
}