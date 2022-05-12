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
            <Menu.Item onClick={() => navigate('/groups', {state: {employee: employee}})}>
                Групи
            </Menu.Item>
            <Menu.Item >
                Індивідуальні тренування
            </Menu.Item>
            <Menu.Item onClick={() => navigate('/personalInfo', {state: {employee: employee}})}>
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