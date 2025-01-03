import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import rough from 'roughjs'

const STYLE_SIZE = {
    lg: "px-7 py-2 text-xl",
    base: "px-7 py-1 text-lg",
    sm: "px-5 py-1 text-base",
    custom: "",
}
interface Props {
    children: React.ReactNode
    size?: keyof typeof STYLE_SIZE,
    className?: string

    childrenClass?: string
}
export default function SketchButton({ size = "base", ...props }: Props) {
    const refButton = useRef<HTMLButtonElement>(null)
    const refSvg = useRef<SVGSVGElement>(null)


    useEffect(() => {
        if (refButton.current && refSvg.current) {
            const button = refButton.current.getBoundingClientRect()
            const buttonWidth = button.width - 4
            const buttonHeight = button.height

            const rc = rough.svg(refSvg.current)

            let node = rc.rectangle(0, 0, buttonWidth, buttonHeight, {
                roughness: 1,
                strokeWidth: 2,
            })

            refSvg.current.style.height = `${buttonHeight + 1}px`
            refSvg.current.style.width = `${buttonWidth}px`

            if (refSvg.current.lastChild) {
                refSvg.current.removeChild(refSvg.current.lastChild)
            }
            refSvg.current.appendChild(node)

        }
    }, [])


    return <button className={clsx(`
            relative font-comic-neue 
            border-none bg-none outline-none  
            min-w-[50px] 
            text-center
            transform  
            transition-transform 
        `, `
            active:translate-y-1  
            hover:-translate-y-0.5
        `, STYLE_SIZE[size], props.className)} ref={refButton}>
        <div className="relative z-10">
            {props.children}
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 ">
            <svg className={clsx("block w-fit h-fit active:shadow-none  hover:shadow-3d", props.childrenClass)} ref={refSvg}></svg>
        </div>
    </button>


}