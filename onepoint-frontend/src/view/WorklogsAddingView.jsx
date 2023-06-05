import React, {useState} from 'react';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Divider, Grid, Paper, Stack} from "@mui/material";
import OnepointAppBar from "../components/OnepointAppBar";
import FormComponent from "../components/WorklogForm";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import WorklogsList from "../components/WorklogsList";
import worklogs from "../worklogs";
import Box from "@mui/material/Box";

function WorklogsAddingView() {

    let [workslips, setWorkslips] = useState(worklogs);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <OnepointAppBar/>
            <Stack
                direction="column"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
                sx={{backgroundColor: 'secondary.main', paddingTop: 2, paddingBottom: 5}}
            >

                <Stack direction="row"
                       divider={<Divider orientation="vertical" flexItem/>}
                       spacing={10}>

                    <Stack spacing={1} direction="column" divider={<Divider orientation="vertical" flexItem/>}>
                        <Paper elevation={10}>
                            <DateCalendar sx={{backgroundColor: 'primary.input'}} defaultCalendarMonth={dayjs('2022-04-17T15:30')}/>
                        </Paper>
                        <Box sx={{height: 10, backgroundColor: 'primary.input'}} >
                            <WorklogsList worklogs={workslips}/>
                        </Box>
                    </Stack>
                    <FormComponent updateList={() => setWorkslips([...workslips])}/>
                </Stack>
            </Stack>

        </LocalizationProvider>
    );
}

export default WorklogsAddingView;