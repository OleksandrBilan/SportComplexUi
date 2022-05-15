import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import { Button } from 'antd';
import axios from "axios";
import { apiPath } from "../App";
import './subReceipt.css';

const SubscriptionReceipt = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const subReceipt = location.state.subscriptionReceipt;
    const navEmployee = location.state.navEmployee;

    const onDelete = () => {
        if (window.confirm('Ви впевнені, що хочете видалити цей запис?')) {
            axios.delete(apiPath + 'subscriptionReceipt/delete?id=' + subReceipt.id).then(() => {
                navigate('/subscriptionReceipts', {state: {navEmployee: navEmployee}});
            });
        }
    }

    const onEdit = () => {
        navigate('/editSubscriptionReceipt', {state: {subscriptionReceipt: subReceipt, navEmployee: navEmployee}});
    }

    return (
        <>
        <Navbar employee={navEmployee} />
        <div className="container">
            <div className="left-column">
                <div className="seller">
                    <h1>Продавець</h1>
                    <h2>Ім'я: <a onClick={() => navigate('/personalInfo', {state: {navEmployee: navEmployee, employee: subReceipt.seller}})}>{subReceipt.seller.firstName + ' ' + subReceipt.seller.lastName}</a></h2>
                    <h2>Номер телефону: {subReceipt.seller.phoneNumber}</h2>
                    <h2>Приміщення: {subReceipt.seller.gym.city.name + ', ' + subReceipt.seller.gym.address}</h2>
                </div>
                <div className="customer">
                    <h1>Клієнт</h1>
                    <h2>Клієнт: <a onClick={() => navigate('/customer', {state: {navEmployee: navEmployee, customer: subReceipt.customer}})}>{subReceipt.customer.firstName + ' ' + subReceipt.customer.lastName}</a></h2>
                    <h2>Номер телефону: {subReceipt.customer.phoneNumber}</h2>
                </div>
            </div>
            <div className="right-column">
                <div className="sport-section">
                    <h1>Абонемент</h1>
                    <h2>Назва: {subReceipt.subscriptionType.sportSection.name}</h2>
                    <h2>Опис: {subReceipt.subscriptionType.sportSection.description}</h2>
                    <h2>Ціна: {subReceipt.subscriptionType.price}</h2>
                    <h2>Доступна кількість тренувань: {subReceipt.subscriptionType.availableTrainingsCount}</h2>
                    <h2>Дата закінчення дії: {new Date(subReceipt.expireDate).toLocaleDateString()}</h2>
                    <h2>Оплачений: {subReceipt.isPayed ? 'Так' : 'Ні'}</h2>
                    <h2>Активний: {subReceipt.isActive ? 'Так' : 'Ні'}</h2>
                </div>
                <div className="buttons-div">
                    <Button type="primary" onClick={() => onEdit()}>Змінити</Button>
                    <Button type="danger" onClick={() => onDelete()}>Видалити</Button>
                </div>
            </div>
        </div>
        </>
    )
}

export default SubscriptionReceipt;