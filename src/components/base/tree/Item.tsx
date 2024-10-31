import { BaseItem } from "@/types/rxSchema"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import Popover from "../popup/Popover"
import { getListSubItem, deleteFolder } from "@/service/noteService"
import { AnimatePresence, motion } from 'framer-motion'
import { useActivityStore } from "@/stores/activityStore"
import { useNavigate } from "react-router-dom"


interface Props {
    dataItem: BaseItem

    callbackRename: (id: string, newName: string) => Promise<void>
    callbackNewSubFolder: (id: string) => Promise<void>

    callbackNewSubFile: (id: string) => Promise<void>
    callbackDelete: (id: string) => Promise<void>

    isSubFolder?: boolean

    callbackUpdateSubFolder?: () => Promise<void>
    callbackDeleteSubFolder?: () => void

}

export default function Item(props: Readonly<Props>) {


    const routeNavigate = useNavigate()
    const activityStore = useActivityStore(state => state)

    const refInputLabel = useRef<HTMLInputElement>(null)
    const [renameMode, setRenameMode] = useState<boolean>(props.dataItem.rename)
    const [openSubFolderMode, setOpenSubFolderMode] = useState<boolean>(props.dataItem.open)
    const [listSubFolder, setListSubFolder] = useState<BaseItem[]>([])
    const [contentCount, setContentCount] = useState<number>(props.dataItem.childrenIds?.length ?? 0)
    const [itemName, setItemName] = useState<string>(props.dataItem.label)







    useEffect(() => {
        if (renameMode && refInputLabel.current) {
            refInputLabel.current.focus()
        }
    }, [renameMode])

    useEffect(() => {
        if (activityStore.updateFileId != '' && activityStore.updateFileId == props.dataItem.id) {
            setItemName(activityStore.valueUpdateFileLabel)
            activityStore.setupdateFileId('')
        }

    }, [activityStore.updateFileId])

    async function handleRename(e: React.FocusEvent<HTMLInputElement, Element>) {
        const value = e.target.value
        setItemName(value)
        await props.callbackRename(props.dataItem.id, value)
        setRenameMode(false)
    }

    async function handleToggleOpenItem(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation()
        if (props.dataItem.type == 'FILE') {

            activityStore.setActiveFile(props.dataItem.id)
            routeNavigate("/note")
            activityStore.setActiveAssetId("")
            return
        }
        const newValue = !openSubFolderMode

        if (newValue) {
            await handleListSubFolder()
            setOpenSubFolderMode(newValue)
        } else {
            setListSubFolder([])
            setOpenSubFolderMode(newValue)
        }



    }

    async function handleNewSubFolder(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation()
        await props.callbackNewSubFolder(props.dataItem.id)
        await handleListSubFolder()
        setOpenSubFolderMode(true)
        setContentCount(contentCount + 1)
    }

    async function handleNewSubFile(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation()
        await props.callbackNewSubFile(props.dataItem.id)
        await handleListSubFolder()
        setOpenSubFolderMode(true)
        setContentCount(contentCount + 1)
    }

    async function handleListSubFolder() {
        const data = await getListSubItem(props.dataItem.id)
        setListSubFolder(data)
    }

    async function handleDeleteFolder(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation()
        await deleteFolder(props.dataItem.id)
        await props.callbackDelete(props.dataItem.id)
        if (props.isSubFolder && props.callbackUpdateSubFolder && props.callbackDeleteSubFolder) {
            await props.callbackUpdateSubFolder()
            props.callbackDeleteSubFolder()
        }
    }

    function handleCallbackDeleteSubFolder() {
        setContentCount(contentCount - 1)
    }

    function handleRenameFolder(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation()
        setRenameMode(true)
    }



    return <div className="mb-1" style={{
        marginLeft: `${(props.dataItem.counter - 1) * 12}px`
    }}>
        <div className={clsx("p-2 flex items-center text-xs cursor-pointer", activityStore.activeFileId == props.dataItem.id && ("border-purple-primary border rounded text-purple-primary"))}
            onClick={handleToggleOpenItem}>
            <div>
                {openSubFolderMode && (<svg className="stroke-purple-primary" width="20" height="18" viewBox="0 0 46 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.48572 39.2L1.74286 36.4571V4.22857L4.48572 1.48572H17.4937L25.0434 9.03543" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M25.0297 9.02856H38.7646L41.5074 11.7577C41.5074 12.5668 41.5074 13.4926 41.5143 14.5143" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.48572 39.2L10.7394 19.184L13.3589 17.2571H41.8914L44.5109 20.8229L39.3406 37.28L36.7211 39.2H4.48572Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>)}

                {!openSubFolderMode && props.dataItem.type == "FOLDER" && contentCount == 0 && (
                    <svg width="20" height="18" viewBox="0 0 46 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.344 8.65711H42.1931L44.936 11.3863C44.9634 17.352 44.9223 31.5051 44.9017 37.4708L42.1588 40.2H3.79999L1.05713 37.4571V3.85711L3.79999 1.11426H16.808L24.344 8.65711Z"
                            className={clsx(props.dataItem ? "stroke-purple-primary" : 'stroke-black')}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round" />
                    </svg>
                )}

                {!openSubFolderMode && props.dataItem.type == "FOLDER" && contentCount > 0 && (
                    <svg className="stroke-purple-primary" width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25.344 24H43.1931L45.936 26.7292C45.9634 32.6949 45.9223 36.5623 45.9017 42.528L43.1589 45.2572H4.8L2.05714 42.5143V19.2L4.8 16.4572H17.808L25.344 24Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.85715 13.7143V2.74286H37.0286V6.17143" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.0286 13.7143V8.91431H43.2V21.2572" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                )}

                {props.dataItem.type == "FILE" && (
                    <svg width="16" height="22" viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5115 0.267665C11.6987 0.243237 11.9114 0.345305 11.9273 0.57387C16.6796 4.61332 21.1291 8.99639 25.2396 13.6878C25.4327 13.9084 25.289 14.2013 25.0839 14.2791C25.0617 14.3194 25.0319 14.3549 24.9961 14.3837C24.9601 14.4125 24.9188 14.4341 24.8745 14.447L24.364 14.6062C24.4337 14.689 24.4572 14.8091 24.4357 14.9201C24.4375 14.9351 24.4385 14.9507 24.4385 14.9669L25.1975 31.1455C25.2053 31.3954 24.9876 31.5065 24.7925 31.4787C24.758 31.4903 24.7197 31.4968 24.6775 31.4968C16.7998 31.8622 8.90842 31.82 1.03506 31.3703C0.879529 31.3605 0.777776 31.2735 0.729806 31.1638C0.692309 31.1117 0.669434 31.0447 0.669434 30.9627L1.70962 1.19181C1.70962 1.09861 1.74662 1.00923 1.81252 0.943333C1.85879 0.89707 1.91663 0.865039 1.97924 0.850057C2.03232 0.809356 2.10178 0.784266 2.18763 0.784266H11.1166C10.9257 0.532716 11.2234 0.194429 11.5115 0.267665ZM22.8991 14.5519C22.9046 14.5019 22.9207 14.4533 22.9471 14.4094C22.9944 14.3306 23.0707 14.2734 23.1596 14.2502L24.4546 13.8463C20.5758 9.44768 16.4041 5.3166 11.9682 1.48123L12.5347 13.9304C15.9644 14.4483 19.4332 14.6562 22.8991 14.5519ZM11.8392 14.0923C11.7428 14.2792 11.7867 14.5267 12.0406 14.5594C15.9113 15.1706 19.8333 15.3926 23.7477 15.2224L24.4787 30.8031C16.7827 31.1534 9.07389 31.1147 1.38187 30.687L2.40211 1.48707H11.2657L11.8392 14.0923Z" />
                        <path d="M11.5115 0.267665C11.6987 0.243237 11.9114 0.345305 11.9273 0.57387C16.6796 4.61332 21.1291 8.99639 25.2396 13.6878C25.4327 13.9084 25.289 14.2013 25.0839 14.2791C25.0617 14.3194 25.0319 14.3549 24.9961 14.3837C24.9601 14.4125 24.9188 14.4341 24.8745 14.447L24.364 14.6062C24.4337 14.689 24.4572 14.8091 24.4357 14.9201C24.4375 14.9351 24.4385 14.9507 24.4385 14.9669L25.1975 31.1455C25.2053 31.3954 24.9876 31.5065 24.7925 31.4787C24.758 31.4903 24.7197 31.4968 24.6775 31.4968C16.7998 31.8622 8.90842 31.82 1.03506 31.3703C0.879529 31.3605 0.777776 31.2735 0.729806 31.1638C0.692309 31.1117 0.669434 31.0447 0.669434 30.9627L1.70962 1.19181C1.70962 1.09861 1.74662 1.00923 1.81252 0.943333C1.85879 0.89707 1.91663 0.865039 1.97924 0.850057C2.03232 0.809356 2.10178 0.784266 2.18763 0.784266H11.1166C10.9257 0.532716 11.2234 0.194429 11.5115 0.267665ZM22.8991 14.5519C22.9046 14.5019 22.9207 14.4533 22.9471 14.4094C22.9944 14.3306 23.0707 14.2734 23.1596 14.2502L24.4546 13.8463C20.5758 9.44768 16.4041 5.3166 11.9682 1.48123L12.5347 13.9304C15.9644 14.4483 19.4332 14.6562 22.8991 14.5519ZM11.8392 14.0923C11.7428 14.2792 11.7867 14.5267 12.0406 14.5594C15.9113 15.1706 19.8333 15.3926 23.7477 15.2224L24.4787 30.8031C16.7827 31.1534 9.07389 31.1147 1.38187 30.687L2.40211 1.48707H11.2657L11.8392 14.0923Z" className="stroke-purple-primary" />
                    </svg>

                )}

            </div>

            {renameMode ? (
                <input ref={refInputLabel} className="font-comic-neue  border-sketch ml-4 box-border p-1 border-purple-primary border rounded w-full"
                    placeholder="Folder Name"
                    defaultValue={itemName} onBlur={handleRename} />
            ) : (

                <span className="font-comic-neue ml-4 p-1 w-full">
                    {itemName}
                </span>
            )}


            <Popover buttonChildren={<svg width="15" height="15" viewBox="0 0 20 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_102_2)">
                    <path d="M0.591087 50.5989C0.592856 51.7242 0.819022 52.838 1.25648 53.875C1.69394 54.9122 2.33391 55.852 3.13899 56.6396C3.89741 57.3912 4.80064 57.9813 5.79394 58.3748C6.78725 58.7683 7.85007 58.9569 8.91833 58.9289C13.1959 58.8046 17.2935 54.7884 17.5142 50.5028C17.5286 49.6368 17.3677 48.777 17.0413 47.9745C16.7148 47.1721 16.2293 46.444 15.6142 45.8334C14.6886 44.876 13.5826 44.1106 12.3598 43.5815C11.1369 43.0523 9.82116 42.7696 8.48854 42.7499C7.45572 42.7182 6.42697 42.893 5.46269 43.2637C4.49834 43.6344 3.61792 44.1936 2.87299 44.9085C2.13376 45.6546 1.55124 46.5406 1.15938 47.5143C0.767591 48.4881 0.574315 49.5301 0.591087 50.5794L0.591087 50.5989Z" fill="black" />
                    <path d="M5.49679 89.6941C4.25524 91.1403 3.5907 92.992 3.63014 94.896C3.63171 95.5737 3.70286 96.2487 3.84235 96.9113C4.0881 98.2751 4.6469 99.5636 5.47484 100.676C6.30285 101.788 7.37759 102.693 8.61476 103.322C9.62936 103.807 10.755 104.012 11.8757 103.917C12.9965 103.822 14.0717 103.431 14.9902 102.782C17.9896 100.886 19.4715 96.6627 18.3649 93.1673C17.2511 89.6516 13.419 87.2092 9.25407 87.3609C9.13699 87.3649 9.02299 87.4002 8.92334 87.4617C8.73072 87.582 8.47769 87.707 8.19662 87.8482C7.18897 88.2898 6.27323 88.9157 5.49679 89.6941Z" fill="black" />
                    <path d="M0.848069 7.3156C0.812231 7.60111 0.794279 7.88858 0.794344 8.17631C0.808365 9.84456 1.38878 11.4587 2.44073 12.7549C3.12126 13.6069 3.964 14.3162 4.92036 14.8414C5.87671 15.3667 6.92787 15.6978 8.01303 15.8155C12.1675 16.2577 16.149 13.4829 16.7091 9.7579C16.844 8.78788 16.7799 7.8008 16.5209 6.85632C16.2618 5.91183 15.8132 5.0297 15.2022 4.2636C14.464 3.32045 13.5441 2.53463 12.4967 1.95226C11.4493 1.36988 10.2956 1.0027 9.10377 0.872755C8.13575 0.739722 7.15083 0.802136 6.20731 1.05608C5.26387 1.31002 4.38102 1.75036 3.61113 2.35116C2.84124 2.95196 2.20008 3.70085 1.72541 4.5536C1.2508 5.40634 0.952503 6.34562 0.848069 7.3156Z" fill="black" />
                </g>
                <defs>
                    <clipPath id="clip0_102_2">
                        <rect width="104" height="19" fill="white" transform="translate(19.2773 0.5) rotate(90)" />
                    </clipPath>
                </defs>
            </svg>}>

                <div className="flex flex-col font-comic-neue">

                    {props.dataItem.type == "FOLDER" && (
                        <>
                            <button className="text-xs text-left p-1 hover:bg-gray-200 rounded transition-colors" onClick={handleRenameFolder}>
                                Rename
                            </button>
                            <button className="text-xs text-left p-1 hover:bg-gray-200 rounded transition-colors" onClick={handleNewSubFolder}>
                                Make Folder
                            </button>
                            <button className="text-xs text-left p-1 hover:bg-gray-200 rounded transition-colors" onClick={handleNewSubFile}>
                                Make File
                            </button>
                        </>

                    )}


                    <button className="text-xs text-left p-1 hover:bg-gray-200 rounded transition-colors text-red-600" onClick={handleDeleteFolder}>
                        Delete
                    </button>
                </div>


            </Popover>

        </div>

        {/* LIST SUB FOLDER */}
        <AnimatePresence>
            {openSubFolderMode && (
                <motion.div className="overflow-hidden" initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}>
                    <AnimatePresence mode="popLayout">
                        {listSubFolder.map((el) => (
                            <motion.div key={el.id} initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }} className="overflow-hidden">
                                <Item dataItem={el} callbackNewSubFolder={props.callbackNewSubFolder} callbackNewSubFile={props.callbackNewSubFile}
                                    callbackRename={props.callbackRename}
                                    isSubFolder={true}
                                    callbackUpdateSubFolder={handleListSubFolder}
                                    callbackDelete={props.callbackDelete}
                                    callbackDeleteSubFolder={handleCallbackDeleteSubFolder}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                </motion.div>
            )}
        </AnimatePresence>

    </div>
}