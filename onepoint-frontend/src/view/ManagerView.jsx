import React from 'react';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Divider, Paper, Stack} from "@mui/material";
import OnepointAppBar from "../components/OnepointAppBar";
import {LocalizationProvider} from "@mui/x-date-pickers";
import Box from "@mui/material/Box";
import EmployeesList from "../components/EmployeeList";

function ManagerView({myTeam}) {

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
                            <EmployeesList employees={myTeam}/>
                        </Paper>
                        <Box sx={{height: 10, backgroundColor: 'primary.input'}}>
                        </Box>
                    </Stack>
                </Stack>
            </Stack>

        </LocalizationProvider>
    );
}

export default ManagerView;