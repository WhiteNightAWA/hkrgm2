import {createRoot} from "react-dom/client"
import App from "./App.tsx"
import "./styles/index.css"
import {BrowserRouter, Route, Routes} from "react-router";
import {Home} from "./pages/Home.tsx";
import {Search} from "./pages/Search.tsx";
import {Info} from "./pages/Info.tsx";
import "./styles/index.css";
import {Axios} from "axios";
import {GoogleOAuthProvider} from "@react-oauth/google";


export const axios = new Axios({
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
    baseURL: (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? "http://localhost:3000" : "https://hkrgm2-backend.vercel.app/",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
});


createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId={"522175218345-hno36f77qm86nao4npa7ebd8k3s62v20.apps.googleusercontent.com"}>
        <BrowserRouter basename={"/hkrgm2/"}>
            <Routes>
                <Route path={"/"} element={<App/>}>
                    <Route index element={<Home/>}/>
                    <Route path={"/search"} element={<Search/>}/>
                    <Route path={"/info/:id"} element={<Info/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </GoogleOAuthProvider>
);
