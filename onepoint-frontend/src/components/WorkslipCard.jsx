import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';

const WorkslipCard = ({ workslip }) => {
    return (
        <Card sx={{ backgroundColor: '#e0f7fa' }}>
            <CardContent>
                <Typography variant="h6" sx={{ color: '#00806b' }}>
                    Description: {workslip.description}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <AccessTimeIcon sx={{ color: '#00806b' }} />
                    <Typography variant="subtitle1" sx={{ marginLeft: '5px' }}>
                        Start: {workslip.start}
                    </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <AccessTimeIcon sx={{ color: '#00806b' }} />
                    <Typography variant="subtitle1" sx={{ marginLeft: '5px' }}>
                        Stop: {workslip.stop}
                    </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <WorkIcon sx={{ color: '#00806b' }} />
                    <Typography variant="subtitle1" sx={{ marginLeft: '5px' }}>
                        Project: Project
                    </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <PersonIcon sx={{ color: '#00806b' }} />
                    <Typography variant="subtitle1" sx={{ marginLeft: '5px' }}>
                        Customer: {workslip.customer}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};

export default WorkslipCard;
