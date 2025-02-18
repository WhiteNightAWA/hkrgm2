import {AppBar, Box, createTheme, IconButton, ThemeProvider, Toolbar, Typography} from "@mui/material";
import {Login, Menu} from "@mui/icons-material";
import {Outlet} from "react-router";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

function App() {

    return <ThemeProvider theme={createTheme({palette: {mode: "dark"}})}>
        <Box sx={{display: "flex"}}>

            <AppBar component="nav">
                <Toolbar sx={{ justifyContent: "space-between", height: "10vh" }}>
                    <IconButton size="large">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        香港音Game地圖v2.0
                    </Typography>
                    {useIsAuthenticated() ? <></> : <IconButton>
                        <Login />
                    </IconButton>}
                </Toolbar>
            </AppBar>
            <Box sx={{my: "10vh", height: "90vh", overflowY: "auto"}} component="main">
                <Outlet/>
            </Box>
        </Box>
    </ThemeProvider>
}

export default App
