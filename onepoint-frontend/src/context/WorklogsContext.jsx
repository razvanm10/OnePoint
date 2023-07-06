import React, {createContext, useState, useEffect, useContext} from 'react';
import {AuthContext} from "./AuthContext";

const WorklogsContext = createContext();

const WorklogsContextProvider = ({ children }) => {

    const { principal, keycloakInstance } = useContext(AuthContext)

    const [worklogs, setWorklogs] = useState([]);

    async function fetchWorklogs() {
        try {
            const response = await fetch('http://localhost:9090/worklogs/1', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + keycloakInstance.token,
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log(data)
            setWorklogs(data);
        } catch (error) {
            console.error('Error fetching worklogs:', error);
        }
    }

    async function addNewWorklog(body) {
        try {
            console.log(body, JSON.stringify(body))
            const response = await fetch('http://localhost:9090/worklogs/add', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Authorization': 'Bearer ' + keycloakInstance.token,
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json',
                }
            })
            await fetchWorklogs()
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        fetchWorklogs().then(() => console.log(worklogs));
    }, []);

    return (
        // Provide the worklogs state value to consuming components
        <WorklogsContext.Provider value={{worklogs, addNewWorklog}}>
            {children}
        </WorklogsContext.Provider>
    );
};

export { WorklogsContext, WorklogsContextProvider };
