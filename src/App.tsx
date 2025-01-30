import {
    AppBar,
    Box,
    createTheme,
    IconButton,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {Outlet} from "react-router-dom";

function App() {

    return <ThemeProvider theme={createTheme({palette: {mode: "dark"}})}>
        <AppBar sx={{ height: "10vh" }}>
            <Toolbar>
                <IconButton sx={{
                    mr: 2
                }} size="large">
                    <Menu/>
                </IconButton>
                <Typography variant="h6" color="inherit">
                    香港音Game地圖v2.0
                </Typography>
            </Toolbar>
        </AppBar>
        <Box sx={{ mt: "10vh", height: "90vh" }}>
           <Outlet />
        </Box>
    </ThemeProvider>
}

export default App
