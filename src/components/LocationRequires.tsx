import {Button, Dialog, DialogContent, DialogTitle, Stack} from "@mui/material";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import { Location } from "../data";

export default function LocationRequires({ setLocation, ran }: {
    setLocation: Dispatch<SetStateAction<Location>>;
    ran: number;
}) {
    const def = window.localStorage.getItem("hkrgm2.locationAllow");
    const [open, setOpen] = useState(def !== "true" && def !== "never");

    const requestLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
            });
        }
    };

    useEffect(() => {
        if (def === "true") {
            requestLocation();
        }
    }, [ran])


    return (<Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Location Requires</DialogTitle>
        <DialogContent>
            <Stack spacing={1}>

                <p>We need your location to check which place is near you!</p>
                <Button color={"success"} size={"small"} variant={"contained"} onClick={() => {
                    requestLocation();
                    window.localStorage.setItem("hkrgm2.locationAllow", "true");
                }}>Allow</Button>
                <Button size={"small"}>No thanks</Button>
                <Button color={"error"} size={"small"} variant={"outlined"} onClick={() => window.localStorage.setItem("hkrgm2.locationAllow", "never")}>Never Ask Again</Button>
            </Stack>
        </DialogContent>
    </Dialog>)
}