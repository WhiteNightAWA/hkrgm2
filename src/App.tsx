import {
    AppBar,
    Box,
    Button,
    createTheme,
    IconButton,
    Paper,
    Stack,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {Outlet} from "react-router-dom";

function App() {

    return <ThemeProvider theme={createTheme({palette: {mode: "dark"}})}>
        <AppBar sx={{ height: "7vh" }}>
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
        <Box sx={{ mt: "7vh", height: "93vh" }}>
           <Outlet />
        </Box>
    </ThemeProvider>
}

export default App
