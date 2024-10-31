import { BaseAsset } from "@/types/rxSchema"
import Popover from "../popup/Popover"
import { useActivityStore } from "@/stores/activityStore"
import clsx from "clsx"
import { useNavigate } from "react-router-dom"
import { deleteAsset } from "@/service/assetService"

interface Props {
    dataAsset: BaseAsset
    callbackDeleteAsset: () => Promise<void>
}

export default function AssetList(props: Props) {
    const routeNavigate = useNavigate()
    const activityStore = useActivityStore(state => state)
    function handleRenameAsset() {

    }

    async function handleDeleteAsset() {
        await deleteAsset(props.dataAsset.id)
        await props.callbackDeleteAsset()

    }

    function handleClickAsset() {
        activityStore.setActiveAssetId(props.dataAsset.id)
        routeNavigate('/asset-preview')
        activityStore.setActiveFile("")
    }
    return (
        <div className="flex justify-between" onClick={handleClickAsset}>
            <div className={clsx(activityStore.activeAssetId == props.dataAsset.id && "text-purple-primary font-semibold font-comic-neue")}>{props.dataAsset.label}</div>
            <Popover buttonChildren={<svg width="15" height="15" viewBox="0 0 20 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_102_2)">
                    <path d="M0.591087 50.5989C0.592856 51.7242 0.819022 52.838 1.25648 53.875C1.69394 54.9122 2.33391 55.852 3.13899 56.6396C3.89741 57.3912 4.80064 57.9813 5.79394 58.3748C6.78725 58.7683 7.85007 58.9569 8.91833 58.9289C13.1959 58.8046 17.2935 54.7884 17.5142 50.5028C17.5286 49.6368 17.3677 48.777 17.0413 47.9745C16.7148 47.1721 16.2293 46.444 15.6142 45.8334C14.6886 44.876 13.5826 44.1106 12.3598 43.5815C11.1369 43.0523 9.82116 42.7696 8.48854 42.7499C7.45572 42.7182 6.42697 42.893 5.46269 43.2637C4.49834 43.6344 3.61792 44.1936 2.87299 44.9085C2.13376 45.6546 1.55124 46.5406 1.15938 47.5143C0.767591 48.4881 0.574315 49.5301 0.591087 50.5794L0.591087 50.5989Z" fill="black" />
                    <path d="M5.49679 89.6941C4.25524 91.1403 3.5907 92.992 3.63014 94.896C3.63171 95.5737 3.70286 96.2487 3.84235 96.9113C4.0881 98.2751 4.6469 99.5636 5.47484 100.676C6.30285 101.788 7.37759 102.693 8.61476 103.322C9.62936 103.807 10.755 104.012 11.8757 103.917C12.9965 103.822 14.0717 103.431 14.9902 102.782C17.9896 100.886 19.4715 96.6627 18.3649 93.1673C17.2511 89.6516 13.419 87.2092 9.25407 87.3609C9.13699 87.3649 9.02299 87.4002 8.92334 87.4617C8.73072 87.582 8.47769 87.707 8.19662 87.8482C7.18897 88.2898 6.27323 88.9157 5.49679 89.6941Z" fill="black" />
                    <path d="M0.848069 7.3156C0.812231 7.60111 0.794279 7.88858 0.794344 8.17631C0.808365 9.84456 1.38878 11.4587 2.44073 12.7549C3.12126 13.6069 3.964 14.3162 4.92036 14.8414C5.87671 15.3667 6.92787 15.6978 8.01303 15.8155C12.1675 16.2577 16.149 13.4829 16.7091 9.7579C16.844 8.78788 16.7799 7.8008 16.5209 6.85632C16.2618 5.91183 15.8132 5.0297 15.2022 4.2636C14.464 3.32045 13.5441 2.53463 12.4967 1.95226C11.4493 1.36988 10.2956 1.0027 9.10377 0.872755C8.13575 0.739722 7.15083 0.802136 6.20731 1.05608C5.26387 1.31002 4.38102 1.75036 3.61113 2.35116C2.84124 2.95196 2.20008 3.70085 1.72541 4.5536C1.2508 5.40634 0.952503 6.34562 0.848069 7.3156Z" fill="black" />
                </g>
                <defs>
                    <clipPath id="clip0_102_2">
                        <rect width="104" height="19" fill="white" transform="translate(19.2773 0.5) rotate(90)" />
                    </clipPath>
                </defs>
            </svg>}>

                <div className="flex flex-col font-comic-neue">

                    <button className="text-xs text-left p-1 hover:bg-gray-200 rounded transition-colors" onClick={handleRenameAsset}>
                        Rename
                    </button>

                    <button className="text-xs text-left p-1 hover:bg-gray-200 rounded transition-colors text-red-600" onClick={handleDeleteAsset}>
                        Delete
                    </button>
                </div>


            </Popover>
        </div>
    )
}