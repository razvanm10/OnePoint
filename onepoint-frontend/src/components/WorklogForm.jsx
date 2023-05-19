import React, { useState } from 'react';
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, TableRow } from '@material-ui/core';
import {DatePicker, StaticTimePicker, TimePicker} from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import {Container, Divider, hexToRgb, Stack, useTheme} from "@mui/material";
import worklogsReducer from "../redux/reducers/worklogReducers";
import worklogs from "../worklogs";

const FormComponent = ({updateList}) => {

    const [formData, setFormData] = useState({
        description: '',
        start: null,
        stop: null,
        day: null,
        customer: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleDateChange = (name, date) => {
        setFormData((prevFormData) => ({ ...prevFormData, [name]: date }));
    };

    const handleStartHourChange = (name, hour) => {
        setFormData((prevFormData) => ({ ...prevFormData, [name]: hour }));
    };

    const handleStopHourChange = (name, hour) => {
        setFormData((prevFormData) => ({ ...prevFormData, [name]: hour }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        worklogs.push({
            description: formData.description,
            start: (new Date(Date.parse(formData.start.toString()))).getHours().toString() + ":" + (new Date(Date.parse(formData.start.toString()))).getMinutes().toString(),
            stop: (new Date(Date.parse(formData.stop.toString()))).getHours().toString() + ":" + (new Date(Date.parse(formData.stop.toString()))).getMinutes().toString(),
            day: formData.day,
            customer: formData.customer,
        })
        updateList();
    };

    return (
        <Container color={hexToRgb("#212121")}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column"
                       divider={<Divider orientation="vertical" flexItem />}
                       spacing={3}>
                    <Stack direction="row"
                           divider={<Divider orientation="vertical" flexItem />}
                           spacing={12}>
                        <StaticTimePicker
                            ampm={false}
                            defaultValue={dayjs('2022-04-17T15:30')}
                            onChange={(date) => handleStartHourChange( 'start', date)}
                        />
                        <StaticTimePicker
                            ampm={false}
                            defaultValue={dayjs('2022-04-17T15:30')}
                            onChange={(date) => handleStopHourChange( 'stop', date)}
                        />
                    </Stack>
                    <DatePicker
                        label="Basic example"
                        value={formData.day}
                        onChange={(date) => handleDateChange( 'day', date)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <TextField
                        label="Description"
                        name="description"
                        fullWidth
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Customer</InputLabel>
                        <Select
                            name="customer"
                            value={formData.customer}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="customer1">Customer 1</MenuItem>
                            <MenuItem value="customer2">Customer 2</MenuItem>
                            <MenuItem value="customer3">Customer 3</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" onSubmit={handleSubmit}>
                        Submit
                    </Button>
                </Stack>
            </form>
        </Container>

    );
};

export default FormComponent;
