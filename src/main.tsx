import {createRoot} from "react-dom/client"
import App from "./App.tsx"
import "./styles/index.css"
import {BrowserRouter, Route, Routes} from "react-router";
import {Home} from "./pages/Home.tsx";
import {Search} from "./pages/Search.tsx";
import {Info} from "./pages/Info.tsx";
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import "./styles/index.css";
import {Axios} from "axios";
import {PlaceType} from "./data.ts";


const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:',
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const axios = new Axios({ baseURL: (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? "http://localhost:3000" : "https://hkrgm2-backend.vercel.app" })

// Update indexDB data
axios.get("/places/all").then(r => {
    if (r.status === 200) {
        const rs: PlaceType[] = JSON.parse(r.data);
        const places = {};
        rs.map(async (d) => {
            ["nicks", "games", "links"].forEach(k => {

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
                d[k] = d[k] !== null ? JSON.parse(d[k]) : [];
            });

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
            places[d.id] = d;
        });
        localStorage.setItem("places", JSON.stringify(places));
    }
});

createRoot(document.getElementById("root")!).render(
    <AuthProvider store={store}>
        <BrowserRouter basename={"/hkrgm2/"}>
            <Routes>
                <Route path={"/"} element={<App/>}>
                    <Route index element={<Home/>}/>
                    <Route path={"/search"} element={<Search/>}/>
                    <Route path={"/info/:id"} element={<Info/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);
