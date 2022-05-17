import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import '../Groups/groups.css';
import { Button, Tag } from 'antd';
import axios from "axios";
import { apiPath } from "../App";

const SportSection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const section = location.state.sportSection;
    const navEmployee = location.state.navEmployee;

    const onDelete = () => {
        if (window.confirm('Ви впевнені, що хочете видалити цю секцію?')) {
            axios.delete(apiPath + 'sportSection/delete?id=' + section.id).then(() => {
                navigate('/sportSections', {state: {navEmployee: navEmployee}});
            });
        }
    }

    const onEdit = () => {
        navigate('/editSportSection', {state: {sportSection: section, navEmployee: navEmployee}});
    }

    return (
        <>
        <Navbar employee={navEmployee} />
        <div className="group-info">
            <h1>Спортивна секція</h1>
            <h2>Назва: {section.name}</h2>
            <h2>Вид спорту: <a>{section.sportType.name}</a></h2>
            <h2>Опис: {section.description}</h2>
        </div>
        <div className="buttons">
            <Button type="primary" onClick={() => onEdit()}>Змінити</Button>
            <Button type="danger" onClick={() => onDelete()}>Видалити</Button>
        </div>
        </>
    )
}

export default SportSection;