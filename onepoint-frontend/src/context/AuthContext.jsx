import React, {createContext, useEffect, useState} from 'react';
import Keycloak from 'keycloak-js';

const AuthContext = createContext();

const initOptions = {
    realm: 'onepoint',
    url: 'http://localhost:8089/auth/',
    clientId: 'resource-client',
    onLoad: 'login-required',
    KeycloakResponseType: 'code',
};

const AuthContextProvider = ({children}) => {
    const [keycloakInstance, setKeycloakInstance] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [principal, setPrincipal] = useState(null);

    const extractPrincipal = (keycloak) => {
        fetch("http://localhost:9090/authorities", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + keycloak.token,
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Content-Type': 'application/json',
            }
        }).then(resp => resp.json()).then(
            data => data["keycloakId"]
        ).then(keycloakId => {
            fetch("http://localhost:9090/employees/keycloak/" + keycloakId, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + keycloak.token,
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json',
                }
            }).then(resp => resp.json())
                .then(data => {
                    setPrincipal(data)
                })
        })
            .catch(e => console.log("couldn't fetch data"))
            .then(() => console.log(principal))
    }

    useEffect(() => {
        const keycloak = new Keycloak(initOptions);

        keycloak
            .init({onLoad: initOptions.onLoad, KeycloakResponseType: initOptions.KeycloakResponseType})
            .then((auth) => {
                if (!auth) {
                    window.location.reload();
                } else {
                    setAuthenticated(true);
                    setKeycloakInstance(keycloak);
                }
                setTimeout(() => {
                    keycloak.updateToken(70).then((refreshed) => {
                        if (refreshed) {
                            setAuthenticated(true);
                            console.debug('Token refreshed' + refreshed);
                        } else {
                            console.warn(
                                'Token not refreshed, valid for ' +
                                Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) +
                                ' seconds'
                            );
                        }
                    }).catch(() => {
                        console.error('Failed to refresh token');
                    });
                }, 60000);
                extractPrincipal(keycloak)
            }).then(() => console.log(principal))
            .catch((error) => {
                console.error('Error initializing Keycloak:', error);
            });

        return () => {
            // keycloak.logout();
        };
    }, []);


    const keycloakLogout = () => {
        keycloakInstance.logout();
    }

    return (
        <AuthContext.Provider value={{keycloakInstance, authenticated, keycloakLogout, principal}}>
            {authenticated ? children : null}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthContextProvider};
