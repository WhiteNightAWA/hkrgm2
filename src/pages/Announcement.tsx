import {useEffect, useState} from "react";
import {Alert, AlertColor, AlertTitle, Stack, Typography} from "@mui/material";
import {axios} from "../main.tsx";

interface Announcement {
    id: string;
    title: string;
    content: string;
    time: string;
    author: string;
    severity: AlertColor;
}

export default function Announcement() {
    const [anns, setAnns] = useState<Announcement[]>([
        {id: "test", title: "Wow", content: "awa", time: "now", author: "WhiteNightAWA", severity: "info"},
    ]);


    useEffect(() => {
        (async () => {
            const res = await axios.get("/anns");
            if (res.status === 200) {
                console.log(res.data);
                setAnns(JSON.parse(res.data));
            }
        })()
    }, []);

    return <Stack spacing={2} p={3}>
        {anns.map(a => <Alert
            variant={"filled"}
            sx={{"*.MuiAlert-message": {width: "100%"}}}
            key={a.id}
            severity={"info"}
        >
            <AlertTitle fontSize={"x-large"}>
                {a.title}
            </AlertTitle>
            {a.content}
            <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
                <Typography fontSize={"small"} color={"textSecondary"}>{a.author}</Typography>
                <Typography fontSize={"small"} color={"textSecondary"}>{a.time}</Typography>
            </Stack>
        </Alert>)}
    </Stack>
}