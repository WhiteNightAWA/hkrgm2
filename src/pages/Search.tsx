import {
    Avatar,
    AvatarGroup, Badge,
    Button,
    ButtonGroup,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Divider, IconButton,
    Rating,
    Stack,
    Typography
} from "@mui/material";
import {SetStateAction, useContext, useEffect, useRef, useState} from "react";
import {Filter} from "../components/Filter.tsx";
import {
    ArrowDownward,
    ArrowUpward,
    Cached,
    CreditCard, LocationOn,
    MonetizationOn,
    People,
    PeopleOutline,
    SmokeFree,
    SmokingRooms,
    Sort
} from "@mui/icons-material";
import {gameAvatar, PlaceList, PlaceType} from "../data.ts";
import {useNavigate} from "react-router";
import LocationRequires from "../components/LocationRequires.tsx";
import { Location } from "../data";
import {PlacesContext} from "../App.tsx";


export interface filterType {
    name: string;
    place: string;
    games: string[];
    coins: boolean | null;
}

type Item = { [key: string]: string | number | null };

const compareByKey = (key: string, reverse: boolean = false) => (a: Item, b: Item): number => {
    const aValue = a[key] === null ? 0 : a[key];
    const bValue = b[key] === null ? 0 : b[key];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
        return reverse ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
    } else {
        return reverse ? Number(bValue) - Number(aValue) : Number(aValue) - Number(bValue);
    }
};

function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000; // Earth's radius in meters

    const deltaLat = toRadians(lat2 - lat1);
    const deltaLon = toRadians(lon2 - lon1);

    const a = Math.sin(deltaLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(deltaLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));


    // Distance in meters
    return R * c;
}


export function Search() {
    const [filter, setFilter] = useState<filterType>({
        name: "",
        place: "all",
        games: [],
        coins: null,
    });

    const { data, loadData } = useContext(PlacesContext);

    const results: { [key: string]: PlaceType } = data || {};

    const navigate = useNavigate();

    const sortType = ["distance", "name", "star", "smoke", "people"];
    const [sort, setSort] = useState(0);
    const [direction, setDirection] = useState(false);

    const [location, setLocation] = useState<Location>({latitude: null, longitude: null});

    const sortedResult = Object.values(results).filter(t => {
        if (location.latitude !== null && location.longitude !== null ) {
            t.distance = Math.round(haversineDistance(location.latitude, location.longitude, t.locationX, t.locationY));
        } else {
            t.distance = 0;
        }

        return (
                t.name.toLowerCase().includes(filter.name.toLowerCase()) ||
                filter.name.toLowerCase().includes(t.name.toLowerCase())
            )
            && (t.place === filter.place || filter.place === "all")
            && filter.games.every(g => Object.keys(t.games).includes(g))
            && (filter.coins === null || filter.coins === t.coins)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
    }).sort(compareByKey(sortType[sort], direction));

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        console.log(ref.current?.style.width);
    }, [ref])

    return (
        <Stack sx={{
            px: 2, py: 4
        }} spacing={2} ref={ref}>
            <LocationRequires setLocation={setLocation} />
            <Filter filter={filter} setFilter={(f: SetStateAction<filterType>) => setFilter(f)}/>
            <Divider flexItem>Results ({sortedResult.length})</Divider>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Button size={"small"} variant={"outlined"} startIcon={<Cached/>} onClick={() => {
                    loadData();
                }}>Reload</Button>
                <ButtonGroup size={"small"} variant="contained">
                    <Button startIcon={<Sort/>} onClick={() => setSort(sort === (sortType.length - 1) ? 0 : sort + 1)}>
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
            {sortedResult.map(t => {
                return <Card key={t.name}>
                    <CardActionArea onClick={() => navigate("/info/" + t.id)}>
                        <CardHeader title={t.name} sx={{pb: 0}}/>
                        <CardContent sx={{pt: 0}}>
                            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}
                                   sx={{lineHeight: 0}}>
                                <h3>{PlaceList[t.place]}-{t.placeD}</h3>
                                {t.coins ? <MonetizationOn/> : <CreditCard/>}
                                {t.star?.toFixed(1)}<Rating value={t.star} size={"small"} />
                                {!t.distance ?
                                    <IconButton onClick={() => window.open(t.google, "_blank")}>
                                        <LocationOn/>
                                    </IconButton> : (
                                        t.distance < 1000 ? <p>{t.distance}M</p> : <p>{(t.distance/1000).toFixed(1)}KM</p>
                                    )}
                            </Stack>
                            <Stack alignItems={"start"} sx={{ mt: 1 }}>
                                <AvatarGroup max={7} total={Object.values(t.games).reduce((a, b) => a + b[0], 0)} spacing={"medium"}>
                                    {Object.entries(t.games).map(([k, n]) =>
                                        <Badge badgeContent={n[0]} anchorOrigin={{ horizontal: "left", vertical: "top" }} color={"primary"}>
                                            <Avatar key={k} alt={k} src={gameAvatar[k]}/>
                                        </Badge>
                                    )}
                                </AvatarGroup>
                            </Stack>
                            <Stack direction={"row"} justifyContent={"space-between"}>
                                <Rating value={t.smoke} icon={<SmokingRooms color={"error"}/>}
                                        emptyIcon={<SmokeFree/>}/>
                                <Rating value={t.people} icon={<People color={"secondary"}/>}
                                        emptyIcon={<PeopleOutline/>}/>
                            </Stack>
                            <Typography fontSize={"xx-small"} color={"textSecondary"}>
                                {t.id}[{t.locationX}, {t.locationY}]
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            })}

        </Stack>
    );
}