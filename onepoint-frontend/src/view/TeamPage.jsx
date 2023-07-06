import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useDrop } from 'react-dnd';
import { EmployeeContext } from '../context/EmployeeContext';
import { TeamContext } from '../context/TeamsContext';
import { ItemTypes } from '../ItemTypes';
import DroppableEmployeeList from '../dnd-components/DroppableEmployeeList';
import DraggableEmployeeCard from '../dnd-components/DraggableEmployeeCard';

const TeamPage = () => {
    const { addEmployeeToTeam } = useContext(TeamContext);
    const [teamMembers, setTeamMembers] = useState([]);
    const [employeesState, setEmployeesState] = useState([])
    const {employees} = useContext(EmployeeContext)
    useEffect(() => {
    }, []);


    const handleDrop = async (employeeId) => {
        console.log(employees)
        const draggedEmployee = employees.find((employee) => employee.id === employeeId);
        console.log(draggedEmployee)
        if (draggedEmployee) {
            await addEmployeeToTeam(15, draggedEmployee.id);
            setTeamMembers((prevMembers) => [...prevMembers, draggedEmployee]);
        }
        console.log(employeeId)
    };

    const [, leftDrop] = useDrop(() => ({
        accept: ItemTypes.EMPLOYEE,
        drop: (item) => handleDrop(item.id),
    }));

    const [, rightDrop] = useDrop(() => ({
        accept: ItemTypes.EMPLOYEE,
        drop: (item) => handleDrop(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),

    }));

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Box ref={leftDrop}>
                    <Typography variant="h5" component="div" sx={{ marginBottom: '1rem' }}>
                        Employee List
                    </Typography>
                    <DroppableEmployeeList employees={employees} />
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box sx={{ minHeight: 385 }} ref={rightDrop}>
                    <Typography variant="h5" component="div" sx={{ marginBottom: '1rem' }}>
                        Team Members
                    </Typography>
                    {teamMembers.map((member) => (
                        <DraggableEmployeeCard key={member.id} employee={member} />
                    ))}
                </Box>
            </Grid>
        </Grid>
    );
};

export default TeamPage;
