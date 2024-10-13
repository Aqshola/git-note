import { motion } from 'framer-motion'
import Navbar from "@/components/nav/Navbar"
import Sidebar from '../nav/Sidebar'

type Props = {
    children: React.ReactNode
}

export default function PageLayout(props: Readonly<Props>) {
    return <div className="flex flex-col h-screen">
        <Navbar />
        <motion.div className='flex h-full relative'>
            <Sidebar />
            {props.children}
        </motion.div>
    </div>
}   