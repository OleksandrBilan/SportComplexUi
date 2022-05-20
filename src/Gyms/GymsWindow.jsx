import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button, Card } from 'antd';
import { apiPath } from "../App";
import '../Customers/customers.css';

const GymsWindow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [gyms, setGyms] = useState();

    useEffect(() => {
        axios.get(apiPath + 'gym/getAll').then(response => {
            setGyms(response.data);
        });
    }, [])

    return (
        <>
        <Navbar employee={navEmployee} />
        <div className='cards'>
            {gyms?.map(c => 
                <Card style={{ width: 300 }} hoverable title={c.city.name + ', ' + c.address} onClick={() => {navigate('/gym', {state: {navEmployee: navEmployee, gym: c}})}}>
                    <p>Контакти: {c.phoneNumber}</p>
                </Card>)}
        </div>
        <Button type="primary" className="new-group-btn" onClick={() => navigate('/createGym', {state: {navEmployee: navEmployee, employee: employee}})}>
            Створити новий запис
        </Button>
        </>
    )
}

export default GymsWindow;