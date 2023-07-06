import React from 'react';
import { useDrag } from 'react-dnd';
import {Card, CardContent, Typography, useTheme} from '@mui/material';
import { ItemTypes } from '../ItemTypes';
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";

const DraggableEmployeeCard = ({ employee }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.EMPLOYEE,
        item: { id: employee.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

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
        <Card
            style={cardStyle}
            ref={drag}
            sx={{

                cursor: 'move',
                marginBottom: '0.5rem',
            }}
        >
            <CardContent>
                <Typography variant="h5" component="div">
                    <PersonIcon style={iconStyle} />
                    {employee.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                    <WorkIcon style={iconStyle} />
                    {employee.position}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default DraggableEmployeeCard;
