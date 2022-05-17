import React from "react";
import { Menu } from "antd";
import "antd/dist/antd.css";
import "./navbar.css";
import { useNavigate } from 'react-router-dom';
import { adminPositionId, managerPositionId } from "../App";

const Navbar = (props) => {
    const navigate = useNavigate();
    const employee = props.employee;

    return (
        <>
        <Menu className='navbar' theme="light" mode="horizontal">
            {employee.position.id != adminPositionId &&
            <Menu.Item onClick={() => navigate('/groups', {state: {navEmployee: employee, employee: employee}})}>
                Групи
            </Menu.Item>}
            {employee.position.id != adminPositionId &&
            <Menu.Item onClick={() => navigate('/individualTrainings', {state: {navEmployee: employee, employee: employee}})}>
                Індивідуальні тренування
            </Menu.Item>}

            {employee.position.id == managerPositionId && 
            <Menu.Item onClick={() => navigate('/membershipReceipts', {state: {navEmployee: employee, employee: employee}})}>
                Продажі загальних aбонементів
            </Menu.Item>}
            {employee.position.id == managerPositionId && 
            <Menu.Item onClick={() => navigate('/subscriptionReceipts', {state: {navEmployee: employee, employee: employee}})}>
                Продажі aбонементів на групові заняття
            </Menu.Item>}
            {employee.position.id == managerPositionId && 
            <Menu.Item onClick={() => navigate('/customers', {state: {navEmployee: employee, employee: employee}})}>
                Клієнти
            </Menu.Item>}

            {employee.position.id == adminPositionId && 
            <Menu.Item onClick={() => navigate('/employees', {state: {navEmployee: employee, employee: employee}})}>
                Працівники
            </Menu.Item>}
            {employee.position.id == adminPositionId && 
            <Menu.Item onClick={() => navigate('/membershipTypes', {state: {navEmployee: employee, employee: employee}})}>
                Загальні абонементи
            </Menu.Item>}
            {employee.position.id == adminPositionId && 
            <Menu.Item onClick={() => navigate('/subscriptionTypes', {state: {navEmployee: employee, employee: employee}})}>
                Групові абонементи
            </Menu.Item>}
            {employee.position.id == adminPositionId && 
            <Menu.Item onClick={() => navigate('/sportSections', {state: {navEmployee: employee, employee: employee}})}>
                Спортивні секції
            </Menu.Item>}
            {employee.position.id == adminPositionId && 
            <Menu.Item onClick={() => navigate('/sportTypes', {state: {navEmployee: employee, employee: employee}})}>
                Види спорту
            </Menu.Item>}

            <Menu.Item style={{marginLeft: 'auto'}} onClick={() => navigate('/personalInfo', {state: {navEmployee: employee, employee: employee}})}>
                Особиста інформація
            </Menu.Item>
            <Menu.Item onClick={() => navigate('/')}>
                Вийти з акаунту
            </Menu.Item>
        </Menu>
        </>
    )
}

export default Navbar;