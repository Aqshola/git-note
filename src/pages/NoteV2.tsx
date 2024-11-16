
import { getDetailFile, getItemPath, saveContent, updateFileName } from '@/service/noteService'
import { useActivityStore } from '@/stores/activityStore'
import { BaseItem } from '@/types/rxSchema'
import CodeBlock from '@tiptap/extension-code-block'
import { EditorContent, JSONContent, useEditor, FloatingMenu, } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import Image from "@tiptap/extension-image";
import { getAssetsByListId, saveAsset } from '@/service/assetService'
import { Popover } from 'react-tiny-popover'



export default function NoteV2() {


    const activityStore = useActivityStore(state => state)

    const refInputTitle = useRef<HTMLInputElement>(null);
    const refInputImage = useRef<HTMLInputElement>(null)

    const [noteData, setNoteData] = useState<BaseItem>()
    const [listPath, setListPath] = useState<Array<{ id: string, label: string }>>([])
    const [noteLabel, setNoteLabel] = useState<string>("")
    const [noteContent, setNoteContent] = useState<string>()
    const [showSubMenuImage, setShowSubMenuImage] = useState(false)










    const CustomImageExtension = Image.extend({
        addAttributes() {
            return {
                ...this.parent?.(),
                class: {
                    default: null,
                },
                "data-id-file": {
                    default: null
                }
            }
        },
    })
    const tiptapExtension = [
        StarterKit,
        CodeBlock.configure({
            HTMLAttributes: {
                class: "bg-soft-gray rounded text-black text-sm jetbrains-mono p-3 my-1"
            }
        }),
        CustomImageExtension

    ]
    const editorTipTap = useEditor({
        extensions: tiptapExtension,
        editorProps: {
            attributes: {
                class: "min-h-screen border-none outline-none text-sm  font-comic-neue ",
            },
            handlePaste(_, event, __) {
                handlePasteContent(event)
            }
        },

        onUpdate: debounce(async ({ editor }) => {
            const content = editor.getJSON()
            if (!noteData) return
            await saveContent(noteData?.id, content)

        }, 300),
    })



    useEffect(() => {
        if (activityStore.activeFileId != '' && refInputTitle.current) {
            handleGetDetailFile()
        }
    }, [activityStore.activeFileId])





    function handleChangeLabel(e: React.ChangeEvent<HTMLInputElement>) {
        setNoteLabel(e.target.value)
    }

    function handleLabelEnterPressed(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            editorTipTap?.commands.focus()

        }

    }


    async function handleGetDetailFile() {
        const dataDetail = await getDetailFile(activityStore.activeFileId)

        if (!dataDetail) {
            activityStore.setActiveFile("");
            return
        }
        const path = await getItemPath(dataDetail?.path || [])
        setNoteContent(dataDetail.content)
        setNoteLabel(dataDetail.label)
        setNoteData(dataDetail)
        setListPath(path)


        if (dataDetail.content != "") {
            const parse = JSON.parse(dataDetail.content) as JSONContent
            const imageList = parse.content?.filter(content => content.type == 'image' && content?.attrs?.class.includes("image-asset-blob")).map(content => content?.attrs?.['data-id-file']) || []
            const listImage = await getAssetsByListId(imageList)

            parse.content?.map((node) => {
                if (node.type == 'image' && node?.attrs?.class.includes("image-asset-blob")) {
                    const imageId = node?.attrs?.['data-id-file']
                    if (imageId) {
                        const blob = listImage[imageId] as File

                        if (blob) {
                            const srcImage = URL.createObjectURL(blob)
                            node.attrs.src = srcImage
                        }
                    }

                }
                return node
            })

            editorTipTap?.commands.setContent(parse)
        } else {
            editorTipTap?.commands.setContent("")
        }
        refInputTitle.current?.select()
    }

    async function handleBlurLabel(e: React.FocusEvent<HTMLInputElement, Element>) {
        e.stopPropagation()
        await updateFileName(noteData?.id ?? "", e.target.value)
        activityStore.setValueUpdateFileLabel(e.target.value)
        activityStore.setupdateFileId(noteData?.id ?? '')
    }

    async function handlePasteContent(event: ClipboardEvent) {
        const items = event.clipboardData?.items;
        if (!items || items.length == 0) return false;
        event.preventDefault();

        const blob = items[0].getAsFile();
        if (!blob) return false;

        const newAsset = await saveAsset(blob)
        await newAsset.attach

        const objectUrl = URL.createObjectURL(blob)
        if (!editorTipTap) return
        editorTipTap.chain()
            .focus()
            .insertContent([
                {
                    type: "image",
                    attrs: { src: objectUrl, class: "image-asset-blob h-auto md:max-w-[500px]", "data-id-file": newAsset.asset.id },

                },
                {
                    type: "paragraph",
                    content: "",
                },
            ])
            .run();

        activityStore.setRefereshAssetList(true)
    }

    async function handleUploadImage() {
        if (!refInputImage.current) return
        refInputImage.current.click()
    }

    async function handleChangeUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files
        if (file?.length == 0 || !file) return

        const firstImage = file[0]
        const newAsset = await saveAsset(firstImage)
        await newAsset.attach

        const objectUrl = URL.createObjectURL(firstImage)
        if (!editorTipTap) return
        editorTipTap.chain()
            .focus()
            .insertContent([
                {
                    type: "image",
                    attrs: { src: objectUrl, class: "image-asset-blob h-auto md:max-w-[500px]", "data-id-file": newAsset.asset.id },

                },
                {
                    type: "paragraph",
                    content: "",
                },
            ])
            .run();

        activityStore.setRefereshAssetList(true)


    }







    return (

        <motion.div className="w-full  flex flex-col mx-auto h-full overflow-hidden relative box-border" transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}>
            {activityStore.activeFileId == '' && (
                <div className='w-full flex flex-col h-full  items-center '>
                    <h2 className='text-center text-2xl font-comic-neue font-bold mt-32'>No File is open</h2>
                    <button className='mt-5 text-purple-primary'>Create new note</button>
                </div>
            )}
            {activityStore.activeFileId != '' && (

                <div className='flex flex-col w-full  px-0 md:px-36 overflow-y-scroll relative'>
                    <div className='flex gap-2 text-xs font-comic-neue font-light w-fit flex-wrap justify-center mx-auto mt-3'>
                        {listPath.map((item) => (
                            <div key={item.id}>
                                <span className='mr-1'>{item.label}</span>
                                <span>/</span>
                            </div>
                        ))}
                        <div >
                            <span className='font-semibold'>{noteLabel}</span>
                        </div>
                    </div>
                    <div className='px-8 py-10 font-comic-neue h-full box-border'>
                        <input type="text" value={noteLabel} className='font-bold text-xl w-full border-none outline-none'
                            ref={refInputTitle}
                            onChange={handleChangeLabel}
                            onBlurCapture={handleBlurLabel}
                            onKeyDown={handleLabelEnterPressed}
                        />


                        <EditorContent editor={editorTipTap} className='mt-3 h-full' />
                    </div>

                </div>
            )}
            <div className='w-full sticky bottom-0 px-8 md:px-40 py-2 shadow'>

                <input type="file" className='hidden' ref={refInputImage} onChange={handleChangeUpload} />
                <Popover onClickOutside={() => { setShowSubMenuImage(false) }} isOpen={showSubMenuImage} positions={"top"} padding={10} content={
                    <div className='text-xs flex flex-col items-start shadow-sm p-1 rounded'>
                        <button onClick={handleUploadImage} className='hover:bg-gray-200 p-2 transition-colors w-full'>Upload Image</button>
                        <button className='hover:bg-gray-200 p-2 transition-colors w-full'>Link Image</button>
                    </div>
                }>
                    <button onClick={() => { setShowSubMenuImage(!showSubMenuImage) }}>
                        <svg width={15} height={15} viewBox="0 0 156 156" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M51.3816 53.2803C54.1411 55.8328 57.5193 56.971 62.3378 56.971C62.3609 56.9733 62.3841 56.9733 62.4071 56.971C62.5554 56.9573 62.7373 56.9443 62.9431 56.93C63.4894 56.8917 64.2377 56.8377 64.9725 56.7285C67.0872 56.4465 69.1236 55.7401 70.9607 54.6514C72.7984 53.5626 74.3985 52.1137 75.6666 50.391C76.8757 48.6838 77.7308 46.7497 78.18 44.7038C78.6293 42.6579 78.6636 40.5421 78.2817 38.4825C77.4758 33.7759 75.2393 30.7682 71.6442 29.5456C69.1922 28.7181 66.5946 28.4137 64.0189 28.6518C61.4429 28.8901 58.9447 29.6656 56.6843 30.9288C54.5114 32.1174 52.6139 33.7547 51.1166 35.7328C49.6193 37.711 48.5563 39.9853 47.9975 42.4058C47.0136 46.6334 48.1522 50.2935 51.3816 53.2803ZM64.6786 36.7853C64.8081 36.7853 64.9414 36.7853 65.0702 36.7853C67.2458 36.7853 68.9644 37.0531 69.7955 39.2416C70.2163 40.4323 70.2739 41.7219 69.9593 42.9453C69.6453 44.1688 68.9741 45.27 68.0323 46.1076C65.6754 48.2565 60.6374 48.8304 57.8631 47.2671C56.0875 46.2674 55.5464 45.0234 55.995 42.9739C56.9109 38.7892 59.6697 36.8243 64.6786 36.7853Z" fill="black" />
                            <path d="M32.8781 154.127C34.4776 154.062 36.1353 153.997 37.7439 153.997C47.5751 154.046 56.5597 154.144 65.2106 154.297C79.0629 154.541 93.2058 154.841 107.241 155.188C108.387 155.25 109.526 155.41 110.645 155.665C111.195 155.774 111.746 155.882 112.294 155.97C112.329 155.976 112.364 155.979 112.399 155.979H119.022C119.055 155.979 119.087 155.976 119.119 155.971C120.447 155.776 121.779 155.598 123.111 155.422C125.991 155.042 128.97 154.649 131.865 154.034C145.162 151.213 155.827 137.547 155.639 123.568C155.513 114.22 155.538 104.712 155.562 95.5162C155.579 88.9168 155.595 82.0937 155.558 75.3818C155.522 69.2458 155.305 63.0122 155.096 56.9867L154.962 53.1159C154.914 51.6651 154.871 50.2135 154.832 48.761C154.703 43.9841 154.567 39.0447 154.098 34.208C153.602 29.443 152.714 24.7274 151.444 20.1096C147.91 6.97957 135.391 0.810472 124.556 0.525123C121.459 0.443873 118.324 0.663455 115.291 0.875355C113.009 1.03525 110.651 1.20035 108.34 1.23415C102.051 1.32645 95.6533 1.36416 89.4696 1.40316C81.3298 1.45256 72.9129 1.50465 64.6352 1.6769L63.3894 1.70357C51.5224 1.95057 39.2502 2.20529 27.2239 3.14194C14.2578 4.15139 5.66227 10.3836 1.67488 21.667C1.00579 23.383 0.613729 25.1952 0.513584 27.0353L0.448867 32.4667C0.25144 48.3338 0.0468939 64.7419 0.0947943 80.8815C0.115508 88.129 0.358876 95.4922 0.594497 102.613C0.723958 106.605 0.863135 110.731 0.958288 114.789C1.06315 119.209 1.10007 122.925 0.940189 126.69C0.357619 140.351 12.2278 153.461 25.8393 154.196C28.1897 154.322 30.5737 154.223 32.8781 154.127ZM8.50715 38.6314C8.42682 32.8611 9.78745 27.1627 12.4648 22.0564C14.909 17.5194 18.5086 14.6898 22.876 13.8747C29.7885 12.5845 36.5567 11.4106 43.3728 11.226C60.6953 10.7554 78.314 10.4798 95.351 10.2133C103.941 10.0784 112.531 9.9361 121.121 9.78621C125.717 9.70041 130.27 11.0564 135.473 14.049C141.152 17.3133 142.962 23.2004 143.984 28.5291C146.13 39.7195 147.078 49.1009 146.969 58.0514C146.925 61.5805 146.893 65.1183 146.872 68.666C146.628 68.4405 146.391 68.2065 146.136 67.9939C142.776 65.1918 139.32 62.3947 135.977 59.69C131.948 56.4296 127.782 53.06 123.761 49.6585C118.514 45.2229 115.452 45.3361 110.653 50.1448C99.2393 61.5776 87.5646 73.2271 76.2737 84.4929L63.5085 97.2329L63.2826 97.0463C62.8664 96.7025 62.5285 96.4236 62.188 96.1493C60.404 94.7057 58.6228 93.2588 56.8445 91.8092C52.5076 88.2772 48.0166 84.6255 43.5385 81.1103C40.2891 78.5597 37.964 78.5948 34.9624 81.2325C26.163 88.9675 17.269 96.8539 8.62554 104.523C8.53751 84.1692 8.47284 61.6297 8.50715 38.6314ZM9.51629 112.695C11.1993 111.275 12.8788 109.851 14.5549 108.422C17.7228 105.729 20.9982 102.944 24.2547 100.253C27.7418 97.3694 31.3466 94.4723 34.833 91.6728C36.2687 90.5184 37.7105 89.3575 39.1582 88.1907C41.0937 89.7585 43.014 91.3133 44.9192 92.8532C49.8918 96.8734 54.5894 100.669 59.3483 104.586C63.1202 107.691 65.4106 107.576 68.7773 104.122C69.9055 102.963 71.0156 101.786 72.1251 100.612C73.5777 99.0704 75.0794 97.4773 76.5973 95.9595C88.0643 84.4981 99.7462 72.8676 111.044 61.6199L115.97 56.7156C116.445 56.2411 116.957 55.7848 117.368 55.4156L117.407 55.3818C119.511 57.0354 121.6 58.6821 123.674 60.3218C129.877 65.2204 135.736 69.8477 141.814 74.4569C143.354 75.5281 145.045 76.3627 146.83 76.9334C146.792 89.1469 146.836 101.358 146.881 113.3C146.896 116.932 146.909 120.564 146.92 124.195C146.948 132.995 139.891 142.63 131.508 145.233C125.235 147.137 118.685 147.952 112.139 147.642C103.227 147.274 94.1651 146.843 85.4052 146.427C81.7583 146.254 78.1107 146.08 74.4625 145.907H74.4321L64.5827 145.903C59.2781 145.9 53.9739 145.898 48.6704 145.898C42.9145 145.898 37.1588 145.902 31.403 145.911H31.3343C24.8043 145.911 19.9075 144.263 15.9285 140.73C11.0485 136.394 8.75571 130.455 8.71234 122.038C8.69745 119.217 8.68321 116.33 8.66897 113.393C8.95443 113.165 9.23989 112.928 9.51629 112.695Z" fill="black" />
                        </svg>
                    </button>

                </Popover>






            </div>
        </motion.div>

    )
}