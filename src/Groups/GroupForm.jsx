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
    const employee = location.state.employee;
    const [sportSections, setSportSections] = useState();
    const [coaches, setCoaches] = useState();
    const [groupValues, setGroupValues] = useState();

    useEffect(() => {
        axios.get(apiPath + 'sportSection/getAll').then(response => {
            setSportSections(response.data);
        })

        axios.get(apiPath + 'coach/getAll').then(response => {
            setCoaches(response.data);
        })
    }, [])

    const onFinish = values => {
        console.log(values)

        if (group == null) {
            axios.post(apiPath + 'group/create', {
                sportSectionId: values.sportSection,
                coachId: values.coach,
                maxCustomersNumber: values.maxCustomersCount,
                startDate: values.startDate,
                endDate: values.endDate
            }).then(response => {
                navigate('/groups', {state: {employee: employee}});
            }).catch(error => {
                alert('Помилка створення!');
            })
        }
        else {
            axios.put(apiPath + 'group/update', {
                id: group.id,
                sportSectionId: values.sportSection,
                coachId: values.coach,
                maxCustomersNumber: values.maxCustomersCount,
                startDate: values.startDate,
                endDate: values.endDate
            }).then(response => {
                navigate('/groups', {state: {employee: employee}});
            }).catch(error => {
                alert('Помилка оновлення!');
            })
        }
    }

    return (
        <>
        <Navbar employee={employee} />
        <div className="group-form">
            <Form onFinish={values => onFinish(values)}>
                <Form.Item label="Спортивна секція" name='sportSection' required={true}>
                    <Select placeholder="Оберіть спортивну секцію" defaultValue={group.sportSection.id}>
                        {sportSections?.map(s => <Option value={s.id}>{s.name}</Option>)} 
                    </Select>
                </Form.Item>
                <Form.Item label="Тренер" name='coach' required={true}>
                    <Select placeholder="Оберіть тренера" defaultValue={group.coach.id}>
                        {coaches?.map(c => <Option value={c.id}>{c.employeeInfo.firstName + ' ' + c.employeeInfo.lastName}</Option>)} 
                    </Select>
                </Form.Item>
                <Form.Item label='Максимальна кількість відвідувачів' name='maxCustomersCount' required={true}>
                    <Input min={1} max={100} defaultValue={group?.maxCustomersCount ?? 10} type='number'/>
                </Form.Item>
                <Form.Item label='Дата початку тренувань' name='startDate' required={true}>
                    <DatePicker placeholder="Оберіть дату" defaultValue={moment(group.startDate)}/>
                </Form.Item>
                <Form.Item label='Дата закінчення тренувань' name='endDate' required={true}>
                    <DatePicker placeholder="Оберіть дату" defaultValue={moment(group.endDate)}/>
                </Form.Item>
                <Button type="primary" htmlType="submit" className="create-button">
                    {group == null ? 'Створити' : 'Оновити'}
                </Button>
            </Form>
        </div>
        </>
    )
}

export default GroupForm;