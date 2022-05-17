import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button, Card } from 'antd';
import { apiPath } from "../App";
import '../Customers/customers.css';

const SubscriptionTypesWindow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [subTypes, setSubTypes] = useState();

    useEffect(() => {
        axios.get(apiPath + 'subscriptionType/getAll').then(response => {
            setSubTypes(response.data);
        });
    }, [])

    return (
        <>
        <Navbar employee={navEmployee} />
        <div className='cards'>
            {subTypes?.map(c => 
                <Card style={{ width: 250 }} hoverable title={c.sportSection.name} onClick={() => {navigate('/subscriptionType', {state: {navEmployee: navEmployee, subscriptionType: c}})}}>
                    <p>Ціна: {c.price}</p>
                    <p>Кількість тренувань: {c.availableTrainingsCount}</p>
                </Card>)}
        </div>
        <Button type="primary" className="new-group-btn" onClick={() => navigate('/createSubscriptionType', {state: {navEmployee: navEmployee, employee: employee}})}>
            Створити новий запис
        </Button>
        </>
    )
}

export default SubscriptionTypesWindow;