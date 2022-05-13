import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import './memReceipts.css';
import { Button } from 'antd';
import axios from "axios";
import { apiPath } from "../App";

const MembershipReceipt = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const memReceipt = location.state.membershipReceipt;
    const navEmployee = location.state.navEmployee;

    const onDelete = () => {
        if (window.confirm('Ви впевнені, що хочете видалити цей запис?')) {
            axios.delete(apiPath + 'membershipReceipt/delete?id=' + memReceipt.id).then(() => {
                navigate('/membershipReceipts', {state: {navEmployee: navEmployee}});
            });
        }
    }

    const onEdit = () => {
        navigate('/editMembershipReceipt', {state: {membershipReceipt: memReceipt, navEmployee: navEmployee}});
    }

    return (
        <>
        <Navbar employee={navEmployee} />
        <div className="group-info">
            <h1>Продавець</h1>
            <h2>Ім'я: <a onClick={() => navigate('/personalInfo', {state: {navEmployee: navEmployee, employee: memReceipt.seller}})}>{memReceipt.seller.firstName + ' ' + memReceipt.seller.lastName}</a></h2>
            <h2>Номер телефону: {memReceipt.seller.phoneNumber}</h2>
            <h2>Приміщення: {memReceipt.seller.gym.city.name + ', ' + memReceipt.seller.gym.address}</h2>
        </div>
        <div className="sport-section">
            <h1>Клієнт</h1>
            <h2>Ім'я: {memReceipt.customer.firstName + ' ' + memReceipt.customer.lastName}</h2>
            <h2>Номер телефону: {memReceipt.customer.phoneNumber}</h2>
        </div>
        <div className="sport-section">
            <h1>Абонемент</h1>
            <h2>Назва: {memReceipt.membershipType.name}</h2>
            <h2>Ціна: {memReceipt.membershipType.price}</h2>
            <h2>Дата оплати: {new Date(memReceipt.payementDateTime).toLocaleDateString()}</h2>
        </div>
        <div className="buttons">
            <Button type="primary" onClick={() => onEdit()}>Змінити</Button>
            <Button type="danger" onClick={() => onDelete()}>Видалити</Button>
        </div>
        </>
    )
}

export default MembershipReceipt;