import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import '../Groups/groups.css';
import { Button, Tag } from 'antd';
import axios from "axios";
import { apiPath } from "../App";

const MembershipType = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const membershipType = location.state.membershipType;
    const navEmployee = location.state.navEmployee;

    const onDelete = () => {
        if (window.confirm('Ви впевнені, що хочете видалити цей абонемент')) {
            axios.delete(apiPath + 'membershipType/delete?id=' + membershipType.id).then(() => {
                navigate('/membershipTypes', {state: {navEmployee: navEmployee}});
            });
        }
    }

    const onEdit = () => {
        navigate('/editMembershipType', {state: {membershipType: membershipType, navEmployee: navEmployee}});
    }

    return (
        <>
        <Navbar employee={navEmployee} />
        <div className="group-info">
            <h1>Абонемент</h1>
            <h2>Назва: {membershipType.name}</h2>
            <h2>Ціна: {membershipType.price}</h2>
            <h2>Кількість місяців: {membershipType.availabilityDurationInMonths}</h2>
            <h2>Можливий час тренувань: {membershipType.workoutStartTime.slice(0, 5) + ' - ' + membershipType.workoutEndTime.slice(0, 5)}</h2>
            <h2>Види спорту: {membershipType.sportTypes.map(st => <Tag color='blue'>{st.name}</Tag>)}</h2>
        </div>
        <div className="buttons">
            <Button type="primary" onClick={() => onEdit()}>Змінити</Button>
            <Button type="danger" onClick={() => onDelete()}>Видалити</Button>
        </div>
        </>
    )
}

export default MembershipType;