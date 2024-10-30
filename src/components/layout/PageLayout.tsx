import { motion } from 'framer-motion'
import Navbar from "@/components/nav/Navbar"
import Sidebar from '../nav/Sidebar'

type Props = {
    children: React.ReactNode
}

export default function PageLayout(props: Readonly<Props>) {
    return <div className="flex flex-col h-screen">
        <Navbar />
        <div className='flex flex-1 h-full relative overflow-hidden'>
            <Sidebar />
            {props.children}
        </div>
    </div>
}   