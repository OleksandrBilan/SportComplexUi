import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import '../IndividualTrainings/indTrainings.css';
import { Button } from 'antd';
import axios from "axios";
import { apiPath } from "../App";

const GroupTraining = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const groupTraining = location.state.groupTraining;
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;

    const onDelete = () => {
        if (window.confirm('Ви впевнені, що хочете видалити цей запис?')) {
            axios.delete(apiPath + 'groupTraining/delete?id=' + groupTraining.id).then(() => {
                navigate('/groupTrainings', {state: {navEmployee: navEmployee, employee: employee}});
            });
        }
    }

    const onEdit = () => {
        navigate('/editGroupTraining', {state: {groupTraining: groupTraining, navEmployee: navEmployee, employee: employee}});
    }

    return (
        <>
        <Navbar employee={employee} />
        <div className="ind-training-info">
            <h1>Групове тренування</h1>
            <h2>Клієнт: {<a onClick={() => navigate('/customer', {state: {navEmployee: navEmployee, customer: groupTraining.receipt.customer}})}>{groupTraining.receipt.customer.firstName + ' ' + groupTraining.receipt.customer.lastName}</a>}</h2>
            <h2>{<a onClick={() => navigate('/group', {state: {navEmployee: navEmployee, group: groupTraining.group}})}>Група</a>}</h2>
            <h2>Тренер: {<a onClick={() => navigate('/personalInfo', {state: {navEmployee: navEmployee, employee: groupTraining.group.coach.employeeInfo}})}>{groupTraining.group.coach.employeeInfo.firstName + ' ' + groupTraining.group.coach.employeeInfo.lastName}</a>}</h2>
            <h2>Час початку: {new Date(groupTraining.startDateTime).toLocaleDateString() + ', ' + new Date(groupTraining.startDateTime).toLocaleTimeString().slice(0, 5)}</h2>
        </div>
        <div className="buttons">
            <Button type="primary" onClick={() => onEdit()}>Змінити</Button>
            <Button type="danger" onClick={() => onDelete()}>Видалити</Button>
        </div>
        </>
    )
}

export default GroupTraining;