import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button, Card } from 'antd';
import { apiPath } from "../App";
import '../Customers/customers.css';

const SportSectionsWindow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [sections, setSections] = useState();

    useEffect(() => {
        axios.get(apiPath + 'sportSection/getAll').then(response => {
            setSections(response.data);
        });
    }, [])

    return (
        <>
        <Navbar employee={navEmployee} />
        <div className='cards'>
            {sections?.map(c => 
                <Card style={{ width: 250 }} hoverable title={c.name} onClick={() => {navigate('/sportSection', {state: {navEmployee: navEmployee, sportSection: c}})}}>
                    <p>Вид спорту: {c.sportType.name}</p>
                </Card>)}
        </div>
        <Button type="primary" className="new-group-btn" onClick={() => navigate('/createSportSection', {state: {navEmployee: navEmployee, employee: employee}})}>
            Створити новий запис
        </Button>
        </>
    )
}

export default SportSectionsWindow;