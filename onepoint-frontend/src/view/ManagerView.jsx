import React from 'react';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {CircularProgress, Container, Divider, Paper, Stack} from "@mui/material";
import OnepointAppBar from "../components/OnepointAppBar";
import {LocalizationProvider} from "@mui/x-date-pickers";
import EmployeesList from "../components/EmployeeList";
import EmployeeClientWorkedHoursChart from "../components/EmployeeClientWorkedHoursChart";
import WorklogsList from "../components/WorklogsList";

function ManagerView({myTeam, logout}) {
    return (
        !myTeam ? (
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <CircularProgress/>
                </div>
        ) : (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <OnepointAppBar logout={logout}/>
                <Stack
                    direction="column"
                    spacing={1}
                    alignItems="center"
                    sx={{backgroundColor: 'secondary.main', paddingTop: 2, paddingBottom: 5}}
                >

                    <Stack direction="column"
                           divider={<Divider orientation="vertical" flexItem/>}
                           spacing={3}>

                        <Stack direction="row"

                               justifyContent="space-between"
                               spacing={3}
                        >
                            <Stack direction="column" divider={<Divider orientation="vertical" flexItem/>}
                                   justifyContent="space-evenly">
                                <h3 color="primary.main">My Team</h3>
                                <Paper elevation={10}>
                                    <EmployeesList employees={myTeam}/>
                                </Paper>

                            </Stack>
                            <Paper elevation={10}>
                                <WorklogsList />
                            </Paper>
                        </Stack>

                        <Stack spacing={1} direction="column" divider={<Divider orientation="vertical" flexItem/>}
                               justifyContent="space-evenly" >

                            <Paper elevation={10} sx={{
                                minHeight: 200,
                                minWidth: 1000
                            }}>
                                <EmployeeClientWorkedHoursChart data={[
                                    {"task": "Task 1", "hours": 10},
                                    {"task": "Task 2", "hours": 15},
                                    {"task": "Task 3", "hours": 8}
                                ]}/>
                            </Paper>
                        </Stack>
                    </Stack>
                </Stack>

            </LocalizationProvider>
        )

    );
}

export default ManagerView;