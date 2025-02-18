import {
    Avatar,
    AvatarGroup,
    Button,
    ButtonGroup,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    Rating,
    Stack,
    Typography
} from "@mui/material";
import {SetStateAction, useState} from "react";
import {Filter} from "../components/Filter.tsx";
import {
    ArrowDownward,
    ArrowUpward,
    CreditCard,
    LocationOn,
    MonetizationOn,
    People,
    PeopleOutline,
    SmokeFree,
    SmokingRooms,
    Sort
} from "@mui/icons-material";
import {gameAvatar, PlaceType} from "../data.ts";
import {useNavigate} from "react-router";

export interface filterType {
    name: string;
    place: string;
    games: string[];
    coins: boolean | null;
}

export function Search() {
    const [filter, setFilter] = useState<filterType>({
        name: "",
        place: "all",
        games: [],
        coins: null,
    });

    const results: PlaceType[] = JSON.parse(localStorage.getItem("places") as string) || [];

    const navigate = useNavigate();

    const sortType = ["name", "star", "smoke", "people"];
    const [sort, _setSort] = useState(0);
    const [direction, setDirection] = useState(true);


    return (
        <Stack sx={{
            p: 2
        }} spacing={2}>
            <Filter filter={filter} setFilter={(f: SetStateAction<filterType>) => setFilter(f)}/>
            <Divider flexItem>Results</Divider>
            <Stack alignItems={"end"}>
                <ButtonGroup variant="contained">
                    <Button startIcon={<Sort/>}>
                        {sortType[sort]}
                    </Button>
                    <Button sx={{width: 8}} onClick={() => setDirection(!direction)}>
                        {direction ? <ArrowDownward/> : <ArrowUpward/>}
                    </Button>
                </ButtonGroup>
            </Stack>
            {Object.values(results).filter(t => {
                return (
                        t.name.toLowerCase().includes(filter.name.toLowerCase()) ||
                        filter.name.toLowerCase().includes(t.name.toLowerCase())
                    )
                    && (t.place === filter.place || filter.place === "all")
                    && filter.games.every(g => Object.keys(t.games).includes(g))
                    && (filter.coins === null || filter.coins === t.coins)
            }).map(t => <Card>
                <CardActionArea onClick={() => navigate("/info/" + t.id)}>
                    <CardHeader title={<Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography variant={"h5"}>{t.name}</Typography>
                        {t.coins ? <MonetizationOn/> : <CreditCard/>}
                        <Rating value={t.star} size={"small"}/>
                        <IconButton onClick={() => window.open(t.google, "_blank")}>
                            <LocationOn/>
                        </IconButton>
                    </Stack>} subheader={t.desc} sx={{pb: 0}}/>
                    <CardContent sx={{pt: 0}}>
                        <Stack alignItems={"start"}>
                            <AvatarGroup max={8} total={Object.values(t.games).reduce((a, b) => a + b[0], 0)}>
                                {Object.entries(t.games).map(([k, n]) => Array.from({length: n[0]}, (_, i) =>
                                    <Avatar key={i} alt={k} src={gameAvatar[k]}/>
                                ))}
                            </AvatarGroup>
                        </Stack>
                        <Stack direction={"row"} justifyContent={"space-between"}>
                            <Rating value={t.smoke} icon={<SmokingRooms color={"error"}/>} emptyIcon={<SmokeFree/>}/>
                            <Rating value={t.people} icon={<People color={"secondary"}/>} emptyIcon={<PeopleOutline/>}/>
                        </Stack>
                        <Typography fontSize={"xx-small"}
                                    color={"textSecondary"}>[{t.locationX}, {t.locationY}]</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>)}

        </Stack>
    );
}