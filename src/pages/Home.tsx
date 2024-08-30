import {Button, Stack} from "@mui/material";
import {Link} from "react-router-dom";

export function Home() {

    return <Stack alignItems={"center"} justifyContent={"center"} height={"100%"}>
        <Link to={"search"}>

            <Button>
                Search
            </Button>
        </Link>
    </Stack>

}