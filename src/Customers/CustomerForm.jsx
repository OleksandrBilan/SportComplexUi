import { Form, Select, Input, DatePicker, TimePicker, Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPath } from "../App";
import Navbar from "../Navbar/Navbar";
import moment from 'moment';

const { Option } = Select;

const CustomerForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const customer = location.state.customer;
    const navEmployee = location.state.navEmployee;

    const onFinish = (values) => {
        let temp = {
            id: customer?.id,
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber
        };

        if (customer == null) {
            axios.post(apiPath + 'customer/create', temp).then(response => {
                navigate('/customers', {state: {navEmployee: navEmployee}});
            }).catch(error => {
                alert('Помилка створення!');
            })
        }
        else {
            axios.put(apiPath + 'customer/update', temp).then(response => {
                navigate('/customers', {state: {navEmployee: navEmployee}});
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
                {customer != null 
                    ? <Form.Item label="Ім'я" name='firstName' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]} initialValue={customer.firstName}>
                        <Input placeholder="Введіть ім'я"/>
                    </Form.Item>
                    : <Form.Item label="Ім'я" name='firstName' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]}>
                        <Input placeholder="Введіть ім'я"/>
                    </Form.Item>}

                {customer != null 
                    ? <Form.Item label="Прізвище" name='lastName' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]} initialValue={customer.lastName}>
                        <Input placeholder="Введіть прізвище"/>
                    </Form.Item>
                    : <Form.Item label="Ім'я" name='lastName' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]}>
                        <Input placeholder="Введіть прізвище"/>
                    </Form.Item>}
                    
                {customer != null 
                    ? <Form.Item label="Номер телефону" name='phoneNumber' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]} initialValue={customer.phoneNumber}>
                        <Input placeholder="Введіть номер телефону"/>
                    </Form.Item>
                    : <Form.Item label="Номер телефону" name='phoneNumber' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]}>
                        <Input placeholder="Введіть номер телефону"/>
                    </Form.Item>}

                    <Button type="primary" htmlType="submit" className="create-button">
                        {customer == null ? 'Створити' : 'Оновити'}
                    </Button>
                </Form>
        </div>
        </>
    )
}

export default CustomerForm;