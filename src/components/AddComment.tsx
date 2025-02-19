import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating, Stack, TextField} from "@mui/material";
import {Add, Edit, People, PeopleOutline, SmokeFree, SmokingRooms} from "@mui/icons-material";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../App.tsx";
import {axios} from "../main.tsx";

export default function AddComment({id}: { id: string | undefined }) {
    const userData = useContext(UserContext);
    const [edit, setEdit] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const [rating, setRating] = useState<number>(0);
    const [smoke, setSmoke] = useState<number>(0);
    const [people, setPeople] = useState<number>(0);
    const [comments, setComments] = useState<string | null>("");

    useEffect(() => {
        console.log("test");
        (async () => {
            if (userData !== null) {
                const res = await axios.get(`/comment/check/${id}`);
                console.log(res);
                if (res.status === 200) {
                    setEdit(true);
                    const data = JSON.parse(res.data);
                    setRating(data.rating);
                    setSmoke(data.smoke);
                    setPeople(data.people);
                    setComments(data.comments);
                }
            }
        })()
    }, [userData]);

    return <>
        {userData !== null ?
            <Button onClick={() => setOpen(true)} fullWidth variant={"outlined"} color={"success"}
                    startIcon={edit ? <Edit/> : <Add/>}>
                {edit ? "Edit comment" : "Add comment"}
            </Button> :
            <Button fullWidth variant={"contained"} disabled>
                Please Login to add comment
            </Button>
        }
        <Dialog open={open} maxWidth={"md"} fullWidth>
            <DialogTitle>Add Comment</DialogTitle>
            <DialogContent>
                <Stack alignItems={"center"} spacing={1}>
                    <Rating value={rating} size={"large"} onChange={(_e, v) => setRating(v ? v : 0)}/>
                    <Rating value={smoke} icon={<SmokingRooms color={"error"}/>} emptyIcon={<SmokeFree/>}
                            onChange={(_e, v) => setSmoke(v ? v : 0)}/>
                    <Rating value={people} icon={<People color={"secondary"}/>} emptyIcon={<PeopleOutline/>}
                            onChange={(_e, v) => setPeople(v ? v : 0)}/>
                    <TextField
                        fullWidth
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        multiline
                        label={"Comment"}
                        minRows={5}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button color={"error"} onClick={() => setOpen(false)}>Cancel</Button>
                <Button color={"success"} variant={"contained"} onClick={async () => {
                    const res = await axios.post(`/comment/summit/${id}`, JSON.stringify({
                        rating, smoke, people, comments
                    }));
                    if (res.status === 200) {
                        location.reload()
                    }
                }}>Summit</Button>
            </DialogActions>
        </Dialog>
    </>

}