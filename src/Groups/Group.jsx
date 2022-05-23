import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import './correctGroup.css';
import { Button, Card } from 'antd';
import axios from "axios";
import { apiPath } from "../App";

const Group = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const group = location.state.group;
    const navEmployee = location.state.navEmployee;

    const onDelete = () => {
        if (window.confirm('Ви впевнені, що хочете видалити цю групу?')) {
            axios.delete(apiPath + 'group/delete?id=' + group.id).then(() => {
                navigate('/groups', {state: {navEmployee: navEmployee}});
            });
        }
    }

    const onEdit = () => {
        navigate('/editGroup', {state: {group: group, navEmployee: navEmployee}});
    }

    return (
        <>
        <Navbar employee={navEmployee} />
        <div className="group-container">
            <div className="col1">
                <div className="group-div">
                    <h1>Група</h1>
                    <h2>Максимальна кількість відвідувачів: {group.maxCustomersCount}</h2>
                    <h2>Дата початку занять: {new Date(group.startDate).toLocaleDateString()}</h2>
                    <h2>Дата закінчення занять: {new Date(group.endDate).toLocaleDateString()}</h2>
                    <h2>Тренер: <a onClick={() => navigate('/personalInfo', {state: {navEmployee: navEmployee, employee: group.coach.employeeInfo}})}>{group.coach.employeeInfo.firstName + ' ' + group.coach.employeeInfo.lastName}</a></h2>
                </div>
                <div className="sport-section-div">
                    <h1>Спортивна секція</h1>
                    <h2>Назва: {group.sportSection.name}</h2>
                    <h2>Опис: {group.sportSection.description}</h2>
                    <h2>Вид спорту: {group.sportSection.sportType.name}</h2>
                </div>
            </div>
            <div className="schedule-div">
                <h1>Графік занять</h1>
                <div className='schedule-cards'>
                {group.schedules[0] == null
                    ? <h2>Немає даних</h2>
                    : group.schedules.map(x => <Card style={{ width: 150 }} title={x.day.name}><p>{x.startTime.slice(0, 5) + ' - ' + x.endTime.slice(0, 5)}</p></Card>)}
                </div>
            </div>
        </div>
        <div className="buttons">
            <Button type="primary" onClick={() => onEdit()}>Змінити</Button>
            <Button type="danger" onClick={() => onDelete()}>Видалити</Button>
        </div>
        </>
    )
}

export default Group;