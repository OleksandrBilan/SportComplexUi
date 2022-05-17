import { Form, Select, Input, Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPath } from "../App";
import Navbar from "../Navbar/Navbar";
import '../Groups/groupForm.css';

const { Option } = Select;

const SubscriptionTypeForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const subType = location.state.subscriptionType;
    const navEmployee = location.state.navEmployee;
    const [sportSections, setSportSections] = useState();

    useEffect(() => {
        axios.get(apiPath + 'sportSection/getAll').then(response => {
            setSportSections(response.data);
        })
    }, [])

    const onFinish = values => {
        let temp = {
            id: subType?.id,
            sportSectionId: values.sportSection,
            availableTrainingsCount: values.availableTrainingsCount,
            price: values.price
        };

        if (subType == null) {
            axios.post(apiPath + 'subscriptionType/create', temp).then(response => {
                navigate('/subscriptionTypes', {state: {navEmployee: navEmployee}});
            }).catch(error => {
                alert('Помилка створення!');
            })
        }
        else {
            axios.put(apiPath + 'subscriptionType/update', temp).then(response => {
                navigate('/subscriptionTypes', {state: {navEmployee: navEmployee}});
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
                {subType != null
                      ? <Form.Item label="Спортивна секція" rules={[{ required: true, message: 'Будь ласка, оберіть спортивну секцію!'}]} name='sportSection' initialValue={subType.sportSection.id}>
                            <Select placeholder="Оберіть спортивну секцію">
                                {sportSections?.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)} 
                            </Select>
                        </Form.Item>
                      : <Form.Item label="Спортивна секція" rules={[{ required: true, message: 'Будь ласка, оберіть спортивну секцію!'}]} name='sportSection'>
                            <Select placeholder="Оберіть спортивну секцію">
                                {sportSections?.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)} 
                            </Select>
                        </Form.Item>}

                {subType != null 
                      ? <Form.Item label="Ціна" name='price' rules={[{ required: true, message: 'Будь ласка, введіть ціну!'}]} initialValue={subType.price}>
                            <Input placeholder="Введіть ціну" />
                        </Form.Item>
                      : <Form.Item label="Ціна" name='price' rules={[{ required: true, message: 'Будь ласка, введіть ціну!'}]}>
                            <Input placeholder="Введіть ціну" />
                        </Form.Item>}

                {subType != null 
                      ? <Form.Item label="Кількість тренувань" name='availableTrainingsCount' rules={[{ required: true, message: 'Будь ласка, введіть кількість!'}]} initialValue={subType.availableTrainingsCount}>
                            <Input placeholder="Введіть кількість" type='number' min={1} />
                        </Form.Item>
                      : <Form.Item label="Кількість тренувань" name='availableTrainingsCount' rules={[{ required: true, message: 'Будь ласка, введіть кількість!'}]}>
                            <Input placeholder="Введіть кількість" type='number' min={1} />
                        </Form.Item>}

                <Button type="primary" htmlType="submit" className="create-button">
                    {subType == null ? 'Створити' : 'Оновити'}
                </Button>
            </Form>
        </div>
        </>
    )
}

export default SubscriptionTypeForm;