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
    ArrowUpward, Cached,
    CreditCard,
    LocationOn,
    MonetizationOn,
    People,
    PeopleOutline,
    SmokeFree,
    SmokingRooms,
    Sort
} from "@mui/icons-material";
import {gameAvatar, PlaceList, PlaceType} from "../data.ts";
import {useNavigate} from "react-router";

export interface filterType {
    name: string;
    place: string;
    games: string[];
    coins: boolean | null;
}

type Item = { [key: string]: string | number | null };

const compareByKey = (key: string, reverse: boolean = false) => (a: Item, b: Item): number => {
    const aValue = a[key] === null ? Infinity : a[key];
    const bValue = b[key] === null ? Infinity : b[key];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
        return reverse ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
    } else {
        return reverse ? Number(bValue) - Number(aValue) : Number(aValue) - Number(bValue);
    }
};

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
    const [sort, setSort] = useState(0);
    const [direction, setDirection] = useState(true);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const sortedResult = Object.values(results).sort(compareByKey(sortType[sort], !direction)).filter(t => {
        return (
                t.name.toLowerCase().includes(filter.name.toLowerCase()) ||
                filter.name.toLowerCase().includes(t.name.toLowerCase())
            )
            && (t.place === filter.place || filter.place === "all")
            && filter.games.every(g => Object.keys(t.games).includes(g))
            && (filter.coins === null || filter.coins === t.coins)
    });

    return (
        <Stack sx={{
            px: 2, py: 4
        }} spacing={2}>
            <Filter filter={filter} setFilter={(f: SetStateAction<filterType>) => setFilter(f)}/>
            <Divider flexItem>Results ({sortedResult.length})</Divider>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Button size={"small"} variant={"outlined"} startIcon={<Cached/>}>Reload</Button>
                <ButtonGroup size={"small"} variant="contained">
                    <Button startIcon={<Sort/>} onClick={() => setSort(sort === 3 ? 0 : sort + 1)}>
                        {sortType[sort]}
                    </Button>
                    <Button sx={{width: 8}} onClick={() => setDirection(!direction)}>
                        {direction ? <ArrowDownward/> : <ArrowUpward/>}
                    </Button>
                </ButtonGroup>
            </Stack>
            {sortedResult.length === 0 && <center><h1>
                No Result
            </h1></center>}
            {sortedResult.map(t => <Card>
                <CardActionArea onClick={() => navigate("/info/" + t.id)}>
                    <CardHeader title={t.name} sx={{pb: 0}}/>
                    <CardContent sx={{pt: 0}}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ lineHeight: 0 }}>
                            <h2>{PlaceList[t.place]}</h2>
                            {t.coins ? <MonetizationOn/> : <CreditCard/>}
                            <Rating value={t.star} />
                            <IconButton onClick={() => window.open(t.google, "_blank")}>
                                <LocationOn/>
                            </IconButton>
                        </Stack>
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
                        <Typography fontSize={"xx-small"} color={"textSecondary"}>
                            {t.id}[{t.locationX}, {t.locationY}]
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>)}

        </Stack>
    );
}