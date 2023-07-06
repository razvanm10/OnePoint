import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@mui/material';

import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import {Stack} from "@mui/material";

Chart.register(CategoryScale, LinearScale, BarController, BarElement);

const EmployeeClientWorkedHoursChart = ({ data }) => {
    // Extracting the labels and values from the data
    const labels = data.map(entry => entry.task);
    const values = data.map(entry => entry.hours);

    // Creating the chart data object
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Work Hours',
                data: values,
                backgroundColor: 'primary.input',
            },
        ],
    };

    // Chart options
    const chartOptions = {
        scales: {
            y: {
                type: 'linear', // Specify the type as "linear"
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Hours',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Task',
                },
            },
        },
    };

    return (
        <Stack spacing={3}>
            <Typography variant="h6" gutterBottom>
                Employee Work Hours per Task
            </Typography>
            <Bar color={""} data={chartData} options={chartOptions} />
        </Stack>


    );
};

export default EmployeeClientWorkedHoursChart;