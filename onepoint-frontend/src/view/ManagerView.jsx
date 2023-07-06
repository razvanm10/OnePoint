import React, { useContext } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CircularProgress, Stack } from '@mui/material';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import OnepointAppBar from '../components/OnepointAppBar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import WorklogsAddingView from './WorklogsAddingView';
import { AuthContext } from '../context/AuthContext';
import { WorklogsContextProvider } from '../context/WorklogsContext';
import MyTeamView from './MyTeamView';
import UnresolvedDiscussionsView from './UnresolvedDiscussionView';

function ManagerView({ myTeam = [], logout }) {
    const { keycloakLogout } = useContext(AuthContext);

    return !myTeam ? (
        <div>
            <OnepointAppBar logout={keycloakLogout} />
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <CircularProgress />
            </div>
        </div>
    ) : (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <OnepointAppBar logout={keycloakLogout} />

            <Stack
                direction="column"
                spacing={1}
                alignItems="center"
                sx={{ backgroundColor: 'secondary.main', paddingTop: 2, paddingBottom: 5 }}
            >
                <WorklogsContextProvider>
                    <WorklogsAddingView />
                </WorklogsContextProvider>
            </Stack>
        </LocalizationProvider>
    );
}

export default ManagerView;
