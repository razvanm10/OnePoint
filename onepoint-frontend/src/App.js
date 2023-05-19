import './App.css';
import Keycloak from "keycloak-js";
import {Container, Grid, Paper, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import FormComponent from "./components/WorklogForm";
import {DateCalendar, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Box, Card, CardContent, Divider, List, ListItem, Stack, Typography} from "@mui/material";
import dayjs from "dayjs";
import worklogReducers from "./redux/reducers/worklogReducers";
import {FixedSizeList} from "react-window";
import worklogs from "./worklogs";

let initOptions = {
  realm: 'onepoint',
  url: 'http://localhost:8089/auth/',
  clientId: 'resource-client',
  onLoad: 'login-required',
  KeycloakResponseType: 'code'
}

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const keycloak = new Keycloak(initOptions);
    keycloak.init({ onLoad: initOptions.onLoad, KeycloakResponseType: 'code' }).then((auth) => {
      if (!auth) {
        window.location.reload();
      } else {
        setAuthenticated(true);
        console.log("Auth token " + keycloak.token)

      }
      setTimeout(() => {
        keycloak.updateToken(70).then((refreshed) => {
          if (refreshed) {
            setAuthenticated(true)
            console.debug('Token refreshed' + refreshed);
          } else {
            console.warn('Token not refreshed, valid for '
                + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
          }
        }).catch(() => {
          console.error('Failed to refresh token');
        });

      }, 60000)

      // fetch("http://localhost:9090/authorities", {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': 'Bearer ' + keycloak.token,
      //     'Access-Control-Allow-Origin': 'http://localhost:3000',
      //     'Content-Type': 'application/json',
      //   }
      // }).then(resp => resp.json()).then(resp => setData(JSON.stringify(resp)))
      //     .catch(e => console.log("couldn't fetch data"))
      //     .then(() => console.log(data))
      //     .catch(e => console.log("couldn't fetch data"));

      fetch("http://localhost:9090/worklogs/add", {
        method: 'POST',
        body: {
            description: "test",
            employeeId: 1,
            customerId: null,
            start: 900,
            stop: 920,
            day: 1684096267
      },
        headers: {
          'Authorization': 'Bearer ' + keycloak.token,
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Content-Type': 'application/json',
        }
      }).then(resp => resp.json()).then(resp => setData(JSON.stringify(resp)))
          .catch(e => console.log("couldn't fetch data"))
          .then(() => console.log(data))
          .catch(e => console.log("couldn't fetch data"));

    }).then(() => {
    })
        .catch(() => {
      console.error("Authenticated Failed");
    });
  }, []);

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container sx={{backgroundColor: 'primary', padding: 1, borderRadius: 1, color: 'white'}}>
          <Stack direction="row"
                 divider={<Divider orientation="vertical" flexItem />}
                 spacing={6}>

            <Container>
              <FormComponent updateList={() => setData("")}/>
            </Container>

            <Container direction="column"
                       divider={<Divider orientation="vertical" flexItem />}
                       spacing={2}>

              <Stack>
                <DateCalendar defaultCalendarMonth={dayjs('2022-04-17T15:30')}/>
                  <Paper style={{maxWidth:500, maxHeight: 500, overflow: 'auto'}}>
                    <List>
                      {
                        worklogs?.map(worklog =>
                            <ListItem key={worklog.id}>
                              <Card>
                                <CardContent
                                    sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                  <Typography variant="h6">{worklog.start}</Typography>
                                  <Typography variant="h6">   :   </Typography>
                                  <Typography variant="h6">{worklog.stop}</Typography>
                                </CardContent>
                                <CardContent>
                                  <Typography variant="subtitle1">Customer: </Typography>
                                  <Typography variant="body1">{worklog.customer}</Typography>
                                </CardContent>
                                <CardContent>
                                  <Typography variant="subtitle1">Description: </Typography>
                                  <Typography variant="body1">{worklog.description}</Typography>
                                </CardContent>
                              </Card>
                            </ListItem>
                        )
                      }
                    </List>
                  </Paper>
              </Stack>
            </Container>

          </Stack>

        </Container>
      </LocalizationProvider>
  );

}

export default App;
