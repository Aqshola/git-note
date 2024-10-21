import PageLayout from '@/components/layout/PageLayout'
import { useActivityStore } from '@/stores/activityStore'
import { motion } from 'framer-motion'

export default function NoteV2() {

    const activityStore = useActivityStore(state => state)




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
                    <div>
                        {activityStore.activeFileId}
                    </div>


                )}
            </motion.div>
        </PageLayout>
    )
}