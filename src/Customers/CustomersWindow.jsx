import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button, Card } from 'antd';
import { apiPath } from "../App";
import './customers.css';

const CustomersWindow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [customers, setCustomers] = useState();

    useEffect(() => {
        axios.get(apiPath + 'customer/getAll').then(response => {
            setCustomers(response.data);
        });
    }, [])

    return (
        <>
        <Navbar employee={navEmployee} />
        <div className='cards'>
            {customers?.map(c => 
                <Card style={{ width: 250 }} hoverable title={c.firstName + ' ' + c.lastName} onClick={() => {navigate('/customer', {state: {navEmployee: navEmployee, customer: c}})}}>
                    {c.phoneNumber}
                </Card>)}
        </div>
        <Button type="primary" className="new-group-btn" onClick={() => navigate('/createCustomer', {state: {navEmployee: navEmployee, employee: employee}})}>
            Створити новий запис
        </Button>
        </>
    )
}

export default CustomersWindow;