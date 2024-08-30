import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./styles/index.css"
import {createHashRouter, RouterProvider} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {Search} from "./pages/Search.tsx";

createRoot(document.getElementById("root")!).render(<RouterProvider
    router={createHashRouter([
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <Home />
                }, {
                    path: "/search",
                    element: <Search />
                }
            ]
        }
    ])}
/>);
