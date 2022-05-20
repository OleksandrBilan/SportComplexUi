import { Form, Select, Input, Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPath } from "../App";
import Navbar from "../Navbar/Navbar";
import '../Groups/groupForm.css';

const { Option } = Select;

const GymForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const gym = location.state.gym;
    const navEmployee = location.state.navEmployee;
    const [cities, setCities] = useState();

    useEffect(() => {
        axios.get(apiPath + 'city/getAll').then(response => {
            setCities(response.data);
        })
    }, [])

    const onFinish = values => {
        let temp = {
            id: gym?.id,
            address: values.address,
            phoneNumber: values.phoneNumber,
            cityId: values.city
        };

        if (gym == null) {
            axios.post(apiPath + 'gym/create', temp).then(response => {
                navigate('/gyms', {state: {navEmployee: navEmployee}});
            }).catch(error => {
                alert('Помилка створення!');
            })
        }
        else {
            axios.put(apiPath + 'gym/update', temp).then(response => {
                navigate('/gyms', {state: {navEmployee: navEmployee}});
            }).catch(error => {
                alert('Помилка оновлення!');
            })
        }
    }

    return (
        <>
        <Navbar employee={navEmployee} />
        <div className="group-form">
            <Form onFinish={onFinish}>
                {gym != null
                      ? <Form.Item label="Місто" rules={[{ required: true, message: 'Будь ласка, оберіть місто!'}]} name='city' initialValue={gym.city.id}>
                            <Select placeholder="Оберіть місто">
                                {cities?.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)} 
                            </Select>
                        </Form.Item>
                      : <Form.Item label="Місто" rules={[{ required: true, message: 'Будь ласка, оберіть місто!'}]} name='city'>
                            <Select placeholder="Оберіть місто">
                                {cities?.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)} 
                            </Select>
                        </Form.Item>}

                {gym != null 
                      ? <Form.Item label="Адреса" name='address' rules={[{ required: true, message: 'Будь ласка, введіть адресу!'}]} initialValue={gym.address}>
                            <Input placeholder="Введіть адресу" />
                        </Form.Item>
                      : <Form.Item label="Адреса" name='address' rules={[{ required: true, message: 'Будь ласка, введіть адресу!'}]}>
                            <Input placeholder="Введіть адресу" />
                        </Form.Item>}

                {gym != null 
                      ? <Form.Item label="Контакти" name='phoneNumber' rules={[{ required: true, message: 'Будь ласка, введіть контакти!'}]} initialValue={gym.phoneNumber}>
                            <Input placeholder="Введіть контакти" />
                        </Form.Item>
                      : <Form.Item label="Контакти" name='phoneNumber' rules={[{ required: true, message: 'Будь ласка, введіть контакти!'}]}>
                            <Input placeholder="Введіть контакти" />
                        </Form.Item>}

                <Button type="primary" htmlType="submit" className="create-button">
                    {gym == null ? 'Створити' : 'Оновити'}
                </Button>
            </Form>
        </div>
        </>
    )
}

export default GymForm;