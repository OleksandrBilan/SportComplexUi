import { Form, Select, Input, Button } from "antd";
import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPath } from "../App";
import Navbar from "../Navbar/Navbar";

const CityForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const city = location.state.city;
    const navEmployee = location.state.navEmployee;

    const onFinish = (values) => {
        let temp = {
            id: city?.id,
            name: values.name 
        };

        if (city == null) {
            axios.post(apiPath + 'city/create', temp).then(response => {
                navigate('/cities', {state: {navEmployee: navEmployee}});
            }).catch(error => {
                alert('Помилка створення!');
            })
        }
        else {
            axios.put(apiPath + 'city/update', temp).then(response => {
                navigate('/cities', {state: {navEmployee: navEmployee}});
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
                {city != null 
                    ? <Form.Item label="Назва" name='name' rules={[{ required: true, message: 'Будь ласка, введіть назву!'}]} initialValue={city.name}>
                          <Input placeholder="Введіть назву"/>
                      </Form.Item>
                    : <Form.Item label="Назва" name='name' rules={[{ required: true, message: 'Будь ласка, введіть назву!'}]}>
                          <Input placeholder="Введіть назву"/>
                      </Form.Item>}
                
                <Button type="primary" htmlType="submit" className="create-button">
                    {city == null ? 'Створити' : 'Оновити'}
                </Button>
            </Form>
        </div>
        </>
    )
}

export default CityForm;