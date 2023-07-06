import React from 'react';
import { Paper, List } from '@mui/material';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
import DraggableEmployeeCard from './DraggableEmployeeCard';

const DroppableEmployeeList = ({ employees }) => {
    const handleDrop = (employeeId) => {
        console.log(employeeId)
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.EMPLOYEE,
        drop: (item) => handleDrop(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <Paper elevation={10} sx={{ minHeight: 385, borderRadius: 3 }}>
            <List
                ref={drop}
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 385,
                    backgroundColor: isOver ? 'lightblue' : 'inherit',
                }}
                subheader={null}
            >
                {employees.map((emp) => (
                    <DraggableEmployeeCard key={emp.id} employee={emp} />
                ))}
            </List>
        </Paper>
    );
};

export default DroppableEmployeeList;
