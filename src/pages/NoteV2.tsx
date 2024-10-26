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
export default function NoteV2() {

    const activityStore = useActivityStore(state => state)
    const refInputTitle = useRef<HTMLInputElement>(null);
    const [noteData, setNoteData] = useState<BaseItem>()
    const [listPath, setListPath] = useState<Array<{ id: string, label: string }>>([])
    const [noteLabel, setNoteLabel] = useState<string>("")
    const [noteContent, setNoteContent] = useState<string>()


    const tiptapExtension = [
        StarterKit,
        CodeBlock.configure({
            HTMLAttributes: {
                class: "bg-soft-gray rounded text-black text-sm jetbrains-mono p-3 my-1"
            }
        })
    ]
    const editorTipTap = useEditor({
        extensions: tiptapExtension,
        editorProps: {
            attributes: {
                class: "min-h-screen border-none outline-none text-sm  font-comic-neue ",
            },
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
            editorTipTap?.commands.setContent(parse)
        }
        refInputTitle.current?.select()
    }

    async function handleBlurLabel(e: React.FocusEvent<HTMLInputElement, Element>) {
        e.stopPropagation()
        await updateFileName(noteData?.id || "", e.target.value)
        activityStore.setValueUpdateFileLabel(e.target.value)
        activityStore.setupdateFileId(noteData?.id || '')
    }






    return (
        <PageLayout>
            <motion.div className="w-full md:w-3/5 mx-auto relative" transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}>
                {activityStore.activeFileId == '' && (
                    <div className='w-full flex flex-col h-full  items-center '>
                        <h2 className='text-center text-2xl font-comic-neue font-bold mt-32'>No File is open</h2>
                        <button className='mt-5 text-purple-primary'>Create new note</button>
                    </div>
                )}
                {activityStore.activeFileId != '' && (

                    <div className=''>
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
                        <div className='px-8 py-10 font-comic-neue '>
                            <input type="text" value={noteLabel} className='font-bold text-xl w-full border-none outline-none'
                                ref={refInputTitle}
                                onChange={handleChangeLabel}
                                onBlurCapture={handleBlurLabel}
                                onKeyDown={handleLabelEnterPressed}
                            />
                            <EditorContent editor={editorTipTap} className='mt-3' />
                        </div>
                    </div>
                )}
            </motion.div>
        </PageLayout>
    )
}