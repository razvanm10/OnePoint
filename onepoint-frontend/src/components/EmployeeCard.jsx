import React from 'react';
import { Card, CardContent, Typography, useTheme } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';

const EmployeeCard = ({ name, position }) => {
    const theme = useTheme();

    const cardStyle = {
        backgroundColor: theme.palette.secondary.main,
        marginBottom: '1rem',
    };

    const iconStyle = {
        marginRight: '0.5rem',
        color: theme.palette.primary.main,
    };

    return (
        <Card style={cardStyle}>
            <CardContent>
                <Typography variant="h5" component="div">
                    <PersonIcon style={iconStyle} />
                    {name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                    <WorkIcon style={iconStyle} />
                    {position}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default EmployeeCard;
