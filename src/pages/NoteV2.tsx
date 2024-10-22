import PageLayout from '@/components/layout/PageLayout'
import { getDetailFile, getItemPath, updateFileName } from '@/service/noteService'
import { useActivityStore } from '@/stores/activityStore'
import { BaseItem } from '@/types/rxSchema'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function NoteV2() {

    const activityStore = useActivityStore(state => state)
    const refInputTitle = useRef<HTMLInputElement>(null);
    const [noteData, setNoteData] = useState<BaseItem>()
    const [listPath, setListPath] = useState<Array<{ id: string, label: string }>>([])
    const [noteLabel, setNoteLabel] = useState<string>("")


    useEffect(() => {
        if (activityStore.activeFileId != '' && refInputTitle.current) {
            handleGetDetailFile()
        }
    }, [activityStore.activeFileId])


    function handleChangeLabel(e: React.ChangeEvent<HTMLInputElement>) {
        setNoteLabel(e.target.value)
    }


    async function handleGetDetailFile() {
        const dataDetail = await getDetailFile(activityStore.activeFileId)
        const path = await getItemPath(dataDetail?.path || [])
        setNoteLabel(dataDetail?.label || '')
        setNoteData(dataDetail)
        setListPath(path)
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
            <motion.div className="w-full relative" transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}>
                {activityStore.activeFileId == '' && (
                    <div className='w-full flex flex-col h-full  items-center'>
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
                                <span className='font-semibold'>{noteData?.label}</span>
                            </div>
                        </div>
                        <div className='px-8 py-10 font-comic-neue '>
                            <input type="text" value={noteLabel} className='font-bold text-lg w-full border-none outline-none'
                                ref={refInputTitle}
                                onChange={handleChangeLabel}
                                onBlurCapture={handleBlurLabel} />
                        </div>

                    </div>


                )}
            </motion.div>
        </PageLayout>
    )
}