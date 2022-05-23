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
    const [days, setDays] = useState();
    const [selectedDays, setSelectedDays] = useState();

    useEffect(() => {
        axios.get(apiPath + 'sportSection/getAll').then(response => {
            setSportSections(response.data);
        })

        axios.get(apiPath + 'coach/getAll').then(response => {
            setCoaches(response.data);
        })

        axios.get(apiPath + 'group/getDays').then(response => {
            setDays(response.data);
        })
    }, [])

    function arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
      
        a.sort();
        b.sort();
      
        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
      }

    const onFinish = values => {
        let temp = {
            id: group?.id,
            sportSectionId: values.sportSection,
            coachId: values.coach,
            maxCustomersNumber: values.maxCustomersCount,
            startDate: values.startDate.format('YYYY-MM-DD'),
            endDate: values.endDate.format('YYYY-MM-DD'),
            schedules: values.scheduleDays.map(d => ({dayId: d, startTime: values.startTime, endTime: values.endTime}))
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
                      ? <Form.Item label="Спортивна секція" name='sportSection' rules={[{ required: true, message: 'Будь ласка, оберіть спортивну секцію!'}]} initialValue={group.sportSection.id}>
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
                      ? <Form.Item label='Максимальна кількість відвідувачів' name='maxCustomersCount' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]} initialValue={group.maxCustomersCount}>
                            <Input min={1} type='number'/>
                        </Form.Item>
                      : <Form.Item label='Максимальна кількість відвідувачів' name='maxCustomersCount' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]} >
                            <Input min={1} type='number'/>
                        </Form.Item>}
                        
                {group != null 
                      ? <Form.Item label='Дата початку тренувань' name='startDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]} initialValue={moment(group.startDate)}>
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>
                      : <Form.Item label='Дата початку тренувань' name='startDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]} >
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>}
                
                {group != null 
                      ? <Form.Item label='Дата закінчення тренувань' name='endDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]} initialValue={moment(group.endDate)}>
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>
                      : <Form.Item label='Дата закінчення тренувань' name='endDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]} >
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>}

                {group != null
                      ? <Form.Item label="Дні занять" name='scheduleDays'>
                            <Select placeholder="Оберіть дні занять" mode="multiple" onChange={values => setSelectedDays(values)} defaultValue={group.schedules.map(x => x.day.id)}>
                                {days?.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)}
                            </Select>
                        </Form.Item>
                      : <Form.Item label="Дні занять" name='scheduleDays'>
                            <Select placeholder="Оберіть дні занять" mode="multiple" onChange={values => setSelectedDays(values)}>
                                {days?.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)}
                            </Select>
                        </Form.Item>}
                
                {group != null 
                      ? <Form.Item label='Час початку заняття' name='startTime' initialValue={group.schedules[0]?.startTime?.slice(0, 5)}>
                            <Input />
                        </Form.Item>
                      : <Form.Item label='Час початку заняття' name='startTime'>
                            <Input />
                        </Form.Item>}
                
                {group != null 
                      ? <Form.Item label='Час закінчеття заняття' name='endTime' initialValue={group.schedules[0]?.endTime?.slice(0, 5)}>
                            <Input />
                        </Form.Item>
                      : <Form.Item label='Час закінчеття заняття' name='endTime'>
                            <Input />
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