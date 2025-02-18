import {Alert, Button, Stack} from "@mui/material";
import {Link} from "react-router";
import {Login, Search} from "@mui/icons-material";

export function Home() {

    return <Stack spacing={2} alignItems={"center"} textAlign={"center"} height={"100%"}>

        <Alert sx={{ m: 1 }} severity="warning">此網站仍然WIP, 如果你發現任何bug或有建議，請聯繫IG@whitenightawa.rhythm</Alert>
        <br/>
        <h1><b>Welcome to</b></h1>
        <p className={"background-gradient"} style={{fontSize: "4rem"}}>HKRGM2</p>
        <p>Hong Kong Rhythm Game Map 2.0</p>
        <span>(Hong Kong Music Game Map 精神續作)</span>
        <br/>
        <Link to={"/search"}><Button variant={"contained"} startIcon={<Search />}>Search</Button></Link>
        <Button disabled variant={"outlined"} startIcon={<Login />}>Login</Button>
    </Stack>

}