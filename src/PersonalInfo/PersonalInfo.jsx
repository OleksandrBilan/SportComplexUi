import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import {useLocation} from 'react-router-dom';
import './personalInfo.css';
import axios from "axios";
import { apiPath } from "../App";
import { Tag } from 'antd';
import 'antd/dist/antd.css';

const PersonalInfo = () => {
    const location = useLocation();
    const employee = location.state.employee;
    const [coach, setCoach] = useState();
    const [sportTypes, setSportTypes] = useState();

    useEffect(() => {
        if (employee.position.id == 2) {
            axios.get(apiPath + 'coach/getByEmployeeId', {params: {employeeId: employee.id}}).then(response => {
                setCoach(response.data);
                let temp = '';
                response.data.sportTypes.forEach(st => {
                    temp += ' ' + st.name;
                });
                setSportTypes(temp);
            });
        }
    })

    return (
        <>
        <Navbar employee={employee} />
        <div className="personal-info">
            <div className="employee-info">
                <h1>Працівник</h1>
                <h2>Ім'я: {employee.firstName}</h2>
                <h2>Прізвище: {employee.lastName}</h2>
                <h2>Номер телефону: {employee.phoneNumber}</h2>
                <h2>Посада: {employee.position.name}</h2>
                <h2>Дата найму: {employee.hireDate.split('T')[0]}</h2>
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
            </div>
        </div>
        </>
    )
}

export default PersonalInfo;