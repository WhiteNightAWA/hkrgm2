import {AppBar, Box, createTheme, IconButton, Stack, ThemeProvider, Toolbar, Typography} from "@mui/material";
import {Home, Login} from "@mui/icons-material";
import {Outlet, useNavigate} from "react-router";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

declare module '@mui/material/styles' {
    interface Palette {
        discord: Palette['primary'];
    }

    interface PaletteOptions {
        discord?: PaletteOptions['primary'];
    }
}


function App() {
    const navigator = useNavigate();

    return <ThemeProvider theme={createTheme({
        palette: {mode: "dark"},
    })}>
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
            <Box sx={{mt: "8vh", height: "92vh", overflowY: "auto", width: "100%"}} component="main">
                <Outlet/>
            </Box>
        </Box>
    </ThemeProvider>
}


export default App
