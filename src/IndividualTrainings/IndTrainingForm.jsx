import { Form, Select, Input, DatePicker, TimePicker, Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPath } from "../App";
import Navbar from "../Navbar/Navbar";
import './indTrainForm.css';
import moment from 'moment';

const { Option } = Select;

const IndTrainingForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const indTraining = location.state.individualTraining;
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [membershipReceipts, setMembershipReceipts] = useState();
    const [coaches, setCoaches] = useState();

    useEffect(() => {
        axios.get(apiPath + 'membershipReceipt/getAll').then(response => {
            setMembershipReceipts(response.data);
        })

        axios.get(apiPath + 'coach/individualCoaches').then(response => {
            setCoaches(response.data);
        })
    }, [])

    const onFinish = values => {
        let temp = {
            id: indTraining.id,
            membershipReceiptId: values.membershipReceipt,
            individualCoachId: values.coach,
            payedHours: values.payedHours,
            price: values.price,
            payementDateTime: values.payementDate.format('YYYY-MM-DD')
        };
        console.log(temp)

        if (indTraining == null) {
            axios.post(apiPath + 'individualTraining/create', temp).then(response => {
                navigate('/individualTrainings', {state: {navEmployee: navEmployee, employee: employee}});
            }).catch(error => {
                alert('Помилка створення!');
            })
        }
        else {
            axios.put(apiPath + 'individualTraining/update', temp).then(response => {
                navigate('/individualTrainings', {state: {navEmployee: navEmployee, employee: employee}});
            }).catch(error => {
                alert('Помилка оновлення!');
            })
        }
    }

    return (
        <>
        <Navbar employee={employee} />
        <div className="group-form">
            <Form onFinish={onFinish}>
                {indTraining != null 
                      ? <Form.Item label="Абонемент" name='membershipReceipt' rules={[{ required: true, message: 'Будь ласка, оберіть абонемент!'}]} initialValue={indTraining.membershipReceipt.id}>
                            <Select placeholder="Оберіть абонемент">
                                {membershipReceipts?.map(x => 
                                    <Option value={x.id}>{x.customer.firstName + ' ' + x.customer.lastName + ', ' + x.membershipType.name + ', ' + new Date(x.payementDateTime).toLocaleDateString()}</Option>)} 
                            </Select>
                        </Form.Item>
                      : <Form.Item label="Абонемент" name='membershipReceipt' rules={[{ required: true, message: 'Будь ласка, оберіть абонемент!'}]}>
                            <Select placeholder="Оберіть абонемент">
                                {membershipReceipts?.map(x => 
                                    <Option value={x.id}>{x.customer.firstName + ' ' + x.customer.lastName + ', ' + x.membershipType.name + ', ' + new Date(x.payementDateTime).toLocaleDateString()}</Option>)} 
                            </Select>
                        </Form.Item>}
                
                {indTraining != null 
                      ? <Form.Item label="Тренер" name='coach' rules={[{ required: true, message: 'Будь ласка, оберіть тренера!'}]} initialValue={indTraining.coach.id}>
                            <Select placeholder="Оберіть тренера">
                                {coaches?.map(c => <Option value={c.id}>{c.coachInfo.employeeInfo.firstName + ' ' + c.coachInfo.employeeInfo.lastName}</Option>)} 
                            </Select>
                        </Form.Item>
                      : <Form.Item label="Тренер" name='coach' rules={[{ required: true, message: 'Будь ласка, оберіть тренера!'}]} >
                            <Select placeholder="Оберіть тренера">
                                {coaches?.map(c => <Option value={c.id}>{c.coachInfo.employeeInfo.firstName + ' ' + c.coachInfo.employeeInfo.lastName}</Option>)} 
                            </Select>
                        </Form.Item>}
                
                {indTraining != null 
                      ? <Form.Item label='Кількість оплачених годин' name='payedHours' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]}  initialValue={indTraining.payedHours}>
                            <Input placeholder="Введіть число"/>
                        </Form.Item>
                      : <Form.Item label='Кількість оплачених годин' name='payedHours' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]} >
                            <Input placeholder="Введіть число"/>
                        </Form.Item>}
                        
                {indTraining != null 
                      ? <Form.Item label='Ціна' name='price' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]}  initialValue={indTraining.price}>
                            <Input placeholder="Введіть число"/>
                        </Form.Item>
                        : <Form.Item label='Ціна' name='price' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]} >
                            <Input placeholder="Введіть число"/>
                        </Form.Item>}
                
                
                {indTraining != null 
                      ? <>
                        <Form.Item label='Дата оплати' name='payementDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]}  initialValue={moment(indTraining.payementDateTime)}>
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>
                        <Form.Item label='Час оплати' name='payementTime' rules={[{ required: true, message: 'Будь ласка, оберіть час!'}]} initialValue={moment(indTraining.payementDateTime)}>
                            <TimePicker placeholder="Оберіть час"/>
                        </Form.Item>
                        </>
                      : <>
                        <Form.Item label='Дата оплати' name='payementDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]}>
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>
                        <Form.Item label='Час оплати' name='payementTime' rules={[{ required: true, message: 'Будь ласка, оберіть час!'}]}>
                            <TimePicker placeholder="Оберіть час"/>
                        </Form.Item>
                        </>}

                <Button type="primary" htmlType="submit" className="create-button">
                    {indTraining == null ? 'Створити' : 'Оновити'}
                </Button>
            </Form>
        </div>
        </>
    )
}

export default IndTrainingForm;