import GlobalLayout from "@/components/layout/GlobalLayout";
import PageLayout from "@/components/layout/PageLayout";
import AssetPreview from "@/pages/AssetPreview";
import Landing from "@/pages/Landing";
import NoteV2 from "@/pages/NoteV2";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

import NotFound from "@/pages/errors/NotFound";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
    {
        element: <GlobalLayout />,

        children: [
            {
                index: true,
                element: <Landing />
            },

            {
                path: "/sign-in",
                element: <SignIn />
            },

            {
                path: "/sign-up",
                element: <SignUp />
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