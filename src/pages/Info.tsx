import {useParams} from "react-router";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Dialog,
    DialogTitle,
    Divider,
    List,
    ListItemButton,
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
import Ratings from "../components/Ratings.tsx";
import AddRating from "../components/AddRating.tsx";
import {useContext, useEffect, useState} from "react";
import {PlacesContext} from "../App.tsx";
import Map, {tempMacDeData} from "../components/Map.tsx";
import MachineDetails from "../components/MachineDetails.tsx";
import AddComment from "../components/AddComment.tsx";
import {axios} from "../main.tsx";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../styles/info.css"

interface CommentProps {
    id: number;
    userid: number;
    targetId: string;
    content: string
    title: string;
    images: string;
    time: string;
    username: string;
    avatar: string;
}

export function Info() {
    const id = useParams().id || "";

    const d = useContext(PlacesContext).data || {};

    const data: PlaceType | null = Object.keys(d).includes(id) ? d[id] : null;

    const isMobile = mobileCheck();

    const [selected, setSelected] = useState<string>("");

    const [comments, setComments] = useState<CommentProps[]>([]);


    const renderComments = (left: number) => {
        return comments.map((comment, index) =>
                index % 2 === left && <Card elevation={4} sx={{width: "100%"}} key={comment.username}>
                    <CardContent>
                        <Typography variant={"h5"}>
                            {comment.title}
                        </Typography>
                        <Typography color={"textSecondary"}>
                            {comment.content}
                        </Typography>

                        {JSON.parse(comment.images).length > 0 && <ImageGallery items={JSON.parse(comment.images).map((i: string) => {
                            return {
                                original: `https://res.cloudinary.com/dwspfktjh/image/upload/v1749505748/${i}`,
                                originalClass: "displayImage"
                            }
                        })} autoPlay showBullets/>}
                    </CardContent>
                    <CardActions>
                        <Stack direction={isMobile ? "column" : "row"} spacing={1}>
                            <Stack direction={"row"}>
                                <Avatar src={comment.avatar} alt={comment.username} sx={{width: 25, height: 25}}/>
                                <Typography>{comment.username}</Typography>
                            </Stack>
                            <Typography color={"textSecondary"}>{comment.time}</Typography>
                        </Stack>
                    </CardActions>
                </Card>
        )
    }
    console.log(data);

    useEffect(() => {
        if (data?.close) {
            axios.get("/comments/" + id).then(r => {
                if (r.status === 200) {
                    setComments(JSON.parse(r.data));
                }
            });
        }
    }, [id]);

    return <>{data === null ? <></> :
        <Stack overflow={"auto"} mb={5}>

            {data.img &&
                <div style={{position: "relative"}}>
                    <img src={data.img} alt={"image of place"}
                         style={{width: "100%", maxHeight: "50vh", objectFit: "cover"}}/>
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
                {data.close && <Alert severity={"error"}>
                    此機舖已結業!
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

                {data.close &&
                    <Stack spacing={3}>
                        <Divider>結業留言區</Divider>
                        <AddComment id={id}/>
                        <Stack direction={isMobile ? "column" : "row"} spacing={2}>
                            <Stack width={"100%"} spacing={2}>{renderComments(0)}</Stack>
                            <Stack width={"100%"} spacing={2}>{renderComments(1)}</Stack>
                        </Stack>
                    </Stack>
                }

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
                                    precision={0.1}
                                />
                                <p>(?)</p>
                            </Stack>
                            <Stack direction={"row"} justifyContent={"space-around"}>
                                <Rating value={data.smoke} icon={<SmokingRooms color={"error"}/>}
                                        precision={0.1}
                                        emptyIcon={<SmokeFree/>} readOnly/>
                                <Rating value={data.people} icon={<People color={"secondary"}/>}
                                        precision={0.1}
                                        emptyIcon={<PeopleOutline/>} readOnly/>
                            </Stack>

                            <Ratings id={id}/>
                            {data.close ? <Button variant={"outlined"} disabled>機舖已結業</Button> :
                                <AddRating id={id}/>}

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