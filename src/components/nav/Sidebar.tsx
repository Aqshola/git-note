import { generateRandomId } from '@/common/generator'
import { createNewFolder, createNewSubFolder, getListFolder, testing, updateFolderName } from '@/service/noteService'
import { useUiStore } from '@/stores/uiStore'
import { baseItem, folderTreeType, itemFromDB, } from '@/types/note'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import FolderTree from '../base/tree/FolderTree'

export default function Sidebar() {
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

    const uiStore = useUiStore((state) => state)
    const [folderTreeData, setFolderTreeData] = useState<itemFromDB[]>([])

    useEffect(() => {
        handleGetListFolder()
    }, [])

    useEffect(() => {
        testing()
    }, [])



    async function handleAddFolder() {
        const newFolder: baseItem = {
            label: "Untitled",
            type: "FOLDER",
            counter: 1,
            rename: true,
            open: false
        }

        await createNewFolder(newFolder)
        await handleGetListFolder()
    }

    async function handleAddSubFolder(id: string) {
        const newFolder: baseItem = {
            label: "Untitled",
            type: "FOLDER",
            counter: 1,
            rename: true,
            open: false
        }

        await createNewSubFolder(id, newFolder)
        await handleGetListFolder()

    }

    async function handleGetListFolder() {
        const data = await getListFolder()
        // setFolderTreeData(data)
    }

    async function handleRenameFolder(id: string, name: string) {
        await updateFolderName(id, name)
        await handleGetListFolder()
    }






    return <motion.div
        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
        variants={navAnimateVariant}
        animate={uiStore.sidebar == "SHOW" ? 'show' : 'hide'}
        className={
            clsx("border-r border-line-gray h-full  bg-white z-50 px-5 py-9",
                "w-screen absolute top-0",
                "md:min-w-[250px] md:max-w-[400px] md:relative")

        }>
        <div className="mx-auto w-fit flex gap-5">
            <button>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3H3C1.89543 3 1 3.89543 1 5V16C1 17.1046 1.89543 18 3 18H14C15.1046 18 16 17.1046 16 16V11M14.5858 1.58579C15.3668 0.804738 16.6332 0.804738 17.4142 1.58579C18.1953 2.36683 18.1953 3.63316 17.4142 4.41421L8.82842 13H6L6 10.1716L14.5858 1.58579Z" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

            </button>
            <button onClick={handleAddFolder}>
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 9H13M10 6V12M1 13V3C1 1.89543 1.89543 1 3 1H9L11 3H17C18.1046 3 19 3.89543 19 5V13C19 14.1046 18.1046 15 17 15H3C1.89543 15 1 14.1046 1 13Z" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

            </button>

        </div>
        <div className="mt-10">
            {
                folderTreeData.map((el) => (
                    <FolderTree folderData={el} callbackRename={handleRenameFolder} key={el.id} callbackSubFolder={handleAddSubFolder} />
                ))
            }

        </div>
    </motion.div>

}