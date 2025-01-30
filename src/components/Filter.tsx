import {Dispatch, SetStateAction} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete, FormControl,
    Icon, InputLabel, MenuItem, Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {FilterAlt, ExpandMore} from "@mui/icons-material";
import {filterType} from "../pages/Search.tsx";
import {gamesMap} from "../data.ts";

export function Filter({filter, setFilter}: {
    filter: filterType, setFilter: Dispatch<SetStateAction<filterType>>
}) {


    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore/>}
            >
                <Icon sx={{mr: 2}}><FilterAlt/></Icon>
                <Typography variant="h6">Filter</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={2} direction={"row"}>

                    <TextField
                        label={"keywords"}
                        value={filter.name}
                        onChange={(e) => setFilter({...filter, name: e.target.value})}
                    />

                    <FormControl sx={{ width: "50%" }}>
                        <InputLabel>地區</InputLabel>
                        <Select
                            value={filter.place}
                            variant={"outlined"}
                            label={"地區"}
                        >
                            {[
                                ["all", "全部"],
                                ["nt", "新界"],
                                ["kn", "九龍"],
                                ["hki", "香港島"]
                            ].map((item) => <MenuItem value={item[0]}>
                                {item[1]}
                            </MenuItem>)}
                        </Select>
                    </FormControl>
                </Stack>


                <Autocomplete
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            variant="standard"
                            label="Games"
                            placeholder=""
                        />
                    }
                    value={filter.games}
                    onChange={(_event, newValue: string[]) => setFilter({ ...filter, games: newValue })}
                    multiple
                    getOptionLabel={(key: string) => gamesMap[key]}
                    options={Object.keys(gamesMap)}
                />
            </AccordionDetails>
        </Accordion>
    );
}
