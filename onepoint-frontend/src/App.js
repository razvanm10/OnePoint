import './App.css';
import Keycloak from "keycloak-js";
import {Container, Paper, TextField} from "@material-ui/core";
import {useEffect, useState} from "react";

let initOptions = {
  realm: 'onepoint',
  url: 'http://localhost:8089/auth/',
  clientId: 'resource-client',
  onLoad: 'login-required',
  KeycloakResponseType: 'code'
}

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState(null);

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

        fetch("http://localhost:9090/api/employee", {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + keycloak.token,
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Content-Type': 'application/json',
          }
        }).then(resp => resp.json()).then(resp => setData(JSON.stringify(resp)))
            .catch(e => console.log("couldn't fetch data"))
            .then(() => console.log(data))
            .catch(e => console.log("couldn't fetch data"));


        fetch("http://localhost:9090/api/employee", {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + keycloak.token,
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Content-Type': 'application/json',
          }
        }).then(resp => resp.json()).then(resp => setData(JSON.stringify(resp)))
            .catch(e => console.log("couldn't fetch data"))
            .then(() => console.log(data))
            .catch(e => console.log("couldn't fetch data"));

        fetch("http://localhost:9090/api/employee", {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + keycloak.token,
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Content-Type': 'application/json',
          }
        }).then(resp => resp.json()).then(resp => setData(JSON.stringify(resp)))
            .catch(e => console.log("couldn't fetch data"))
            .then(() => console.log(data))
            .catch(e => console.log("couldn't fetch data"));

        fetch("http://localhost:9090/api/employee", {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + keycloak.token,
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Content-Type': 'application/json',
          }
        }).then(resp => resp.json()).then(resp => setData(JSON.stringify(resp)))
            .catch(e => console.log("couldn't fetch data"))
            .then(() => console.log(data))
            .catch(e => console.log("couldn't fetch data"));


    }).catch(() => {
      console.error("Authenticated Failed");
    });
  }, []);
  
  
  return (
    <Container children={<Paper>
      {
          data
      }
    </Paper>}>

    </Container>
  );

}

export default App;
