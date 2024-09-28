import { motion, useTransform, useMotionValue, animate } from 'framer-motion'
import { useEffect, useState } from 'react'
interface Props {
    baseText: string
    className?: string
    delay?: number
}
export default function TypingText({ className = '', delay = 0, ...props }: Props) {

    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayText = useTransform(rounded, (latest) =>
        props.baseText.slice(0, latest)
    );

    useEffect(() => {
        const controls = animate(count, props.baseText.length, {
            type: "tween",
            delay: delay,
            duration: 1,
            ease: "easeInOut",

        });
        return controls.stop;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <span className="">
            <motion.span>{displayText}</motion.span>
        </span>
    );
}