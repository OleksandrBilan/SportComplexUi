import React from "react";
import { Menu } from "antd";
import "antd/dist/antd.css";
import "./navbar.css";
import { useNavigate } from 'react-router-dom';

const Navbar = (employee) => {
    const navigate = useNavigate();

    return (
        <>
        <Menu className='navbar' theme="light" mode="horizontal">
            <Menu.Item onClick={() => alert(employee.firstName)}>
                Groups
            </Menu.Item>
            <Menu.Item >
                Individual Trainings
            </Menu.Item>
            <Menu.Item style={{float: 'right'}} onClick={() => navigate('/')}>
                Personal Info
            </Menu.Item>
            <Menu.Item style={{float: 'right'}} onClick={() => navigate('/')}>
                Sign Out
            </Menu.Item>
        </Menu>
        </>
    )
}

export default Navbar;