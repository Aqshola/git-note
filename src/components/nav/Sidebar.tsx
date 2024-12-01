
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props {
    show: boolean
    children: React.ReactNode
    showPosition: 'LEFT' | 'RIGHT'
}


export default function Sidebar(props: Props) {

    const navAnimateVariant = {
        show: {

        },
        hide: {
            x: props.showPosition == 'LEFT' ? "-100%" : "100%",
            minWidth: '0px',
            width: '0px',
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingRight: 0,
        }
    }

    const [localShow, setLocalShow] = useState<boolean>(props.show)

    useEffect(() => {
        setLocalShow(props.show)
    }, [props.show])








    return <motion.div
        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
        variants={navAnimateVariant}
        animate={localShow ? 'show' : 'hide'}
        className={
            clsx(" h-full  bg-white  flex flex-col z-50 px-5 pt-9 overflow-x-hidden",
                "w-screen absolute top-0",
                "md:min-w-[250px] md:max-w-[400px] md:relative",
                props.showPosition == 'RIGHT' && 'right-0 border-l border-line-gray',
                // props.showPosition == 'LEFT' && 'left-0 border-r border-line-gray'
            )

        }>
        {props.children}
    </motion.div>

}