import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import { Button } from 'antd';
import axios from "axios";
import { apiPath } from "../App";

const Employee = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const employee = location.state.employee;
    const navEmployee = location.state.navEmployee;

    const onDelete = () => {
        if (window.confirm('Ви впевнені, що хочете видалити цей запис?')) {
            axios.delete(apiPath + 'employee/delete?id=' + employee.id).then(() => {
                navigate('/employees', {state: {navEmployee: navEmployee}});
            });
        }
    }

    const onEdit = () => {
        navigate('/editEmployee', {state: {employee: employee, navEmployee: navEmployee}});
    }

    return (
        <>
        <Navbar employee={navEmployee} />
        <div className="group-info">
                <h1>Працівник</h1>
                <h2>Ім'я: {employee.firstName}</h2>
                <h2>Прізвище: {employee.lastName}</h2>
                <h2>Номер телефону: {employee.phoneNumber}</h2>
                <h2>Посада: {employee.position.name}</h2>
                <h2>Дата найму: {new Date(employee.hireDate).toLocaleDateString()}</h2>
                <h2>Дата звільнення: {employee.dismissDate == null ? 'Н/З' : new Date(employee.dismissDate).toLocaleDateString()}</h2>
                <h2>Логін: {employee.login}</h2>
                <h1>Зал</h1>
                <h2>Місто: {employee.gym.city.name}</h2>
                <h2>Адреса: {employee.gym.address}</h2>
                <h2>Контакти: {employee.gym.phoneNumber}</h2>
        </div>
        <div className="buttons">
            <Button type="primary" onClick={() => onEdit()}>Змінити</Button>
            <Button type="danger" onClick={() => onDelete()}>Видалити</Button>
        </div>
        </>
    )
}

export default Employee;