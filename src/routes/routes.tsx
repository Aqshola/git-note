import GlobalLayout from "@/components/layout/GlobalLayout";
import Landing from "@/pages/Landing";
import Note from "@/pages/Note";
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
                element: <Note />
            },

            {
                path: "*",
                element: <NotFound />
            }
        ]
    }

])

export default routes