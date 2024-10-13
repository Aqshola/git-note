import PageLayout from '@/components/layout/PageLayout'
import { motion } from 'framer-motion'

export default function NoteV2() {
    return (
        <PageLayout>
            <motion.div className=" w-full" transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}>
                Content
            </motion.div>
        </PageLayout>
    )
}