import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import '../Groups/groups.css';
import { Button, Tag } from 'antd';
import axios from "axios";
import { apiPath } from "../App";

const Gym = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const gym = location.state.gym;
    const navEmployee = location.state.navEmployee;

    const onDelete = () => {
        if (window.confirm('Ви впевнені, що хочете видалити цю секцію?')) {
            axios.delete(apiPath + 'gym/delete?id=' + gym.id).then(() => {
                navigate('/gyms', {state: {navEmployee: navEmployee}});
            });
        }
    }

    const onEdit = () => {
        navigate('/editGym', {state: {gym: gym, navEmployee: navEmployee}});
    }

    return (
        <>
        <Navbar employee={navEmployee} />
        <div className="group-info">
            <h1>Спотзал</h1>
            <h2>Місто: {gym.city.name}</h2>
            <h2>Адреса: {gym.address}</h2>
            <h2>Контакти: {gym.phoneNumber}</h2>
        </div>
        <div className="buttons">
            <Button type="primary" onClick={() => onEdit()}>Змінити</Button>
            <Button type="danger" onClick={() => onDelete()}>Видалити</Button>
        </div>
        </>
    )
}

export default Gym;