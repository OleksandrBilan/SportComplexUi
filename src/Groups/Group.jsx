import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import './groups.css';
import { Button } from 'antd';
import axios from "axios";
import { apiPath } from "../App";

const Group = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const group = location.state.group;
    const employee = location.state.employee;

    const onDelete = () => {
        if (window.confirm('Ви впевнені, що хочете видалити цю групу?')) {
            axios.delete(apiPath + 'group/delete?id=' + group.id).then(() => {
                navigate('/groups', {state: {employee: employee}});
            });
        }
    }

    const onEdit = () => {
        navigate('/editGroup', {state: {group: group, employee: employee}});
    }

    return (
        <>
        <Navbar employee={employee} />
        <div className="group-info">
            <h1>Група</h1>
            <h2>Максимальна кількість відвідувачів: {group.maxCustomersCount}</h2>
            <h2>Дата початку занять: {group.startDate.split('T')[0]}</h2>
            <h2>Дата закінчення занять: {group.endDate.split('T')[0]}</h2>
            <h2>Тренер: <a onClick={() => navigate('/personalInfo', {state: {employee: employee}}) }>{group.coach.employeeInfo.firstName + ' ' + group.coach.employeeInfo.lastName}</a></h2>
        </div>
        <div className="sport-section">
            <h1>Спортивна секція</h1>
            <h2>Назва: {group.sportSection.name}</h2>
            <h2>Опис: {group.sportSection.description}</h2>
            <h2>Вид спорту: {group.sportSection.sportType.name}</h2>
        </div>
        <div className="buttons">
            <Button type="primary" onClick={() => onEdit()}>Змінити</Button>
            <Button type="danger" onClick={() => onDelete()}>Видалити</Button>
        </div>
        </>
    )
}

export default Group;