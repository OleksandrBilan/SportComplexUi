import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import GroupsWindow from "./Groups/GroupsWindow";
import Login from './Login/LoginWindow';
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import Group from './Groups/Group';
import GroupForm from "./Groups/GroupForm";

function App() {
  return (
    <Router>
        <Routes>
            <Route path='/editGroup' element={<GroupForm />} />
            <Route path='/group' element={<Group/>} />
            <Route path='/groups' element={<GroupsWindow/>} />
            <Route path='/personalInfo' element={<PersonalInfo/>} />
            <Route path='/' element={<Login/>} />
        </Routes>
    </Router>
  );
}

export default App;

export const apiPath = 'https://localhost:44395/api/';