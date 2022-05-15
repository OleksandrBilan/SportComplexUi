import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import './indTrainings.css';
import { Button } from 'antd';
import axios from "axios";
import { apiPath } from "../App";

const IndividualTraining = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const indTraining = location.state.individualTraining;
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;

    const onDelete = () => {
        if (window.confirm('Ви впевнені, що хочете видалити цей запис?')) {
            axios.delete(apiPath + 'individualTraining/delete?id=' + indTraining.id).then(() => {
                navigate('/individualTrainings', {state: {navEmployee: navEmployee, employee: employee}});
            });
        }
    }

    const onEdit = () => {
        navigate('/editIndividualTraining', {state: {individualTraining: indTraining, navEmployee: navEmployee, employee: employee}});
    }

    return (
        <>
        <Navbar employee={employee} />
        <div className="ind-training-info">
            <h1>Індивідуальне тренування</h1>
            <h2>Клієнт: <a onClick={() => navigate('/customer', {state: {navEmployee: navEmployee, customer: indTraining.membershipReceipt.customer}})}>{indTraining.membershipReceipt.customer.firstName + ' ' + indTraining.membershipReceipt.customer.lastName}</a></h2>
            <h2>Тренер: <a onClick={() => navigate('/personalInfo', {state: {navEmployee: navEmployee, employee: indTraining.coach.coachInfo.employeeInfo}}) }>{indTraining.coach.coachInfo.employeeInfo.firstName + ' ' + indTraining.coach.coachInfo.employeeInfo.lastName}</a></h2>
            <h2>Оплачено годин: {indTraining.payedHours}</h2>
            <h2>Ціна: {indTraining.price}</h2>
            <h2>Час оплати: {new Date(indTraining.payementDateTime).toLocaleString()}</h2>
        </div>
        <div className="receipt-info">
            <h1><a onClick={() => navigate('/membershipReceipt', {state: {navEmployee: navEmployee, membershipReceipt: indTraining.membershipReceipt}})}>Абонемент</a></h1>
            <h2>Продавець: {<a onClick={() => navigate('/personalInfo', {state: {navEmployee: navEmployee, employee: indTraining.membershipReceipt.seller}}) }>{indTraining.membershipReceipt.seller.firstName + ' ' + indTraining.membershipReceipt.seller.lastName}</a>}</h2>
            <h2>Тип: {<a>{indTraining.membershipReceipt.membershipType.name}</a>}</h2>
        </div>
        <div className="buttons">
            <Button type="primary" onClick={() => onEdit()}>Змінити</Button>
            <Button type="danger" onClick={() => onDelete()}>Видалити</Button>
        </div>
        </>
    )
}

export default IndividualTraining;