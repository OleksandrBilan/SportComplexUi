import { Form, Select, Input, Button } from "antd";
import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPath } from "../App";
import Navbar from "../Navbar/Navbar";

const SportTypeForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const sportType = location.state.sportType;
    const navEmployee = location.state.navEmployee;

    const onFinish = (values) => {
        let temp = {
            id: sportType?.id,
            name: values.name 
        };

        if (sportType == null) {
            axios.post(apiPath + 'sportType/create', temp).then(response => {
                navigate('/sportTypes', {state: {navEmployee: navEmployee}});
            }).catch(error => {
                alert('Помилка створення!');
            })
        }
        else {
            axios.put(apiPath + 'sportType/update', temp).then(response => {
                navigate('/sportTypes', {state: {navEmployee: navEmployee}});
            }).catch(error => {
                alert('Помилка оновлення!');
            })
        }
    }

    return (
        <>
        <Navbar employee={navEmployee} />
        <div className="customer-form">
            <Form onFinish={onFinish}>
                {sportType != null 
                    ? <Form.Item label="Назва" name='name' rules={[{ required: true, message: 'Будь ласка, введіть назву!'}]} initialValue={sportType.name}>
                          <Input placeholder="Введіть назву"/>
                      </Form.Item>
                    : <Form.Item label="Назва" name='name' rules={[{ required: true, message: 'Будь ласка, введіть назву!'}]}>
                          <Input placeholder="Введіть назву"/>
                      </Form.Item>}
                
                <Button type="primary" htmlType="submit" className="create-button">
                    {sportType == null ? 'Створити' : 'Оновити'}
                </Button>
            </Form>
        </div>
        </>
    )
}

export default SportTypeForm;