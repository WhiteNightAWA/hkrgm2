import {
    Avatar,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    Dialog, DialogContent,
    IconButton,
    Paper,
    Rating,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {
    ArrowDownward,
    ArrowUpward,
    Close,
    People,
    PeopleOutline,
    SmokeFree,
    SmokingRooms,
    Sort,
    Warning
} from "@mui/icons-material";
import {axios} from "../main.tsx";
import Center from "./Center.tsx";
import {mobileCheck} from "../data.ts";

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

export default function Ratings({id}: { id: string | undefined }) {
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState<CommentProps[]>([]);
    const [fail, setFail] = useState(false);

    const sortType = ["time", "star", "smoke", "people"];
    const [sort, setSort] = useState(0);
    const [direction, setDirection] = useState(true);
    const isMobile = mobileCheck();

    useEffect(() => {
        axios.get("/ratings/" + id).then(r => {
            if (r.status === 200) {
                setComments(JSON.parse(r.data));
            } else {
                setFail(true);
            }
        });
    }, [id]);

    return (<>
        <Button variant="contained" onClick={() => setOpen(true)}>
            Check Ratings
        </Button>

        <Dialog open={open} onClose={() => setOpen(false)} fullScreen={isMobile} maxWidth={"md"}
                fullWidth scroll={"paper"}>
            <Paper sx={{mb: 1}}>
                <Toolbar sx={{justifyContent: "space-between"}}>
                    <h2>Ratings ({comments.length})</h2>
                    <IconButton onClick={() => setOpen(false)}><Close/></IconButton>
                </Toolbar>
            </Paper>
            <DialogContent sx={{minHeight: "50vh"}}>
                <Stack direction={"row"} justifyContent={"end"}>
                    <ButtonGroup size={"small"} variant="contained">
                        <Button startIcon={<Sort/>} onClick={() => setSort(sort === 3 ? 0 : sort + 1)}>
                            {sortType[sort]}
                        </Button>
                        <Button sx={{width: 8}} onClick={() => setDirection(!direction)}>
                            {direction ? <ArrowDownward/> : <ArrowUpward/>}
                        </Button>
                    </ButtonGroup>
                </Stack>
                {fail ? <Center>
                    <Typography variant="h4">
                        Load Ratings Fail!
                    </Typography>
                    <Typography color="textSecondary">
                        Please Check your internet connection.
                    </Typography>
                </Center> : <Stack spacing={3} p={2}>
                    {comments.map((c) => <Card sx={{m: 2}} elevation={4} key={c.username}>
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
            </DialogContent>
        </Dialog>
    </>)
}