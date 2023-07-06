import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

const TeamContext = createContext();

const TeamContextProvider = ({ children }) => {
    const [teams, setTeams] = useState([]);
    const { keycloakInstance } = useContext(AuthContext);

    const baseUrl = 'http://localhost:9090';

    const token = keycloakInstance.token;

    useEffect(() => {
        fetchTeams();
    }, []);

    // Fetch all teams
    const fetchTeams = async () => {
        try {
            const response = await fetch(`${baseUrl}/teams`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setTeams(data);
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };

    // Get team by ID
    const getTeamById = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/teams/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching team by ID:', error);
            return null;
        }
    };

    // Create a new team
    const createTeam = async (team) => {
        try {
            const response = await fetch(`${baseUrl}/teams`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(team),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating team:', error);
            return null;
        }
    };

    // Add an employee to a team
    const addEmployeeToTeam = async (teamId, employeeId) => {
        console.log(employeeId, "add employee")
        try {
            const response = await fetch(`${baseUrl}/teams/${teamId}/employees/${employeeId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + keycloakInstance.token,
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error adding employee to team:', error);
            return null;
        }
    };

    // Delete a team
    const deleteTeam = async (id) => {
        try {
            await fetch(`${baseUrl}/teams/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    };

    return (
        <TeamContext.Provider value={{ teams, getTeamById, createTeam, addEmployeeToTeam, deleteTeam }}>
            {children}
        </TeamContext.Provider>
    );
};

export { TeamContext, TeamContextProvider };
