import clsx from "clsx"
import { useState } from "react"
import { RoughNotation } from "react-rough-notation"
import { Link } from "react-router-dom"


const STYLE_SIZE = {
    "lg": "text-2xl",
    "base": "text-base",
    "sm": "text-sm"
}

interface Props {
    to: string
    children: React.ReactNode
    sketchColor?: string
    size?: keyof typeof STYLE_SIZE
}
export default function SketchLink({ sketchColor = "black", size = "base", ...props }: Props) {
    const [isHover, setIsHover] = useState(false)
    return (
        <Link to={props.to}
            onMouseEnter={() => { setIsHover(true) }}
            onMouseLeave={() => setIsHover(false)}
            className={clsx("hover:font-bold transition-all", STYLE_SIZE[size])}
        >
            <RoughNotation type="underline" show={isHover} animationDuration={200} multiline={false} strokeWidth={2}
                color={sketchColor}
            >
                {props.children}
            </RoughNotation>
        </Link>
    )
}