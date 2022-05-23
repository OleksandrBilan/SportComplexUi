import { Form, Select, Input, DatePicker, Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPath, coachPostionId } from "../App";
import Navbar from "../Navbar/Navbar";
import '../Groups/groupForm.css';
import moment from 'moment';

const { Option } = Select;

const GroupTrainingForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const groupTraining = location.state.groupTraining;
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [subscriptionReceipts, setSubscriptionReceipts] = useState();
    const [groups, setGroups] = useState();

    useEffect(() => {
        axios.get(apiPath + 'subscriptionReceipt/getAll').then(response => {
            setSubscriptionReceipts(response.data);
        })

        axios.get(apiPath + 'group/getAll').then(response => {
            let temp = response.data;
            if (navEmployee.position.id == coachPostionId) {
                temp = temp.filter(g => g.coach.employeeInfo.id == navEmployee.id);
            }
            setGroups(temp);
        })
    }, [])

    const onFinish = values => {
        let temp = {
            id: groupTraining?.id,
            startDateTime: values.startDate.format('YYYY-MM-DD') + 'T' + values.startTime,
            groupId: values.group,
            receiptId: values.receipt
        };

        if (groupTraining == null) {
            axios.post(apiPath + 'groupTraining/create', temp).then(response => {
                navigate('/groupTrainings', {state: {navEmployee: navEmployee, employee: employee}});
            }).catch(error => {
                alert('Помилка створення!');
            })
        }
        else {
            axios.put(apiPath + 'groupTraining/update', temp).then(response => {
                navigate('/groupTrainings', {state: {navEmployee: navEmployee, employee: employee}});
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
                {groupTraining != null 
                      ? <Form.Item label="Абонемент" name='receipt' rules={[{ required: true, message: 'Будь ласка, оберіть абонемент!'}]} initialValue={groupTraining.receipt.id}>
                            <Select placeholder="Оберіть абонемент">
                                {subscriptionReceipts?.map(s => <Option key={s.id} value={s.id}>{s.customer.firstName + ' ' + s.customer.lastName + ', ' + s.subscriptionType.sportSection.name}</Option>)} 
                            </Select>
                        </Form.Item>
                      : <Form.Item label="Абонемент" name='receipt' rules={[{ required: true, message: 'Будь ласка, оберіть абонемент!'}]}>
                            <Select placeholder="Оберіть абонемент">
                                {subscriptionReceipts?.map(s => <Option key={s.id} value={s.id}>{s.customer.firstName + ' ' + s.customer.lastName + ', ' + s.subscriptionType.sportSection.name}</Option>)} 
                            </Select>
                        </Form.Item>}
                
                {groupTraining != null 
                      ? <Form.Item label="Група" name='group' rules={[{ required: true, message: 'Будь ласка, оберіть групу!'}]} initialValue={groupTraining.group.id}>
                            <Select placeholder="Оберіть групу">
                                {groups?.map(c => <Option key={c.id} value={c.id}>{c.sportSection.name + ', ' + c.coach.employeeInfo.firstName + ' ' + c.coach.employeeInfo.lastName}</Option>)} 
                            </Select>
                        </Form.Item>
                      : <Form.Item label="Група" name='group' rules={[{ required: true, message: 'Будь ласка, оберіть групу!'}]}>
                            <Select placeholder="Оберіть групу">
                                {groups?.map(c => <Option key={c.id} value={c.id}>{c.sportSection.name + ', ' + c.coach.employeeInfo.firstName + ' ' + c.coach.employeeInfo.lastName}</Option>)} 
                            </Select>
                        </Form.Item>}
                
                {groupTraining != null 
                      ? <Form.Item label='Дата' name='startDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]} initialValue={moment(groupTraining.startDateTime)}>
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>
                      : <Form.Item label='Дата' name='startDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]}>
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>}

                {groupTraining != null 
                      ? <Form.Item label='Час' name='startTime' rules={[{ required: true, message: 'Будь ласка, введіть час!'}]} initialValue={groupTraining.startDateTime.slice(11, 16)}>
                            <Input placeholder="Введіть час"/>
                        </Form.Item>
                      : <Form.Item label='Час' name='startTime' rules={[{ required: true, message: 'Будь ласка, введіть час!'}]}>
                            <Input placeholder="Введіть час"/>
                        </Form.Item>}

                <Button type="primary" htmlType="submit" className="create-button">
                    {groupTraining == null ? 'Створити' : 'Оновити'}
                </Button>
            </Form>
        </div>
        </>
    )
}

export default GroupTrainingForm;