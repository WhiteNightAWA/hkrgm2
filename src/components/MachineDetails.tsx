import {ReactNode, useContext, useState} from "react";
import Map, {MachineDetailsType} from "./Map.tsx";
import {
    Accordion, AccordionDetails, AccordionSummary, Alert, Box,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Divider, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow, Typography
} from "@mui/material";
import {gamesMap, MachineProblemsList, MachineProblemsListTran} from "../data.ts";
import {ExpandMore} from "@mui/icons-material";
import {PlacesContext} from "../App.tsx";
import {Link} from "react-router";

export default function MachineDetails({children, data, openlabel}: {
    children?: ReactNode,
    data: MachineDetailsType,
    openlabel?: string,
    unclickable?: boolean,
}) {
    const [open, setOpen] = useState(false);

    const places = useContext(PlacesContext).data[data.place];

    const dobles = ["maimai", "maimaidx", "taiko", "taiko_old"].includes(data.type);

    return <>
        <div onClick={() => setOpen(true)}>
            {children}

        </div>
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth={"md"} fullWidth>
            <Alert severity={"error"}>仍在開發中</Alert>
            <DialogTitle>{data.label} - {gamesMap[data.type]}</DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    <Stack>
                        <Typography>
                            所屬: <Link to={`/info/${data.place}`}>{places.name}</Link>
                        </Typography>
                        <Typography>
                            版本: {data?.version ? data.version : places.games[data.type][1]}
                        </Typography>
                        <Typography>
                            價格: {data?.version ? data.version : places.games[data.type][2]}
                        </Typography>
                    </Stack>
                    <Box>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore/>}>
                                機況
                            </AccordionSummary>
                            <AccordionDetails sx={{p: 0}}>
                                <Stack>

                                    <Divider>Machine Stats {dobles && "(P1)"}</Divider>

                                    <TableContainer>
                                        <Table size="small">
                                            <TableBody>
                                                {MachineProblemsList[data.type]?.map(p =>
                                                    <TableRow>
                                                        <TableCell>{MachineProblemsListTran[p]}</TableCell>
                                                        <TableCell align={"right"}>{
                                                            Object.keys(data.problems || {}).includes(p) && data.problems !== undefined
                                                                ? data.problems[p]
                                                                : <Typography color={"textSecondary"}>
                                                                    NO DATA
                                                                </Typography>
                                                        }</TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    {
                                        dobles && <>
                                            <Divider>Machine Stats {dobles && "(P2)"}</Divider>
                                            <TableContainer>
                                                <Table size="small">
                                                    <TableBody>
                                                        {MachineProblemsList[data.type]?.map(p =>
                                                            <TableRow>
                                                                <TableCell>{MachineProblemsListTran[p]}</TableCell>
                                                                <TableCell align={"right"}>{
                                                                    Object.keys(data.problems || {}).includes(p) && data.problems !== undefined
                                                                        ? data.problems[p]
                                                                        : <Typography color={"textSecondary"}>
                                                                            NO DATA
                                                                        </Typography>
                                                                }</TableCell>
                                                            </TableRow>
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </>
                                    }
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Stack>
            </DialogContent>
            {openlabel && <DialogActions>
                <Map highlight={openlabel}/>
            </DialogActions>}
        </Dialog>

    </>
}
