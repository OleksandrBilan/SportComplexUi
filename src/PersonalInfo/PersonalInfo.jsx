import React from "react";
import Navbar from "../Navbar/Navbar";
import {useLocation} from 'react-router-dom';

const PersonalInfo = () => {
    const location = useLocation();
    const employee = location.state;

    return (
        <>
        <Navbar />
        <h1>{employee.firstName}</h1>
        </>
    )
}

export default PersonalInfo;