import GlobalLayout from "@/components/layout/GlobalLayout";
import AssetPreview from "@/pages/AssetPreview";
import Landing from "@/pages/Landing";
import NoteV2 from "@/pages/NoteV2";

import NotFound from "@/pages/errors/NotFound";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
    {
        element: <GlobalLayout />,
        path: "",
        children: [
            {
                path: "/",
                element: <Landing />
            },
            {
                path: "/note",
                element: <NoteV2 />
            },
            {
                path: "/asset-preview",
                element: <AssetPreview />
            },

            {
                path: "*",
                element: <NotFound />
            }
        ]
    }

])

export default routes