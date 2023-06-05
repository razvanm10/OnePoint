import React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import worklogs from "../worklogs";
import {List, Paper} from "@mui/material";
import WorkslipCard from "./WorkslipCard";

const WorklogsList = () => {
    return (
        <Paper elevation={10} sx={{minHeight: 385, borderRadius: 3}}>
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 385,
                }}

                subheader={<Card/>}
            >{
                worklogs.map(worklog =>
                    <Grid item sx={{paddingTop: 1, paddingBottom: 1, paddingLeft: 2, paddingRight: 2}}>
                        <Paper elevation={5}>
                            <WorkslipCard workslip={worklog}/>
                        </Paper>
                    </Grid>
                )}
            </List>
        </Paper>

    );
};

export default WorklogsList;
