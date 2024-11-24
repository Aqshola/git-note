import { useEffect, useState } from "react";
import ReactDom from "react-dom";

interface Props {
    show: boolean
    children: React.ReactNode

    onClickOutside: (args?: any) => void
}
export default function Modal(props: Props) {
    const [show, setShow] = useState<boolean>(props.show)

    useEffect(() => {
        setShow(props.show)
    }, [props.show])

    function handleClickOutside(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation()
        props.onClickOutside()
    }

    return (
        ReactDom.createPortal(
            show && (
                <div className="bg-black bg-opacity-15 fixed h-screen w-screen top-0 flex justify-center" onClick={handleClickOutside}>
                    <div className="m-16 bg-white h-fit p-5 rounded">
                        {props.children}
                    </div>
                </div>
            )
            , document.body)
    )
}