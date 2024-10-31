import PageLayout from "@/components/layout/PageLayout";
import { getAssetById } from "@/service/assetService";
import { useActivityStore } from "@/stores/activityStore";
import { useEffect, useState } from "react";

export default function AssetPreview() {
    const [urlPreview, setUrlPreview] = useState("")
    const activityStore = useActivityStore()

    useEffect(() => {
        if (activityStore.activeAssetId != '' && activityStore.activeAssetId) {
            handleGetDetailFile()
        }
    }, [activityStore.activeAssetId])

    async function handleGetDetailFile() {
        const data = await getAssetById(activityStore.activeAssetId)
        if (!data) return
        const url = URL.createObjectURL(data.blob)
        setUrlPreview(url)
    }

    return <PageLayout>
        <div className="w-full  flex flex-col mx-auto h-full overflow-hidden overflow-y-scroll relative box-border p-5">
            <img src={urlPreview} className="image-asset-blob h-auto md:max-w-[500px] w-fit" alt=" preview" />

        </div>
    </PageLayout>

}