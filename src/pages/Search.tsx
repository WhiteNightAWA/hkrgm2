import {Divider, Stack} from "@mui/material";
import {useState} from "react";
import {Filter} from "../components/Filter.tsx";


const tempData = [
    createdata("Game33", [], "nt")
]

function createdata(name: string, nick: [string] | [], place: string) {
    return {
        name: name,
        nicks: nick,
        places: place,

    }
}

export function Search() {
    const [filter, setFilter] = useState({
        name: "",
        places: []
    });

    return (
        <Stack sx={{
            p: 2
        }} spacing={2}>
            <Filter filter={filter} setFilter={setFilter} />
            <Divider flexItem />
            {tempData.filter(t => {
               return (
                   t.name.toLowerCase().includes(filter.name.toLowerCase()) ||
                   filter.name.toLowerCase().includes(t.name.toLowerCase())
               )
            }).map(t => t.name)}

        </Stack>
    );
}