import { Form, Select, Input, DatePicker, Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPath } from "../App";
import Navbar from "../Navbar/Navbar";
import './groupForm.css';
import moment from 'moment';

const { Option } = Select;

const GroupForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const group = location.state.group;
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [sportSections, setSportSections] = useState();
    const [coaches, setCoaches] = useState();

    useEffect(() => {
        axios.get(apiPath + 'sportSection/getAll').then(response => {
            setSportSections(response.data);
        })

        axios.get(apiPath + 'coach/getAll').then(response => {
            setCoaches(response.data);
        })
    }, [])

    const onFinish = values => {
        let temp = {
            id: group?.id,
            sportSectionId: values.sportSection,
            coachId: values.coach,
            maxCustomersNumber: values.maxCustomersCount,
            startDate: values.startDate,
            endDate: values.endDate
        };

        if (group == null) {
            axios.post(apiPath + 'group/create', temp).then(response => {
                navigate('/groups', {state: {navEmployee: navEmployee, employee: employee}});
            }).catch(error => {
                alert('Помилка створення!');
            })
        }
        else {
            axios.put(apiPath + 'group/update', temp).then(response => {
                navigate('/groups', {state: {navEmployee: navEmployee, employee: employee}});
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
                {group != null 
                      ? <Form.Item label="Спортивна секція" name='sportSection' rules={[{ required: true, message: 'Будь ласка, оберіть спортивну секцію!'}]}  initialValue={group.sportSection.id}>
                            <Select placeholder="Оберіть спортивну секцію">
                                {sportSections?.map(s => <Option value={s.id}>{s.name}</Option>)} 
                            </Select>
                        </Form.Item>
                      : <Form.Item label="Спортивна секція" name='sportSection' rules={[{ required: true, message: 'Будь ласка, оберіть спортивну секцію!'}]} >
                            <Select placeholder="Оберіть спортивну секцію">
                                {sportSections?.map(s => <Option value={s.id}>{s.name}</Option>)} 
                            </Select>
                        </Form.Item>}
                
                {group != null 
                      ? <Form.Item label="Тренер" name='coach' rules={[{ required: true, message: 'Будь ласка, оберіть тренера!'}]} initialValue={group.coach.id}>
                            <Select placeholder="Оберіть тренера">
                                {coaches?.map(c => <Option value={c.id}>{c.employeeInfo.firstName + ' ' + c.employeeInfo.lastName}</Option>)} 
                            </Select>
                        </Form.Item>
                      : <Form.Item label="Тренер" name='coach' rules={[{ required: true, message: 'Будь ласка, оберіть тренера!'}]} >
                            <Select placeholder="Оберіть тренера">
                                {coaches?.map(c => <Option value={c.id}>{c.employeeInfo.firstName + ' ' + c.employeeInfo.lastName}</Option>)} 
                            </Select>
                        </Form.Item>}
                
                {group != null 
                      ? <Form.Item label='Максимальна кількість відвідувачів' name='maxCustomersCount' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]}  initialValue={group.maxCustomersCount}>
                            <Input min={1} max={100} type='number'/>
                        </Form.Item>
                      : <Form.Item label='Максимальна кількість відвідувачів' name='maxCustomersCount' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]} >
                            <Input min={1} max={100} type='number'/>
                        </Form.Item>}
                        
                {group != null 
                      ? <Form.Item label='Дата початку тренувань' name='startDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]}  initialValue={moment(group.startDate)}>
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>
                      : <Form.Item label='Дата початку тренувань' name='startDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]} >
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>}
                
                
                {group != null 
                      ? <Form.Item label='Дата закінчення тренувань' name='endDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]}  initialValue={moment(group.endDate)}>
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>
                      : <Form.Item label='Дата закінчення тренувань' name='endDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]} >
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>}

                <Button type="primary" htmlType="submit" className="create-button">
                    {group == null ? 'Створити' : 'Оновити'}
                </Button>
            </Form>
        </div>
        </>
    )
}

export default GroupForm;