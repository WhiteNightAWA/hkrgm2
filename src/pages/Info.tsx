import {useParams} from "react-router";
import {
    Alert,
    Box,
    Button,
    Chip, Dialog, DialogTitle,
    Divider, List, ListItemButton,
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
import {gamesMap, mobileCheck, PlaceList, PlaceType} from "../data.ts";
import {CreditCard, Label, MonetizationOn, People, PeopleOutline, SmokeFree, SmokingRooms} from "@mui/icons-material";
import Comments from "../components/Comments.tsx";
import AddComment from "../components/AddComment.tsx";
import {useContext, useState} from "react";
import {PlacesContext} from "../App.tsx";
import Map, {tempMacDeData} from "../components/Map.tsx";
import MachineDetails from "../components/MachineDetails.tsx";

export function Info() {
    const id = useParams().id || "";

    const d = useContext(PlacesContext).data || {};

    const data: PlaceType | null = Object.keys(d).includes(id) ? d[id] : null;

    const isMobile = mobileCheck();

    const [selected, setSelected] = useState<string>("");

    return <>{data === null ? <></> :
        <Stack overflow={"auto"} mb={5}>

            {data.img &&
                <div style={{position: "relative"}}>
                    <img src={data.img} alt={"image of place"} style={{width: "100%"}}/>
                    <div className={"gradient-overlay"}/>
                </div>
            }

            <Stack p={2} spacing={1} sx={data.img ? {mt: -10, zIndex: 9} : {}}>

                <Typography color={"textSecondary"} fontSize={"xx-small"}>
                    ID: {data.id} | LastUpdate: {data.last_edit}
                </Typography>
                {data.check !== 1 && <Alert severity={"warning"}>
                    此機舖內容尚未被證實, 資料僅供參考
                </Alert>}
                <Typography variant={isMobile ? "h4" : "h1"}>
                    {data.name}
                </Typography>
                <h3>
                    {PlaceList[data.place]}-{data.placeD}
                </h3>
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

                <Stack direction={isMobile ? "column" : "row"} spacing={2} justifyContent={"space-around"}>

                    <Stack width={!isMobile ? "65%" : "100%"} spacing={2}>
                        <Divider>Map</Divider>
                        {/*<Button variant={"contained"} endIcon={<Launch/>} onClick={() => window.open(data.google, "_blank")}>Google Map</Button>*/}
                        <iframe
                            src={data.google}
                            loading={"lazy"}
                            referrerPolicy="no-referrer-when-downgrade"
                            height={isMobile ? 200 : 500}
                            width="100%"
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
                                    {Object.entries(data.games).map(([name, d]) => <TableRow key={name}
                                                                                             onClick={() => setSelected(name)}>
                                        <TableCell>{gamesMap[name]}</TableCell>
                                        <TableCell>{d[1]}</TableCell>
                                        <TableCell>{d[0]}</TableCell>
                                        <TableCell>${d[2]}</TableCell>
                                    </TableRow>)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Map/>
                    </Stack>
                    <Dialog open={selected !== ""} onClose={() => setSelected("")} fullWidth maxWidth={"md"}>
                        <Alert severity={"error"}>仍在開發中</Alert>
                        <DialogTitle>{gamesMap[selected]} List</DialogTitle>
                        <List>
                            {Object.values(tempMacDeData).filter(i => i.type === selected).map(m =>
                                <MachineDetails data={m} openlabel={m.label}>
                                    <ListItemButton>
                                        {m.label}
                                    </ListItemButton>
                                </MachineDetails>
                            )}
                        </List>
                    </Dialog>

                    <Stack width={!isMobile ? "25%" : "100%"} spacing={2}>
                        <Stack spacing={1}>

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
                                <Rating value={data.smoke} icon={<SmokingRooms color={"error"}/>}
                                        emptyIcon={<SmokeFree/>}/>
                                <Rating value={data.people} icon={<People color={"secondary"}/>}
                                        emptyIcon={<PeopleOutline/>}/>
                            </Stack>

                            <Comments id={id}/>
                            <AddComment id={id}/>

                        </Stack>
                        <Stack spacing={1}>

                            <Divider>Others</Divider>
                            {data.links !== null && Object.entries(data.links).map(([key, link]) => <Button
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
                </Stack>
            </Stack>
        </Stack>
    }
    </>;
}