import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const WorkedHoursChart = ({ hours }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const calculateChartData = () => {
            const data = [];
            const filledHours = Math.min(hours, 8);
            const remainingHours = Math.max(hours - 8, 0);

            // Add the filled hours to the chart data
            data.push({ name: 'Filled', value: filledHours });

            // Add the remaining hours as an inner pie if more than 8 hours
            if (remainingHours > 0) {
                data.push({ name: 'Remaining', value: remainingHours });
            }

            setChartData(data);
        };

        calculateChartData();
    }, [hours]);

    const COLORS = ['#8884d8', '#82ca9d'];

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={chartData}
                cx={200}
                cy={200}
                outerRadius={80}
                innerRadius={60}
                fill="#8884d8"
                label
                dataKey="value"
            >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
        </PieChart>
    );
};

export default WorkedHoursChart;
