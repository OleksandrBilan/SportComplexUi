import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import './customers.css';
import { Button } from 'antd';
import axios from "axios";
import { apiPath } from "../App";

const Customer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const customer = location.state.customer;
    const navEmployee = location.state.navEmployee;
    const [membershipReceipts, setMembershipReceipts] = useState();
    const [subscriptionReceipts, setSubscriptionReceipts] = useState();

    useEffect(() => {
        axios.get(apiPath + 'membershipReceipt/getAll').then(response => {
            setMembershipReceipts(response.data.filter(r => r.customer.id == customer.id));
        });

        axios.get(apiPath + 'subscriptionReceipt/getAll').then(response => {
            setSubscriptionReceipts(response.data.filter(r => r.customer.id == customer.id));
        });
    }, [])

    const onDelete = () => {
        if (window.confirm('Ви впевнені, що хочете видалити цей запис?')) {
            axios.delete(apiPath + 'customer/delete?id=' + customer.id).then(() => {
                navigate('/customers', {state: {navEmployee: navEmployee}});
            });
        }
    }

    const onEdit = () => {
        navigate('/editCustomer', {state: {customer: customer, navEmployee: navEmployee}});
    }

    return (
        <>
        <Navbar employee={navEmployee} />
        <div className="container">
            <div className="customer-info">
                <h1>Клієнт</h1>
                <h2>Ім'я: {customer.firstName}</h2>
                <h2>Прізвище: {customer.lastName}</h2>
                <h2>Номер телефону: {customer.phoneNumber}</h2>
            </div>
            <div className="membership-receipts">
                <h1>Загальні абонементи</h1>
                {membershipReceipts?.map(r => 
                    <h2><a onClick={() => navigate('/membershipReceipt', {state: {navEmployee: navEmployee, membershipReceipt: r}})}>{r.membershipType.name}</a>, {new Date(r.payementDateTime).toLocaleDateString()}</h2>)}
            </div>
            <div className="subscription-receipts">
                <h1>Абонементи на групові заняття</h1>
                {subscriptionReceipts?.map(r => 
                    <h2><a onClick={() => navigate('/subscriptionReceipt', {state: {navEmployee: navEmployee, subscriptionReceipt: r}})}>{r.subscriptionType.sportSection.name}</a>, {new Date(r.expireDate).toLocaleDateString()}</h2>)}
            </div>
        </div>
        <div className="cust-buttons">
            <Button type="primary" onClick={() => onEdit()}>Змінити</Button>
            <Button type="danger" onClick={() => onDelete()}>Видалити</Button>
        </div>
        </>
    )
}

export default Customer;