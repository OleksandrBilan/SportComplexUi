import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import '../Groups/groups.css';
import { Button, Tag } from 'antd';
import axios from "axios";
import { apiPath } from "../App";

const SubscriptionType = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const subType = location.state.subscriptionType;
    const navEmployee = location.state.navEmployee;

    const onDelete = () => {
        if (window.confirm('Ви впевнені, що хочете видалити цей абонемент?')) {
            axios.delete(apiPath + 'subscriptionType/delete?id=' + subType.id).then(() => {
                navigate('/subscriptionTypes', {state: {navEmployee: navEmployee}});
            });
        }
    }

    const onEdit = () => {
        navigate('/editSubscriptionType', {state: {subscriptionType: subType, navEmployee: navEmployee}});
    }

    return (
        <>
        <Navbar employee={navEmployee} />
        <div className="group-info">
            <h1>Абонемент</h1>
            <h2>Спортивна секція: <a onClick={() => navigate('/sportSection', {state:{navEmployee:navEmployee, sportSection: subType.sportSection}})}>{subType.sportSection.name}</a></h2>
            <h2>Вид спорту: {subType.sportSection.sportType.name}</h2>
            <h2>Ціна: {subType.price}</h2>
            <h2>Можлива кількість тренувань: {subType.availableTrainingsCount}</h2>
        </div>
        <div className="buttons">
            <Button type="primary" onClick={() => onEdit()}>Змінити</Button>
            <Button type="danger" onClick={() => onDelete()}>Видалити</Button>
        </div>
        </>
    )
}

export default SubscriptionType;