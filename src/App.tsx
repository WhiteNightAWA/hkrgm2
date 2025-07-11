import {
    AppBar, Avatar,
    Backdrop,
    Box, Button,
    CircularProgress,
    createTheme,
    IconButton, ListItemIcon, Menu, MenuItem, MenuList,
    Stack,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {Home, Logout, Settings} from "@mui/icons-material";
import {Outlet, useNavigate} from "react-router";
import {createContext, useEffect, useState} from "react";
import {DBPlaceType, isWeakJson, mobileCheck, PlacesInterface, PlaceType, UserInterface} from "./data.ts";
import {axios} from "./main.tsx";
import {useGoogleLogin} from "@react-oauth/google";

export const UserContext = createContext<UserInterface | null>(null);
export const PlacesContext = createContext<PlacesInterface>({
    data: {}, loadData: () => {
        return
    }
});

function App() {
    const navigator = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [offline, setOffline] = useState<boolean>(false);

    const loadData = async () => {
        setPlacesData({data: {}, loadData: loadData});
        // Update indexDB data
        await axios.get("/places/all").then(r => {
            if (r.status === 200) {
                const rs: DBPlaceType[] = JSON.parse(r.data);
                const places: { [key: string]: PlaceType } = {};
                rs.map(async (d) => {

                    Object.entries(d).map(([key, value]) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        d[key] = isWeakJson(value) ? JSON.parse(value) : value;
                    })
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    places[d.id] = d;
                });
                localStorage.setItem("places", JSON.stringify(places));
                setPlacesData({
                    loadData: loadData,
                    data: places
                });
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
            const bu = localStorage.getItem("places") || "{}";
            setPlacesData({
                loadData,
                data: JSON.parse(bu),
            });
            setOffline(true);
            setLoading(false);
        });
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async ({access_token}) => {
            console.log(access_token);
            const data: UserInterface = await axios.post('/login', JSON.stringify({access_token}), {
                withCredentials: true,
            });
            setUserData(data);
            console.log(data);

        },
    });

    const [userData, setUserData] = useState<UserInterface | null>(null);
    const [placesData, setPlacesData] = useState<PlacesInterface>({
        data: {},
        loadData: loadData
    });

    const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);

    useEffect(() => {
        (async () => {
            await loadData();
            const data = await axios.get("/user/info");
            setUserData(JSON.parse(data.data));
        })()
    }, []);

    const isMobile: boolean = mobileCheck();

    return <UserContext.Provider value={userData}>
        <PlacesContext.Provider value={placesData}>
            <ThemeProvider theme={createTheme({palette: {mode: "dark"}})}>
                <AppBar component="nav" sx={{position: "fixed"}}>
                    <Toolbar sx={{justifyContent: "space-between", height: "8vh"}}>
                        <Stack direction={"row"} alignItems={"center"}>

                            <IconButton size="large" onClick={() => navigator("/")}>
                                <Home/>
                            </IconButton>
                            <Typography variant="h6" color="inherit">
                                HKRGM2{offline && " (Offline)"}
                            </Typography>
                        </Stack>
                        {userData === null ?
                            <Button onClick={() => googleLogin()} variant={"outlined"} startIcon={<svg
                                xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                                viewBox="0 0 48 48">
                                <path fill="#FFC107"
                                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                <path fill="#FF3D00"
                                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                <path fill="#4CAF50"
                                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                <path fill="#1976D2"
                                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>}>
                                Login
                            </Button> : <IconButton onClick={(e) => setOpenMenu(e.currentTarget)}>
                                <Avatar src={userData.avatar} alt={userData.username}/>
                            </IconButton>}
                    </Toolbar>
                </AppBar>

                <Menu
                    open={openMenu !== null}
                    anchorEl={openMenu}
                    onClose={() => setOpenMenu(null)}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuList dense={isMobile}>

                        <Stack direction={"row"} m={1} spacing={4} px={1}>
                            <Stack>
                                <Typography color={"textSecondary"}>
                                    Welcome,
                                </Typography>
                                <Typography fontSize={"large"}>
                                    {userData?.username}
                                </Typography>
                            </Stack>
                            <Avatar src={userData?.avatar} alt={userData?.username}/>
                        </Stack>
                        <MenuItem>
                            <ListItemIcon>
                                <Settings />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={async () => {
                            await axios.post("/logout");
                            window.location.reload();
                        }}>
                            <ListItemIcon >
                                <Logout color={"error"}/>
                            </ListItemIcon>
                            Logout
                        </MenuItem>

                    </MenuList>
                </Menu>

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
            </ThemeProvider>
        </PlacesContext.Provider>
    </UserContext.Provider>
}


export default App
