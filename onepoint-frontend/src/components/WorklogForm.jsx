import React, { useState } from 'react';
import {DatePicker, StaticTimePicker} from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import {
    Button,
    Container,
    Divider,
    FormControl,
    InputLabel,
    MenuItem, Paper,
    Select,
    Stack,
    TextField,
} from "@mui/material";
import worklogs from "../worklogs";
import Box from "@mui/material/Box";

const FormComponent = ({updateList}) => {

    const [formData, setFormData] = useState({
        description: '',
        start: null,
        stop: null,
        day: null,
        project: '',
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
        if (formData.start > formData.stop) {
            console.log("start bigger than stop")
        }
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
        <Container>
            <form onSubmit={handleSubmit} color='primary'>
                <Stack direction="column"
                       divider={<Divider orientation="vertical" flexItem />}
                       justifyContent='space-evenly'
                       spacing={1}>
                    <Stack direction="row"
                           alignItems="center"
                           spacing={12}>
                        <Paper elevation={3}>
                            <StaticTimePicker
                                sx={{backgroundColor: 'primary.input'}}
                                ampm={false}
                                defaultValue={dayjs('2022-04-17T15:30')}
                                onChange={(date) => handleStartHourChange( 'start', date)}
                            />
                        </Paper>

                        <Paper elevation={3}>
                            <StaticTimePicker
                                sx={{backgroundColor: 'primary.input'}}
                                ampm={false}
                                defaultValue={dayjs('2022-04-17T15:30')}
                                onChange={(date) => handleStopHourChange( 'stop', date)}
                            />
                        </Paper>

                    </Stack>
                    <Stack direction="column"
                           divider={<Divider orientation="vertical" flexItem />}
                           alignItems="center"
                           spacing={1.5}>
                        <DatePicker
                            sx={{backgroundColor: 'primary.input'}}
                            label="Basic example"
                            value={formData.day}
                            onChange={(date) => handleDateChange( 'day', date)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TextField
                            sx={{backgroundColor: 'primary.input'}}
                            label="Description"
                            name="description"
                            fullWidth
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                        <FormControl fullWidth >
                            <InputLabel id="customer">Customer</InputLabel>
                            <Select
                                name="customer"
                                labelId="customer"
                                sx={{backgroundColor: 'primary.input'}}
                                value={formData.customer}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="customer1">Customer 1</MenuItem>
                                <MenuItem value="customer2">Customer 2</MenuItem>
                                <MenuItem value="customer3">Customer 3</MenuItem>
                            </Select>
                        </FormControl>
                        <Box>
                            <Button type="submit" variant="contained" onSubmit={handleSubmit}>
                                Add Workslip
                            </Button>
                        </Box>
                    </Stack>
                </Stack>
            </form>
        </Container>

    );
};

export default FormComponent;
