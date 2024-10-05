import clsx from "clsx"
import { useState } from "react"

type FolderTree = {
    id: string
    label: string
    type: 'FILE' | 'FOLDER',
    child: Array<FolderTree>
    counter?: number
}

export default function FolderTree({ counter = 0, ...child }: Readonly<FolderTree>) {
    const paddingLeft = 0 + (counter * 12)
    const [viewChild, setViewChild] = useState(false)

    function toggleViewChild() {
        setViewChild(!viewChild)
    }

    return (
        <div className="w-full">
            <div className={clsx("w-full rounded text-write-gray text-nowrap overflow-x-hidden text-ellipsis flex items-center gap-3",
                'pr-3 py-2')} style={{
                    marginLeft: `${paddingLeft}px`
                }}>
                {child.type == 'FOLDER' && (
                    <button onClick={toggleViewChild}>

                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.25 1.91658L5.33333 5.99992L1.25 10.0833" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                )}
                {child.label}
            </div>
            {child.type == 'FOLDER' && child.child.length > 0 && viewChild && (
                child.child.map((el) => (
                    <FolderTree child={el.child} id={el.id} label={el.label}
                        type={el.type}
                        counter={counter + 1} key={el.id} />
                ))
            )}
        </div>
    )
}