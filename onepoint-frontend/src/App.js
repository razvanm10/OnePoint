import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManagerView from './view/ManagerView';
import MyTeamView from './view/MyTeamView';
import UnresolvedDiscussionsView from './view/UnresolvedDiscussionView';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {EmployeeContextProvider} from "./context/EmployeeContext";

const App = () => {
    const { authenticated } = useContext(AuthContext);

    if (!authenticated) {
        return null; // or render a loading screen or a message while authenticating
    }

    return (
        <EmployeeContextProvider>
            <DndProvider backend={HTML5Backend}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<ManagerView />} />
                        <Route path="/my-team" element={

                                <MyTeamView/>
                        } />
                        <Route path="/unresolved-discussions" element={<UnresolvedDiscussionsView />} />
                    </Routes>
                </BrowserRouter>
            </DndProvider>
        </EmployeeContextProvider>


    );
};

export default App;
