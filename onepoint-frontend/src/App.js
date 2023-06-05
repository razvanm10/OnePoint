import './App.css';
import React, {useEffect, useState} from "react";
import ManagerView from "./view/ManagerView";
import Keycloak from "keycloak-js";

let initOptions = {
    realm: 'onepoint',
    url: 'http://localhost:8089/auth/',
    clientId: 'resource-client',
    onLoad: 'login-required',
    KeycloakResponseType: 'code'
}

function App() {

    const [authenticated, setAuthenticated] = useState(false);
    const [principal, setPrincipal] = useState(null);
    const [employees, setEmployees] = useState(null);

    useEffect(() => {

        const keycloak = new Keycloak(initOptions);
        keycloak.init({onLoad: initOptions.onLoad, KeycloakResponseType: 'code'}).then((auth) => {
            if (!auth) {
                window.location.reload();
            } else {
                setAuthenticated(true);
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

            fetch("http://localhost:9090/employees", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + keycloak.token,
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json',
                }
            }).then(resp => resp.json()).then(data => {
                setEmployees(data)
            })
                .catch(e => console.log("couldn't fetch data"))
                .then(() => console.log(employees))

            fetch("http://localhost:9090/authorities", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + keycloak.token,
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json',
                }
            }).then(resp => resp.json()).then(
                data => {
                    try {
                        setPrincipal(data);
                    } catch (e) {
                        console.log("invalid response")
                    }
                }
            ).catch(e => console.log("couldn't fetch data"))
                .then(() => console.log(principal))

        }).then(() => {
        })
            .catch(() => {
                console.error("Authenticated Failed");
            });

    }, []);

    return (
        <ManagerView myTeam={employees}/>
    );

}

export default App;
