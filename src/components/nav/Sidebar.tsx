import { createNewFolder, createNewSubFolder, getListFolder, testing, updateFolderName } from '@/service/noteService'
import { useUiStore } from '@/stores/uiStore'
import { itemFromDB, } from '@/types/note'
import { BaseItem } from '@/types/rxSchema'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Item from '../base/tree/Item'

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
    const [folderTreeData, setFolderTreeData] = useState<BaseItem[]>([])

    useEffect(() => {
        handleGetListFolder()
    }, [])

    useEffect(() => {
        testing()
    }, [])



    async function handleAddFolder() {
        const newFolder: BaseItem = {
            id: uuidv4(),
            label: "Untitled",
            type: "FOLDER",
            counter: 1,
            rename: true,
            open: false,
            content: "",
            path: "",
            parentId: "",
            childrenIds: []
        }

        await createNewFolder(newFolder)
        await handleGetListFolder()
    }

    async function handleAddSubFolder(id: string) {
        const newFolder: BaseItem = {
            id: uuidv4(),
            label: "Untitled Sub Folder",
            type: "FOLDER",
            counter: 0,
            rename: true,
            open: false,
            content: "",
            path: "",
            parentId: "",
            childrenIds: []
        }

        await createNewSubFolder(id, newFolder)
    }

    async function handleGetListFolder() {
        const data = await getListFolder()
        setFolderTreeData(data)
    }

    async function handleRenameFolder(id: string, name: string) {
        await updateFolderName(id, name)
        await handleGetListFolder()
    }

    async function handleDeleteFolder(id: string) {
        await handleGetListFolder()
    }






    return <motion.div
        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
        variants={navAnimateVariant}
        animate={uiStore.sidebar == "SHOW" ? 'show' : 'hide'}
        className={
            clsx("border-r border-line-gray h-full  bg-white z-50 px-5 py-9 overflow-hidden",
                "w-screen absolute top-0",
                "md:min-w-[250px] md:max-w-[400px] md:relative")

        }>
        <div >
            <button className='flex px-1 py-2 bg-purple-primary text-white rounded text-sm gap-2 w-full justify-center font-comic-neue items-center'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.00696 4.53447C6.71496 4.69559 6.23291 3.85183 6.08362 4.14974C5.74756 4.82253 6.53212 8.41527 6.54527 8.61125C6.72612 11.3195 6.52949 14.054 6.69917 16.7655C6.70837 16.9076 6.58145 19.6493 6.69917 19.6881C7.32854 19.8979 9.60537 19.0094 10.238 18.9193C11.4705 18.7431 16.3174 18.8792 17.1611 18.4577C17.7109 18.1828 17.3144 10.8835 17.3144 10.1502C17.3144 9.2071 18.1009 5.41441 17.6222 4.45752C17.2782 3.76961 16.078 4.55288 15.3145 4.45752C12.7555 4.1379 8.74448 3.57429 7.00696 4.53447Z" stroke="white" strokeWidth="1.31531" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.85284 7.3808C10.4957 7.3808 12.1332 7.5347 13.776 7.5347" stroke="white" strokeWidth="1.31531" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.77635 10.1502C8.97073 10.4185 12.4984 10.1502 13.3145 10.1502" stroke="white" strokeWidth="1.31531" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.93029 13.6884C11.1187 13.6884 12.2794 13.3806 13.4685 13.3806" stroke="white" strokeWidth="1.31531" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Write note</span>
            </button>

            <button onClick={handleAddFolder} className='flex px-1 py-2 border border-purple-primary text-purple-primary rounded text-sm gap-2 w-full justify-center font-comic-neue items-center mt-3 border-sketch'>
                <svg width="26" height="20" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.572867 1.44599L1.31695 24.948C1.31695 25.1081 1.40785 25.2113 1.52428 25.2574C1.53953 25.319 1.5713 25.3758 1.61691 25.4214C1.68281 25.4873 1.77219 25.5244 1.86538 25.5244L30.9756 25.2713L30.9839 25.2712C31.1975 25.3265 31.4591 25.2188 31.4253 24.9479C30.8349 18.9319 30.5304 12.9018 30.5116 6.85771C30.5116 6.81876 30.5052 6.78048 30.4928 6.74429C30.608 6.53021 30.5112 6.19184 30.2024 6.21114L17.5763 6.83942C15.449 5.03219 13.5566 2.96532 11.9434 0.687064C11.9302 0.669005 11.9162 0.652731 11.9015 0.638152C11.8457 0.561912 11.7566 0.508154 11.6343 0.50433C8.12243 0.422222 4.60868 0.516048 1.10623 0.785454C0.868192 0.785454 0.756126 0.990156 0.770031 1.17873C0.665319 1.22057 0.583168 1.30966 0.572867 1.44599ZM0.572867 1.44599L0.571981 1.41801V1.46252M0.572867 1.44599C0.572457 1.45143 0.572161 1.45693 0.571981 1.46252M0.571981 1.46252V1.48829C0.571708 1.47953 0.571711 1.47094 0.571981 1.46252ZM1.27479 1.48829L1.27459 1.47545C4.6572 1.22072 8.05016 1.12973 11.4416 1.20281C12.9288 3.28602 14.6465 5.19376 16.5618 6.8899L6.75679 7.3778C6.30699 7.3778 6.29294 8.09466 6.75679 8.08061L29.8089 6.93353C29.8113 12.8261 30.1033 18.7052 30.6847 24.5711L2.0157 24.8202L1.27479 1.48829ZM4.03937 7.97769C3.97347 8.04359 3.88409 8.08061 3.79089 8.08061C3.6977 8.08061 3.6083 8.04359 3.5424 7.97769C3.4765 7.91179 3.43949 7.8224 3.43949 7.72921C3.43949 7.63601 3.4765 7.54663 3.5424 7.48073C3.6083 7.41483 3.6977 7.3778 3.79089 7.3778C3.88409 7.3778 3.97347 7.41483 4.03937 7.48073C4.10527 7.54663 4.1423 7.63601 4.1423 7.72921C4.1423 7.8224 4.10527 7.91179 4.03937 7.97769Z" className='fill-purple-primary' />
                    <path d="M0.572867 1.44599L1.31695 24.948C1.31695 25.1081 1.40785 25.2113 1.52428 25.2574C1.53953 25.319 1.5713 25.3758 1.61691 25.4214C1.68281 25.4873 1.77219 25.5244 1.86538 25.5244L30.9756 25.2713L30.9839 25.2712C31.1975 25.3265 31.4591 25.2188 31.4253 24.9479C30.8349 18.9319 30.5304 12.9018 30.5116 6.85771C30.5116 6.81876 30.5052 6.78048 30.4928 6.74429C30.608 6.53021 30.5112 6.19184 30.2024 6.21114L17.5763 6.83942C15.449 5.03219 13.5566 2.96532 11.9434 0.687064C11.9302 0.669005 11.9162 0.652731 11.9015 0.638152C11.8457 0.561912 11.7566 0.508154 11.6343 0.50433C8.12243 0.422222 4.60868 0.516048 1.10623 0.785454C0.868192 0.785454 0.756126 0.990156 0.770031 1.17873C0.665319 1.22057 0.583168 1.30966 0.572867 1.44599ZM0.572867 1.44599L0.571981 1.41801V1.46252M0.572867 1.44599C0.572457 1.45143 0.572161 1.45693 0.571981 1.46252M0.571981 1.46252V1.48829C0.571708 1.47953 0.571711 1.47094 0.571981 1.46252ZM1.27479 1.48829L1.27459 1.47545C4.6572 1.22072 8.05016 1.12973 11.4416 1.20281C12.9288 3.28602 14.6465 5.19376 16.5618 6.8899L6.75679 7.3778C6.30699 7.3778 6.29294 8.09466 6.75679 8.08061L29.8089 6.93353C29.8113 12.8261 30.1033 18.7052 30.6847 24.5711L2.0157 24.8202L1.27479 1.48829ZM4.03937 7.97769C3.97347 8.04359 3.88409 8.08061 3.79089 8.08061C3.6977 8.08061 3.6083 8.04359 3.5424 7.97769C3.4765 7.91179 3.43949 7.8224 3.43949 7.72921C3.43949 7.63601 3.4765 7.54663 3.5424 7.48073C3.6083 7.41483 3.6977 7.3778 3.79089 7.3778C3.88409 7.3778 3.97347 7.41483 4.03937 7.48073C4.10527 7.54663 4.1423 7.63601 4.1423 7.72921C4.1423 7.8224 4.10527 7.91179 4.03937 7.97769Z" className='stroke-purple-primary' />
                </svg>
                <span>Make folder</span>

            </button>
        </div>

        <div className='mt-10'>
            <AnimatePresence mode='popLayout'>
                {folderTreeData.map((el) => (
                    <motion.div key={el.id} initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }} >
                        <Item dataItem={el} callbackRename={handleRenameFolder}
                            callbackNewSubFolder={handleAddSubFolder}
                            callbackDelete={handleDeleteFolder} />
                    </motion.div>
                ))}
            </AnimatePresence>

        </div>

    </motion.div>

}