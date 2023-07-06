import * as React from 'react';
import {EmployeeContext, EmployeeContextProvider} from "../context/EmployeeContext";

import {TeamContextProvider} from "../context/TeamsContext";
import TeamPage from "./TeamPage";
import {useContext} from "react";

function MyTeamView() {

    const {employees} = useContext(EmployeeContext);

    return (
            <TeamContextProvider>
                <TeamPage />
            </TeamContextProvider>

        )


}

export default MyTeamView;
