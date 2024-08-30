import {useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete, Checkbox,
    Icon,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {FilterAlt, ExpandMore, CheckBoxOutlineBlank, CheckBox} from "@mui/icons-material";

export function Filter({filter, setFilter}) {


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

                    <TextField
                        label={"keywords"}
                        value={filter.name}
                        onChange={(e) => setFilter({...filter, name: e.target.value})}
                        fullWidth

                    />

                    <Stack direction="row" spacing={2}>
                        <Autocomplete
                            multiple
                            renderInput={(params) => (
                                <TextField {...params} label="Places"/>
                            )}
                            style={{width: "50%"}}
                            options={[
                                ["NT", "nt"]
                            ]}
                            getOptionLabel={(option) => option[0]}
                            renderOption={(props, option, {selected}) => {
                                const {key, ...optionProps} = props;
                                return (
                                    <li key={key} {...optionProps}>
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlank fontSize="small"/>}
                                            checkedIcon={<CheckBox fontSize="small"/>}
                                            style={{marginRight: 8}}
                                            checked={selected}
                                        />
                                        {option[0]}
                                    </li>
                                );
                            }}
                        />
                    </Stack>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}
