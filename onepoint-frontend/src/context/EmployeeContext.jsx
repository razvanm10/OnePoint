import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

// Create the EmployeeContext
const EmployeeContext = createContext();

// Create an EmployeeContextProvider component
const EmployeeContextProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const { keycloakInstance } = useContext(AuthContext);
    const baseUrl = 'http://localhost:9090'; // Update with the correct base URL
    const [loading, setLoading] = useState(true); // Add a loading state


    useEffect(() => {
        fetchEmployees();
    }, []);

    // Fetch all employees
    const fetchEmployees = async () => {
        try {
            const token = keycloakInstance.token;
            const response = await fetch(`${baseUrl}/employees`, {
                headers: {
                    'Authorization': 'Bearer ' + keycloakInstance.token,
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setLoading(false);
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    // Find employee by Keycloak ID
    const findEmployeeByKeycloakId = async (keycloakId) => {
        try {
            const token = keycloakInstance.token;
            const response = await fetch(`${baseUrl}/employees/keycloak/${keycloakId}`, {
                headers: {
                    'Authorization': 'Bearer ' + keycloakInstance.token,
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error finding employee by Keycloak ID:', error);
            return null;
        }
    };

    if (loading) {
        return (
            <div>...</div>
        )
    }

    return (
        <EmployeeContext.Provider value={{ employees, findEmployeeByKeycloakId }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export { EmployeeContext, EmployeeContextProvider };
