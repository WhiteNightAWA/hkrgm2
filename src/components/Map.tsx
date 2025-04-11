import {Alert, Badge, Box, Button, Dialog, DialogContent, Stack} from "@mui/material";
import {ReactElement, useState} from "react";
import {blue, green, orange, purple, red} from "@mui/material/colors";
import {gamesMap} from "../data.ts";
import MachineDetails from "./MachineDetails.tsx";
import BGBox from "../ass/background box.png";
import {Logout} from "@mui/icons-material";

const tempData: { [key: string]: { size: number[], color: string } } = {
    "maimaidx": {
        size: [192.6, 131.6, 223.4],
        color: blue[500]
    },
    "iidx": {
        size: [158, 152, 236.5],
        color: red[300]
    },
    "jubeat": {
        size: [75, 109, 193],
        color: green[400]
    },
    "taiko": {
        size: [200, 126, 200],
        color: orange[400]
    },
    "wacca": {
        size: [61.976, 99.822, 199.898],
        color: purple[600]
    },
    "chunithm": {
        size: [89, 96, 232],
        color: orange[600]
    },
}

export interface MachineDetailsType {
    type: string,
    label: string,
    place: string,
    problems?: { [key: string]: string },
    version?: string;
    price?: number;
    unclickable?: boolean;
    size?: {
        width: number,
        height: number
    }
}

const iconMap: {
    [key: string]: ReactElement
} = {
    "exit": <Logout />
}

export const tempMacDeData: {
    [key: string]: MachineDetailsType;
} = {
    "1": {type: "jubeat", label: "J1", place: "goldG"},
    "2": {type: "jubeat", label: "J2", place: "goldG"},
    "3": {type: "jubeat", label: "J3", place: "goldG"},
    "4": {type: "jubeat", label: "J4", place: "goldG"},
    "5": {type: "iidx", label: "I1", place: "goldG"},
    "6": {type: "maimaidx", label: "M1", place: "goldG"},
    "7": {type: "maimaidx", label: "M2", place: "goldG"},
    "8": {type: "maimaidx", label: "M3", place: "goldG"},
    "9": {type: "taiko", label: "T1", place: "goldG"},
    "10": {type: "taiko", label: "T2", place: "goldG"},
    "11": {type: "taiko", label: "T3", place: "goldG"},
    "12": {type: "wacca", label: "W1", place: "goldG"},
    "13": {type: "wacca", label: "W2", place: "goldG"},
    "14": {type: "chunithm", label: "C1", place: "goldG"},
    "15": {type: "chunithm", label: "C2", place: "goldG"},
    "io1": {type: "icon", label: "exit", place: "goldG", unclickable: true, size: {width: 1, height: 2}},
}

const tempMacData = [
    {
        pos: [0, 10],
        row: false,
        data: [
            "io1"
        ]
    },
    {
        pos: [0, 0],
        row: false,
        data: [
            "1",
            "2",
            "3",
            "4"
        ]
    },
    {
        pos: [4, 1],
        row: true,
        data: [
            "5"
        ]
    },
    {
        pos: [6, 2],
        row: true,
        data: [
            "6",
            "7",
            "8",
        ]
    },
    {
        pos: [3, 6],
        row: true,
        data: [
            "9", "10"
        ]
    },
    {
        pos: [8, 7],
        row: true,
        data: [
            "11",
            "12",
            "13",
        ]
    },
    {
        pos: [9, 12],
        row: true,
        data: [
            "14", "15"
        ]
    },
];

export default function Map({ highlight } : {highlight?: string}) {
    const [open, setOpen] = useState(false);
    const zoomSize = 2;
    const squreSize = 50;

    return <>
        <Button fullWidth variant={"outlined"} onClick={() => setOpen(true)}>
            Map of Machines
        </Button>
        <Dialog open={open} maxWidth={"xl"} onClose={() => setOpen(false)}>
            <DialogContent>
                <Alert severity={"error"}>仍在開發中</Alert>

                <Box sx={{
                    backgroundSize: "50px 50px",
                    backgroundImage: `url(${BGBox})`,
                    position: "relative",
                    height: `${14 * squreSize}px`,
                    width: `${13 * squreSize}px`
                }}>
                    {tempMacData.map(row => <Stack sx={{
                        position: "absolute",
                        top: `${row.pos[1] * squreSize + squreSize / 2.5}px`,
                        left: `${row.pos[0] * squreSize + squreSize / 2.5}px`
                    }} direction={row.row ? "row" : "column"} spacing={2} width={"fit-content"}>
                        {row.data.map(m => (
                            tempMacDeData[m].type === "icon" ? <Box
                                border={"solid 1px white"} borderRadius={"5px"}
                                display={"flex"} alignItems={"center"} justifyContent={"center"}
                                width={tempMacDeData[m]?.size?.width * squreSize} height={tempMacDeData[m]?.size?.height * squreSize}>
                                {iconMap[tempMacDeData[m].label]}
                            </Box> : <Badge
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }} badgeContent={tempMacDeData[m].label}
                                color={"secondary"} sx={{height: "fit-content"}}
                            >
                                <MachineDetails data={tempMacDeData[m]} unclickable={tempMacDeData[m].unclickable}>
                                    <Button variant={"contained"} sx={{
                                        minWidth: 0,
                                        minHeight: 0,
                                        width: `${tempData[tempMacDeData[m].type].size[row.row ? 0 : 1] / zoomSize}px`,
                                        height: `${tempData[tempMacDeData[m].type].size[row.row ? 1 : 0] / zoomSize}px`,
                                        backgroundColor: tempData[tempMacDeData[m].type].color,
                                        transition: "filter 0.5s",
                                        textTransform: "none",
                                        "&:hover": {
                                            filter: "brightness(0.75)"
                                        },
                                        boxShadow: highlight===tempMacDeData[m].label ? "gold 0 0 1em 1em" : ""
                                    }} color={undefined}>
                                        {gamesMap[tempMacDeData[m].type]}
                                    </Button>
                                </MachineDetails>
                            </Badge>
                        ))}
                    </Stack>)}
                </Box>
            </DialogContent>
        </Dialog>
    </>
}