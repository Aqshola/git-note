import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import { motion } from 'framer-motion'
import FolderTree from "@/components/base/tree/FolderTree";
import { generateRandomId } from "@/common/generator";
import { folderTreeType } from "@/types/note";
import { createNewFolder, getListFolder, updateFolderName } from "@/service/noteService";

export default function NoteV2() {
    const iconNavAnimateVariant = {
        show: {
            x: 0,
        },
        hide: {
            x: -10
        }
    }

    const navAnimateVariant = {
        show: {

        },
        hide: {
            x: "-100%",
            minWidth: '0px',
            width: '0px',
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingRight: 0,
        }
    }
    const [showNav, setShowNav] = useState<boolean>()
    const [folderTreeData, setFolderTreeData] = useState<folderTreeType[]>([])

    useEffect(() => {
        callGetListFolder()
    }, [])


    async function callGetListFolder() {
        const data = await getListFolder()
        setFolderTreeData(data)
    }

    function toggleShowNav() {
        setShowNav(!showNav)
    }

    async function addFolder() {
        const id = generateRandomId()
        const newFolder: folderTreeType = {
            _id: id,
            label: "Untitled",
            type: "FOLDER",
            counter: 1,
            child: [],
            rename: true,
            open: false
        }

        await createNewFolder(newFolder)
        await callGetListFolder()

    }

    async function renameFolder(id: string, name: string) {
        await updateFolderName(id, name)
        await callGetListFolder()
    }





    return (
        <div className="h-screen flex flex-col">
            <div className="bg-soft-white py-4 px-5 flex justify-between items-center border border-line-gray">
                <button onClick={toggleShowNav}>
                    <motion.svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="24" height="19" rx="2.5" stroke="black" />
                        <motion.rect transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }} variants={iconNavAnimateVariant}
                            animate={showNav ? 'show' : 'hide'}
                            x="0.5" y="0.5" width="8" height="19" rx="2.5" fill="#D9D9D9" stroke="black"
                        />
                    </motion.svg>
                </button>
                <div>
                    <button>
                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 13L5 9M5 9L9 5M5 9L19 9M14 13V14C14 15.6569 12.6569 17 11 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H11C12.6569 1 14 2.34315 14 4V5" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                    </button>
                </div>

            </div >
            <motion.div className="flex h-full relative">
                <motion.div
                    transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
                    variants={navAnimateVariant}
                    animate={showNav ? 'show' : 'hide'}
                    className={
                        clsx(" bg-soft-gray border border-line-gray border-r-purple-primary px-5 py-9 h-full overflow-x-hidden",
                            "md:min-w-[250px] md:max-w-[500px] md:relative", 'absolute  w-screen',

                        )
                    }>
                    <div className="mx-auto w-fit flex gap-5">
                        <button>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 3H3C1.89543 3 1 3.89543 1 5V16C1 17.1046 1.89543 18 3 18H14C15.1046 18 16 17.1046 16 16V11M14.5858 1.58579C15.3668 0.804738 16.6332 0.804738 17.4142 1.58579C18.1953 2.36683 18.1953 3.63316 17.4142 4.41421L8.82842 13H6L6 10.1716L14.5858 1.58579Z" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </button>
                        <button onClick={addFolder}>
                            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 9H13M10 6V12M1 13V3C1 1.89543 1.89543 1 3 1H9L11 3H17C18.1046 3 19 3.89543 19 5V13C19 14.1046 18.1046 15 17 15H3C1.89543 15 1 14.1046 1 13Z" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </button>

                    </div>
                    <div className="mt-10">
                        {
                            folderTreeData.map((el) => (
                                <FolderTree folderData={el} callbackRename={renameFolder} key={el._id} />
                            ))
                        }

                    </div>
                </motion.div>
                <motion.div className="bg-orange-primary w-full" transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}>
                    Content
                </motion.div>

            </motion.div>
        </div>

    )

}