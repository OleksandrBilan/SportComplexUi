import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './Login/LoginWindow';
import PersonalInfo from "./PersonalInfo/PersonalInfo";

function App() {
  return (
    <Router>
        <Routes>
            <Route path='/personalInfo' element={<PersonalInfo/>} />
            <Route path='/' element={<Login/>} />
        </Routes>
    </Router>
  );
}

export default App;

export const apiPath = 'https://localhost:44395/api/';