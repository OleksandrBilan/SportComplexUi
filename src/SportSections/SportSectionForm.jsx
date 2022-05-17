import { Form, Select, Input, Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPath } from "../App";
import Navbar from "../Navbar/Navbar";
import '../Groups/groupForm.css';

const { Option } = Select;

const SportSectionForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const section = location.state.sportSection;
    const navEmployee = location.state.navEmployee;
    const [sportTypes, setSportTypes] = useState();

    useEffect(() => {
        axios.get(apiPath + 'sportType/getAll').then(response => {
            setSportTypes(response.data);
        })
    }, [])

    const onFinish = values => {
        let temp = {
            id: section?.id,
            sportTypeId: values.sportType,
            name: values.name,
            description: values.description
        };

        if (section == null) {
            axios.post(apiPath + 'sportSection/create', temp).then(response => {
                navigate('/sportSections', {state: {navEmployee: navEmployee}});
            }).catch(error => {
                alert('Помилка створення!');
            })
        }
        else {
            axios.put(apiPath + 'sportSection/update', temp).then(response => {
                navigate('/sportSections', {state: {navEmployee: navEmployee}});
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
                {section != null
                      ? <Form.Item label="Вид спорту" rules={[{ required: true, message: 'Будь ласка, оберіть вид спорту!'}]} name='sportType' initialValue={section.sportType.id}>
                            <Select placeholder="Оберіть вид спорту">
                                {sportTypes?.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)} 
                            </Select>
                        </Form.Item>
                      : <Form.Item label="Вид спорту" rules={[{ required: true, message: 'Будь ласка, оберіть вид спорту!'}]} name='sportType'>
                            <Select placeholder="Оберіть вид спорту">
                                {sportTypes?.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)} 
                            </Select>
                        </Form.Item>}

                {section != null 
                      ? <Form.Item label="Назва" name='name' rules={[{ required: true, message: 'Будь ласка, введіть назву!'}]} initialValue={section.name}>
                            <Input placeholder="Введіть назву" />
                        </Form.Item>
                      : <Form.Item label="Назва" name='name' rules={[{ required: true, message: 'Будь ласка, введіть назву!'}]}>
                            <Input placeholder="Введіть назву" />
                        </Form.Item>}

                {section != null 
                      ? <Form.Item label="Опис" name='description' rules={[{ required: true, message: 'Будь ласка, введіть опис!'}]} initialValue={section.description}>
                            <Input.TextArea placeholder="Введіть опис" />
                        </Form.Item>
                      : <Form.Item label="Опис" name='description' rules={[{ required: true, message: 'Будь ласка, введіть опис!'}]}>
                            <Input.TextArea placeholder="Введіть опис" />
                        </Form.Item>}

                <Button type="primary" htmlType="submit" className="create-button">
                    {section == null ? 'Створити' : 'Оновити'}
                </Button>
            </Form>
        </div>
        </>
    )
}

export default SportSectionForm;