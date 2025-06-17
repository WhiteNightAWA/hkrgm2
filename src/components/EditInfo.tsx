import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {Edit, Save} from "@mui/icons-material";
import {useContext, useState} from "react";
import {Editor} from "@monaco-editor/react";
import {isJson, PlaceType} from "../data.ts";
import {axios} from "../main.tsx";
import {UserContext} from "../App.tsx";

export default function EditInfo(data: { data: PlaceType } | null) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(JSON.stringify(data, null, 4));

    const userData = useContext(UserContext);

    if (!userData || !userData.admin) {
        return  <></>
    }

    return <>
        <Button
            variant={"contained"}
            color={"secondary"}
            startIcon={<Edit/>}
            onClick={() => setOpen(true)}
        >Edit</Button>
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true} maxWidth={"md"}>
            <DialogTitle>{"Edit Info"}</DialogTitle>
            <DialogContent>
                <Editor
                    height={"80vh"}
                    language={"json"}
                    theme={"vs-dark"}
                    value={value}
                    onChange={(value) => setValue(value || "")}
                />
            </DialogContent>
            <DialogActions>
                <Button color={"error"} onClick={() => setOpen(false)}>Cancel</Button>
                <Button
                    onClick={async () => {
                        await axios.post("/places/update", value, {
                            headers: {
                                "Content-Type": "application/json",
                            }
                        }).then(res => {
                            if (res.status === 200) {
                                window.location.reload();
                            }
                        });
                    }}
                    color={"success"}
                    startIcon={<Save />}
                    variant="contained"
                    disabled={!isJson(value)}
                >Save</Button>
            </DialogActions>
        </Dialog>
    </>;
};
