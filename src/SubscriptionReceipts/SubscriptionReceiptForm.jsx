import { Form, Select, DatePicker, Button, Checkbox } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPath, managerPositionId } from "../App";
import Navbar from "../Navbar/Navbar";
import '../Groups/groupForm.css';
import moment from 'moment';

const { Option } = Select;

const SubscriptionReceiptForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const receipt = location.state.subscriptionReceipt;
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [customers, setCustomers] = useState();
    const [employees, setEmployees] = useState();
    const [subscriptionTypes, setSubscriptionTypes] = useState();

    useEffect(() => {
        axios.get(apiPath + 'customer/getAll').then(response => {
            setCustomers(response.data);
        })

        axios.get(apiPath + 'employee/getAll').then(response => {
            let temp = response.data.filter(e => e.position.id = managerPositionId);
            setEmployees(temp);
        })

        axios.get(apiPath + 'subscriptionType/getAll').then(response => {
            setSubscriptionTypes(response.data);
        })
    }, [])

    const onFinish = values => {
        let temp = {
            id: receipt?.id,
            sellerId: values.seller,
            customerId: values.customer,
            subscriptionTypeId: values.subscriptionType,
            isPayed: values.isPayed ?? false,
            isActive: values.isActive ?? false,
            expireDate: values.expireDate
        };

        if (receipt == null) {
            axios.post(apiPath + 'subscriptionReceipt/create', temp).then(response => {
                navigate('/subscriptionReceipts', {state: {navEmployee: navEmployee, employee: employee}});
            }).catch(error => {
                alert('Помилка створення!');
            })
        }
        else {
            axios.put(apiPath + 'subscriptionReceipt/update', temp).then(response => {
                navigate('/subscriptionReceipts', {state: {navEmployee: navEmployee, employee: employee}});
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
                {receipt != null 
                      ? <Form.Item label="Клієнт" name='customer' rules={[{ required: true, message: 'Будь ласка, оберіть клієнта!'}]}  initialValue={receipt.customer.id}>
                            <Select placeholder="Оберіть клієнта">
                                {customers?.map(s => <Option value={s.id}>{s.firstName + ' ' + s.lastName}</Option>)} 
                            </Select>
                        </Form.Item>
                      : <Form.Item label="Клієнт" name='customer' rules={[{ required: true, message: 'Будь ласка, оберіть клієнта!'}]} >
                            <Select placeholder="Оберіть клієнта">
                                {customers?.map(s => <Option value={s.id}>{s.firstName + ' ' + s.lastName}</Option>)} 
                            </Select>
                        </Form.Item>}
                
                {receipt != null 
                      ? <Form.Item label="Продавець" name='seller' rules={[{ required: true, message: 'Будь ласка, оберіть продавця!'}]} initialValue={receipt.seller.id}>
                            <Select placeholder="Оберіть продавця">
                                {employees?.map(c => <Option value={c.id}>{c.firstName + ' ' + c.lastName}</Option>)} 
                            </Select>
                        </Form.Item>
                      : <Form.Item label="Продавець" name='seller' rules={[{ required: true, message: 'Будь ласка, оберіть продавця!'}]} >
                            <Select placeholder="Оберіть продавця">
                                {employees?.map(c => <Option value={c.id}>{c.firstName + ' ' + c.lastName}</Option>)} 
                            </Select>
                        </Form.Item>}
                
                {receipt != null 
                      ? <Form.Item label="Абонемент" name='subscriptionType' rules={[{ required: true, message: 'Будь ласка, оберіть абомент!'}]} initialValue={receipt.subscriptionType.id}>
                            <Select placeholder="Оберіть абомент">
                                {subscriptionTypes?.map(c => <Option value={c.id}>{c.sportSection.name}</Option>)} 
                            </Select>
                        </Form.Item>
                      : <Form.Item label="Абонемент" name='subscriptionType' rules={[{ required: true, message: 'Будь ласка, оберіть абомент!'}]} >
                            <Select placeholder="Оберіть абомент">
                                {subscriptionTypes?.map(c => <Option value={c.id}>{c.sportSection.name}</Option>)} 
                            </Select>
                        </Form.Item>}
                
                {receipt != null 
                      ? <Form.Item label='Дата закінчення дії' name='expireDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]}  initialValue={moment(receipt.expireDate)}>
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>
                      : <Form.Item label='Дата закінчення дії' name='expireDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]} >
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>}

                {receipt != null 
                      ? <Form.Item name='isPayed' valuePropName="checked" initialValue={receipt.isPayed}>
                            <Checkbox>
                                Оплачений
                            </Checkbox>
                        </Form.Item>
                      : <Form.Item name='isPayed' valuePropName="checked" initialValue={true}>
                            <Checkbox>
                                Оплачений
                            </Checkbox>
                        </Form.Item>}
                
                {receipt != null 
                      ? <Form.Item name='isActive' valuePropName="checked" initialValue={receipt.isActive}>
                            <Checkbox>
                                Активний
                            </Checkbox>
                        </Form.Item>
                      : <Form.Item name='isPayed' valuePropName="checked" initialValue={true}>
                            <Checkbox>
                                Активний
                            </Checkbox>
                        </Form.Item>}

                <Button type="primary" htmlType="submit" className="create-button">
                    {receipt == null ? 'Створити' : 'Оновити'}
                </Button>
            </Form>
        </div>
        </>
    )
}

export default SubscriptionReceiptForm;