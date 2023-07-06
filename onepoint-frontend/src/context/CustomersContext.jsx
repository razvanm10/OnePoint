import React, {createContext, useContext, useState} from 'react';
import {AuthContext} from './AuthContext';

export const CustomerContext = createContext();

export const CustomersProvider = ({children}) => {
    const [customers, setCustomers] = useState([]);
    const {keycloakInstance} = useContext(AuthContext);

    const fetchCustomers = async () => {
        try {
            const token = keycloakInstance.token
            const response = await fetch('http://localhost:9090/customers', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const addCustomer = async (customer) => {
        try {
            const token = keycloakInstance.token;
            await fetch('/customers', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer),
            });
            // Refresh the customer list after adding a new customer
            fetchCustomers();
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    return (
        <CustomerContext.Provider value={{
            customers,
            fetchCustomers,
        }}>
            {children}
        </CustomerContext.Provider>
    );
};
