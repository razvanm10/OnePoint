import React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import {CircularProgress, List, Paper} from "@mui/material";
import EmployeeCard from "./EmployeeCard";

const mapPosition = (positionAsNumber) => {
  switch (positionAsNumber) {
      // BackendDeveloper(0),
      //     FrontendDeveloper(1),
      //     ScrumMaster(2),
      //     ProductOwner(3),
      //     Tester(4),
      //     FullstackDeveloper(5),
      //     Manager(6);
      case 0: return "Backend Developer";
      case 1: return "Frontend Developer";
      case 2: return "Scrum Master";
      case 3: return "Product Owner";
      case 4: return "Tester";
      case 5: return "Fullstack Developer";
      case 6: return "Manager";
      default: return "";
  }
}

const EmployeesList = ({employees}) => {

    return (
        <Paper elevation={10} sx={{minHeight: 385, borderRadius: 3}}>
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 385,
                }}

                subheader={<Card/>}
            >{
                employees !== null ? employees.map(emp =>
                    <Grid item sx={{paddingTop: 1, paddingBottom: 1, paddingLeft: 2, paddingRight: 2}}>
                        <Paper elevation={5}>
                            <EmployeeCard
                                name={emp.name}
                                position={mapPosition(emp.currentPosition)}
                            />
                        </Paper>
                    </Grid>
                ) : <CircularProgress/>}
            </List>
        </Paper>

    );
};

export default EmployeesList;
