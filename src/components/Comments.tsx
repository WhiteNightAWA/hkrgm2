import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    IconButton,
    Paper,
    Rating,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {Close, People, PeopleOutline, SmokeFree, SmokingRooms, Warning} from "@mui/icons-material";
import {axios} from "../main.tsx";
import Center from "./Center.tsx";

interface CommentProps {
    id: number;
    userid: number;
    targetId: string;
    comments: string
    rating: number;
    smoke: number;
    people: number;
    time: string;
    username: string;
    avatar: string | null;
}

export default function Comments({id}: { id: string | undefined }) {
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState<CommentProps[]>([]);
    const [fail, setFail] = useState(false);
    useEffect(() => {
        axios.get("/comments/" + id).then(r => {
            if (r.status === 200) {
                setComments(JSON.parse(r.data));
            } else {
                setFail(true);
            }
        });
    }, [])

    return (<>
        <Button variant="contained" onClick={() => setOpen(true)}>
            Check Comments
        </Button>

        <Dialog open={open} onClose={() => setOpen(false)} fullScreen scroll={"paper"}>
            <Paper sx={{mb: 1}}>
                <Toolbar sx={{justifyContent: "space-between"}}>
                    <h2>Comments</h2>
                    <IconButton onClick={() => setOpen(false)}><Close/></IconButton>
                </Toolbar>
            </Paper>
            <Box overflow={"scroll"}>

                {fail ? <Center>
                    <Typography variant="h4">
                        Load Comment Fail!
                    </Typography>
                    <Typography color="textSecondary">
                        Please Check your internet connection.
                    </Typography>
                </Center> : <Stack spacing={3} p={2}>
                    {comments.map((c) => <Card sx={{m: 2}} elevation={4}>
                        <CardHeader
                            title={c.username}
                            subheader={c.time}
                            avatar={<Avatar src={c.avatar || ""} alt={c.username}/>}
                            action={<IconButton><Warning/></IconButton>}
                        />
                        <CardContent sx={{pt: 0}}>
                            <center><Rating readOnly value={c.rating} size={"large"}/></center>
                            <Stack direction={"row"} justifyContent={"space-around"}>
                                <Rating readOnly value={c.smoke} size={"small"} icon={<SmokingRooms color={"error"}/>}
                                        emptyIcon={<SmokeFree/>}/>
                                <Rating readOnly value={c.people} size={"small"} icon={<People color={"secondary"}/>}
                                        emptyIcon={<PeopleOutline/>}/>
                            </Stack>
                            <Typography>
                                {c.comments}
                            </Typography>
                        </CardContent>
                    </Card>)}
                </Stack>}
            </Box>
        </Dialog>
    </>)
}