import {Stack} from "@mui/material";
import {ReactNode} from "react";

export default function Center({children}: { children: ReactNode }) {

    return <Stack justifyContent="center" alignItems="center" textAlign="center" sx={{width: "100%", height: "100%"}}>
        {children}
    </Stack>
}