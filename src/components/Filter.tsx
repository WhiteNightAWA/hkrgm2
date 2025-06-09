import {Dispatch, SetStateAction} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete, Checkbox,
    FormControl, FormControlLabel,
    Icon,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import {CreditCard, ExpandMore, FilterAlt, MonetizationOn} from "@mui/icons-material";
import {filterType} from "../pages/Search.tsx";
import {gamesMap, PlaceList} from "../data.ts";

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
                <Stack spacing={2}>
                    <Stack spacing={2} direction={"row"}>

                        <TextField
                            label={"keywords"}
                            value={filter.name}
                            onChange={(e) => setFilter({...filter, name: e.target.value})}
                        />

                        <FormControl sx={{width: "50%"}}>
                            <InputLabel>地區</InputLabel>
                            <Select
                                value={filter.place}
                                variant={"outlined"}
                                label={"地區"}
                                onChange={(e) => setFilter({...filter, place: e.target.value})}
                            >
                                {Object.keys(PlaceList).map((key) => <MenuItem value={key} key={key}>
                                    {PlaceList[key]}
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
                        onChange={(_event, newValue: string[]) => setFilter({...filter, games: newValue})}
                        multiple
                        getOptionLabel={(key: string) => gamesMap[key]}
                        options={Object.keys(gamesMap)}
                    />

                    <ToggleButtonGroup exclusive value={filter.coins} onChange={(_e, n) => setFilter({...filter, coins: n})}>
                        <ToggleButton value={1}><MonetizationOn/></ToggleButton>
                        <ToggleButton value={0}><CreditCard/></ToggleButton>
                    </ToggleButtonGroup>

                    <FormControlLabel control={<Checkbox checked={filter.close} onChange={(_e, checked) => setFilter({ ...filter, close: checked })}/>} label="顯示已結業的機舖" />
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}
