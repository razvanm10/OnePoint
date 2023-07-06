import React, {useContext} from 'react';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Divider, Paper, Stack} from "@mui/material";
import FormComponent from "../components/WorklogForm";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import WorklogsList from "../components/WorklogsList";
import Box from "@mui/material/Box";
import {WorklogsContext} from "../context/WorklogsContext";
import WorkedHoursChart from "../components/WorkedHoursChart";

function WorklogsAddingView() {

    const {worklogs} = useContext(WorklogsContext);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack
                direction="column"
                spacing={10}
                alignItems="center"
                justifyContent="space-around"
                sx={{backgroundColor: 'secondary.main', paddingTop: 2, paddingBottom: 5}}
            >
                <Stack direction="row"
                       divider={<Divider orientation="vertical" flexItem/>}
                       spacing={10}>

                    <Stack spacing={1} direction="column" divider={<Divider orientation="vertical" flexItem/>}>
                        <Paper elevation={10}>
                            <DateCalendar sx={{backgroundColor: 'primary.input', paddingTop: '2%', paddingBottom: '2%'}}
                                          defaultCalendarMonth={dayjs()}/>
                        </Paper>
                        <Box sx={{height: 5, backgroundColor: 'primary.input'}}>
                            <Paper elevation={10}>
                                <WorkedHoursChart hours={8}/>
                            </Paper>
                        </Box>
                    </Stack>
                    <FormComponent updateList={() => {
                    }}/>
                </Stack>
                <Paper elevation={10} sx={{
                    maxWidth: '50%', maxHeight: '400px',
                }}>
                    <Box sx={{
                        backgroundColor: 'primary.main',
                        maxWidth: '100%',
                        margin: '0 auto',
                        maxHeight: '400px',
                        overflow: 'auto'
                    }}>
                        <WorklogsList worklogs={worklogs}/>
                    </Box>
                </Paper>
            </Stack>
        </LocalizationProvider>
    );
}

export default WorklogsAddingView;