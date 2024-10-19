import { useLayoutEffect, useState } from "react";

export function useWindowSize() {
    const [size, setSize] = useState([0, 0])
    useLayoutEffect(() => {
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => window.removeEventListener('resize', updateSize)
    }, [])

    function updateSize() {
        setSize([window.innerWidth, window.innerHeight])
    }
}