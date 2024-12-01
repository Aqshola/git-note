import Navbar from "@/components/nav/Navbar"
import NoteSideBar from "../nav/NoteSideBar"
import SettingSideBar from "../nav/SettingSideBar"



interface Props {
    children: React.ReactNode
}

export default function PageLayout(props: Props) {
    return <div className="flex flex-col h-screen">
        <Navbar />
        <div className='flex flex-1 h-full relative overflow-hidden'>
            <NoteSideBar />
            {props.children}
            <SettingSideBar />
        </div>
    </div>
}   