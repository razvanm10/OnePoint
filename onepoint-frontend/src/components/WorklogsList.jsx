import React from 'react';
import { List, ListItem } from '@mui/material';
import WorkslipCard from "./WorkslipCard";

const WorklogsList = ({ worklogs }) => {
    return (
        <List sx={{ display: 'flex', maxHeight: '300px' }}>
            {worklogs.map((worklog) => (
                <ListItem key={worklog.id} sx={{ minWidth: '300px' }}>
                    <WorkslipCard workslip={worklog}></WorkslipCard>
                </ListItem>
            ))}
        </List>
    );
};

export default WorklogsList;
