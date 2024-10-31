import PageLayout from '@/components/layout/PageLayout'
import { getDetailFile, getItemPath, saveContent, updateFileName } from '@/service/noteService'
import { useActivityStore } from '@/stores/activityStore'
import { BaseItem } from '@/types/rxSchema'
import CodeBlock from '@tiptap/extension-code-block'
import { EditorContent, JSONContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import Image from "@tiptap/extension-image";
import { getAssetsByListId, saveAsset } from '@/service/assetService'
import { EditorView } from '@tiptap/pm/view'


export default function NoteV2() {

    const activityStore = useActivityStore(state => state)
    const refInputTitle = useRef<HTMLInputElement>(null);
    const [noteData, setNoteData] = useState<BaseItem>()
    const [listPath, setListPath] = useState<Array<{ id: string, label: string }>>([])
    const [noteLabel, setNoteLabel] = useState<string>("")
    const [noteContent, setNoteContent] = useState<string>()


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

        }, 300)
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






    return (
        <PageLayout>
            <motion.div className="w-full  flex flex-col mx-auto h-full overflow-hidden relative box-border" transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}>
                {activityStore.activeFileId == '' && (
                    <div className='w-full flex flex-col h-full  items-center '>
                        <h2 className='text-center text-2xl font-comic-neue font-bold mt-32'>No File is open</h2>
                        <button className='mt-5 text-purple-primary'>Create new note</button>
                    </div>
                )}
                {activityStore.activeFileId != '' && (

                    <div className='flex flex-col w-full  px-0 md:px-36 overflow-y-scroll'>
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
            </motion.div>
        </PageLayout>
    )
}