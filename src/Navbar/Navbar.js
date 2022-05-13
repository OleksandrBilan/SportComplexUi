import React from "react";
import { Menu } from "antd";
import "antd/dist/antd.css";
import "./navbar.css";
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    const navigate = useNavigate();
    const employee = props.employee;

    return (
        <>
        <Menu className='navbar' theme="light" mode="horizontal">
            <Menu.Item onClick={() => navigate('/groups', {state: {navEmployee: employee, employee: employee}})}>
                Групи
            </Menu.Item>
            <Menu.Item onClick={() => navigate('/individualTrainings', {state: {navEmployee: employee, employee: employee}})}>
                Індивідуальні тренування
            </Menu.Item>
            <Menu.Item onClick={() => navigate('/personalInfo', {state: {navEmployee: employee, employee: employee}})}>
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