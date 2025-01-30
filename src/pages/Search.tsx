import {
    Avatar,
    AvatarGroup,
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Divider,
    IconButton, Rating,
    Stack,
    Typography
} from "@mui/material";
import {SetStateAction, useState} from "react";
import {Filter} from "../components/Filter.tsx";
import {
    CreditCard,
    LocationOn,
    MonetizationOn,
    People,
    PeopleOutline,
    SmokeFree,
    SmokingRooms
} from "@mui/icons-material";
import {gameAvatar} from "../data.ts";
import {b} from "vite/dist/node/types.d-aGj9QkWt";

export interface filterType {
    name: string;
    place: string;
    games: string[];
}

interface PlaceType {
    name: string;
    desc: string;
    nicks: string[];
    place: string;
    google: string;
    star: 4,
    smoke: number,
    people: number;
    location: [number, number];
    games: { [key: string]: number };
    coins: boolean;
}

const tempData: PlaceType[] = [
    createData("iGame", "-1樓", [], "nt", "https://maps.app.goo.gl/VRcidTwd8coUY1gc8", [22.45373896482803, 114.16726396927531], {
        maimai: 1, maimaidx: 1, sdvx: 1, chunithm: 1, jubeat: 2, taiko: 2
    }),
]

function createData(name: string, desc: string, nick: string[], place: string, google: string, location: [number, number], games: {
    [key: string]: number
}): PlaceType {
    return {
        name: name,
        desc: desc,
        nicks: nick,
        place: place,
        google: google,
        star: 4,
        smoke: 3,
        people: 1,
        location: location,
        games: games,
        coins: true
    }
}

export function Search() {
    const [filter, setFilter] = useState<filterType>({
        name: "",
        place: "all",
        games: []
    });

    return (
        <Stack sx={{
            p: 2
        }} spacing={2}>
            <Filter filter={filter} setFilter={(f: SetStateAction<filterType>) => setFilter(f)}/>
            <Divider flexItem/>

            {tempData.filter(t => {
                return (
                    t.name.toLowerCase().includes(filter.name.toLowerCase()) ||
                    filter.name.toLowerCase().includes(t.name.toLowerCase())
                )
            }).map(t => <Card>
                <CardActionArea>
                    <CardHeader title={<Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography variant={"h5"}>{t.name}</Typography>
                        {t.coins ? <MonetizationOn /> : <CreditCard />}
                        <Rating value={t.star} size={"small"}/>
                        <IconButton onClick={() => window.open(t.google, "_blank")}>
                            <LocationOn/>
                        </IconButton>
                    </Stack>} subheader={t.desc} sx={{pb: 0}}/>
                    <CardContent sx={{pt: 0}}>
                        <Stack alignItems={"start"}>
                            <AvatarGroup max={7} total={Object.values(t.games).reduce((a, b) => a + b)}>
                                {Object.entries(t.games).map(([k, n]) => Array.from({length: n}, (_, i) => <Avatar
                                    key={i} alt={k} src={gameAvatar[k]}/>))}
                            </AvatarGroup>
                        </Stack>
                        <Stack direction={"row"} justifyContent={"space-between"}>
                            <Rating value={t.smoke} icon={<SmokingRooms color={"error"}/>} emptyIcon={<SmokeFree/>}/>
                            <Rating value={t.people} icon={<People color={"secondary"}/>} emptyIcon={<PeopleOutline/>}/>
                        </Stack>
                        <Typography fontSize={"xx-small"}
                                    color={"textSecondary"}>{JSON.stringify(t.location)}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>)}

        </Stack>
    );
}