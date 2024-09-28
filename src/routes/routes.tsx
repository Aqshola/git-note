import Landing2 from "@/pages/Landing2";
import Note from "@/pages/Note";
import NotFound from "@/pages/errors/NotFound";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Landing2 />
    },
    {
        path: "/note",
        element: <Note />
    },

    {
        path: "*",
        element: <NotFound />
    }
])

export default routes