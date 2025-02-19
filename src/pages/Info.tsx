import {useParams} from "react-router";
import {
    Box,
    Button,
    Chip,
    Divider,
    Paper,
    Rating,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {gamesMap, PlaceType} from "../data.ts";
import {
    Add,
    CreditCard,
    Label,
    MonetizationOn,
    People,
    PeopleOutline,
    SmokeFree,
    SmokingRooms
} from "@mui/icons-material";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import Comments from "../components/Comments.tsx";

export function Info() {
    const {id} = useParams();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
    const data: PlaceType = (JSON.parse(localStorage.getItem("places") as string) || {})[id];
    console.log(data);

    return <>
        <Stack overflow={"auto"}>

            {data.img &&
                <div style={{position: "relative"}}>
                    <img src={data.img} alt={"image of place"} style={{width: "100%"}}/>
                    <div className={"gradient-overlay"}/>
                </div>
            }

            <Stack p={2} spacing={1} sx={data.img ? { mt: -10, zIndex: 9 } : {}}>


                <Typography color={"textSecondary"} fontSize={"xx-small"}>
                    ID: {data.id}
                </Typography>
                <Typography fontSize={"xx-large"}>
                    {data.name}
                </Typography>
                <Box sx={{"*": {m: 0.25}}}>
                    {
                        data.coins
                            ? <Chip label={"收一蚊銀"} icon={<MonetizationOn/>}/>
                            : <Chip label={"拍卡"} icon={<CreditCard/>}/>
                    }
                    {data.nicks.map((n: string, i: number) => <Chip key={i} label={n} icon={<Label/>}/>)}
                </Box>
                <Typography color={"textSecondary"}>
                    {data.desc}
                </Typography>

                <Divider>Map</Divider>
                {/*<Button variant={"contained"} endIcon={<Launch/>} onClick={() => window.open(data.google, "_blank")}>Google Map</Button>*/}
                <iframe
                    src={data.google}
                    loading={"lazy"}
                    referrerPolicy="no-referrer-when-downgrade"
                    height={200}
                />
                <Divider>Arcades</Divider>

                <TableContainer component={Paper}>
                    <Table size={"small"}>
                        <TableHead>
                            <TableRow>
                                <TableCell>name</TableCell>
                                <TableCell>version</TableCell>
                                <TableCell>count</TableCell>
                                <TableCell>price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{
                            "tr": {
                                transition: "background-color 0.25s",
                                whiteSpace: "nowrap",
                                "&:hover": {
                                    "backgroundColor": "rgba(255,255,255,0.25)"
                                }
                            }
                        }}>
                            {Object.entries(data.games).map(([name, d]) => <TableRow key={name}>
                                <TableCell>{gamesMap[name]}</TableCell>
                                <TableCell>{d[1]}</TableCell>
                                <TableCell>{d[0]}</TableCell>
                                <TableCell>${d[2]}</TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button fullWidth variant={"outlined"}>
                    Map of Machines
                </Button>

                <Divider>Comments</Divider>

                <Stack justifyContent={"space-around"} alignItems={"center"} direction={"row"}>
                    <h1>{typeof data.star === "number" ? data.star?.toFixed(1) : 0}</h1>
                    <Rating
                        size={"large"}
                        value={data.star}
                        readOnly
                    />
                    <p>(?)</p>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-around"}>
                    <Rating value={data.smoke} icon={<SmokingRooms color={"error"}/>} emptyIcon={<SmokeFree/>}/>
                    <Rating value={data.people} icon={<People color={"secondary"}/>} emptyIcon={<PeopleOutline/>}/>
                </Stack>
                <Comments id={id}/>
                {
                    useIsAuthenticated() ?
                        <Button fullWidth variant={"outlined"} color={"success"} startIcon={<Add/>}>
                            Add comment
                        </Button> :
                        <Button fullWidth variant={"contained"} disabled>
                            Please Login to add comment
                        </Button>
                }

                <Divider>Others</Divider>
                {Object.entries(data.links).map(([key, link]) => <Button
                    variant={"contained"}
                    onClick={() => window.open(link, "_target")}
                    key={key}
                >
                    {key}
                </Button>)}
                <Button fullWidth variant={"outlined"}>
                    Report problems
                </Button>
            </Stack>
        </Stack>
    </>;
}