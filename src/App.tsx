import {
    AppBar,
    Backdrop,
    Box,
    CircularProgress,
    createTheme,
    IconButton,
    Stack,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {Home, Login} from "@mui/icons-material";
import {Outlet, useNavigate} from "react-router";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import {useState} from "react";
import {PlaceType} from "./data.ts";
import {axios} from "./main.tsx";

function App() {
    const navigator = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

// Update indexDB data
    axios.get("/places/all").then(r => {
        if (r.status === 200) {
            const rs: PlaceType[] = JSON.parse(r.data);
            const places = {};
            rs.map(async (d) => {

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
                d.nicks = JSON.parse(d.nicks);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
                d.games = JSON.parse(d.games);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
                places[d.id] = d;
            });
            localStorage.setItem("places", JSON.stringify(places));
        }
        setLoading(false);
    });


    return <ThemeProvider theme={createTheme({palette: {mode: "dark"}})}>
        <Box sx={{display: "flex"}}>

            <AppBar component="nav">
                <Toolbar sx={{justifyContent: "space-between", height: "8vh"}}>
                    <Stack direction={"row"} alignItems={"center"}>

                        <IconButton size="large" onClick={() => navigator("/")}>
                            <Home/>
                        </IconButton>
                        <Typography variant="h6" color="inherit">
                            HKRGM2
                        </Typography>
                    </Stack>
                    {useIsAuthenticated() ? <></> : <IconButton>
                        <Login/>
                    </IconButton>}
                </Toolbar>
            </AppBar>
            <Box sx={{mt: "8vh", height: "92vh", overflowY: "auto", width: "100%", position: "absolute"}}
                 component="main">
                {!loading && <Outlet/>}
            </Box>
            <Backdrop open={loading} sx={{zIndex: 9999}}>
                <Stack alignItems={"center"}>
                    <CircularProgress size={99} thickness={2}/>
                    <p>Requesting Data...</p>
                </Stack>
            </Backdrop>
        </Box>
    </ThemeProvider>
}


export default App
