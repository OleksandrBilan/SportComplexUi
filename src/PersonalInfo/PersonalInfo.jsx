import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import './personalInfo.css';
import axios from "axios";
import { adminPositionId, apiPath, coachPostionId } from "../App";
import { Tag, Button } from 'antd';
import 'antd/dist/antd.css';

const PersonalInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [coach, setCoach] = useState();
    const [individualCoach, setIndCoach] = useState();

    useEffect(() => {
        if (employee.position.id == coachPostionId) {
            axios.get(apiPath + 'coach/getByEmployeeId', {params: {employeeId: employee.id}}).then(response => {
                let tempCoach = response.data;
                setCoach(response.data);

                axios.get(apiPath + 'coach/individualCoaches').then(response => {
                    let temp = response.data.filter(ic => ic.coachInfo.id == tempCoach.id)[0];
                    setIndCoach(temp);
                }).catch(error => {});
            });
        }
    }, [])

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
        <div className="personal-info">
            <div className="employee-info">
                <h1>Працівник</h1>
                <h2>Ім'я: {employee.firstName}</h2>
                <h2>Прізвище: {employee.lastName}</h2>
                <h2>Номер телефону: {employee.phoneNumber}</h2>
                <h2>Посада: {employee.position.name}</h2>
                <h2>Дата найму: {new Date(employee.hireDate).toLocaleDateString()}</h2>
                {navEmployee.position.id == adminPositionId && <h2>Логін: {employee.login}</h2>}
                <h1>Зал</h1>
                <h2>Місто: {employee.gym.city.name}</h2>
                <h2>Адреса: {employee.gym.address}</h2>
                <h2>Контакти: {employee.gym.phoneNumber}</h2>
            </div>
            <div className="additional-info">
                {coach != null &&
                <>
                <h1>Види спорту</h1>
                <h2>{coach.sportTypes.map(t => <Tag color='blue'>{t.name}</Tag>)}</h2>
                <h1>Опис</h1>
                <h2>{coach.description}</h2>
                </>}
                {individualCoach != null &&
                <>
                <h1>Індивідуальні тренування</h1>
                <h2>Ціна за годину: {individualCoach.pricePerHour}</h2>
                </>}
            </div>
        </div>
        {navEmployee.position.id == adminPositionId &&
        <div className="buttons">
            <Button type="primary" onClick={() => onEdit()}>Змінити</Button>
            <Button type="danger" onClick={() => onDelete()}>Видалити</Button>
        </div>}
        </>
    )
}

export default PersonalInfo;