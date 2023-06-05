import React, {useState} from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import worklogs from "../worklogs";
import {CircularProgress, List, Paper} from "@mui/material";
import WorkslipCard from "./WorkslipCard";
import EmployeeCard from "./EmployeeCard";

const EmployeesList = ({employees}) => {

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
                employees !== null ? employees.map(emp =>
                    <Grid item sx={{paddingTop: 1, paddingBottom: 1, paddingLeft: 2, paddingRight: 2}}>
                        <Paper elevation={5}>
                            <EmployeeCard name={emp.name} position={"position"}/>
                        </Paper>
                    </Grid>
                ) : <CircularProgress/>}
            </List>
        </Paper>

    );
};

export default EmployeesList;
