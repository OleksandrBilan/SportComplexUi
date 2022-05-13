import { Form, Select, Input, DatePicker, Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPath } from "../App";
import Navbar from "../Navbar/Navbar";
import '../Groups/groupForm.css';
import moment from 'moment';

const { Option } = Select;

const MembershipReceiptForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const receipt = location.state.membershipReceipt;
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [customers, setCustomers] = useState();
    const [employees, setEmployees] = useState();
    const [membershipTypes, setMembershipTypes] = useState();

    useEffect(() => {
        axios.get(apiPath + 'customer/getAll').then(response => {
            setCustomers(response.data);
        })

        axios.get(apiPath + 'employee/getAll').then(response => {
            let temp = response.data.filter(e => e.position.id = 1);
            setEmployees(temp);
        })

        axios.get(apiPath + 'membershipType/getAll').then(response => {
            setMembershipTypes(response.data);
        })
    }, [])

    const onFinish = values => {
        let temp = {
            id: receipt?.id,
            sellerId: values.seller,
            customerId: values.customer,
            membershipTypeId: values.membershipType,
            payementDateTime: values.payementDateTime
        };

        if (receipt == null) {
            axios.post(apiPath + 'membershipReceipt/create', temp).then(response => {
                navigate('/membershipReceipts', {state: {navEmployee: navEmployee, employee: employee}});
            }).catch(error => {
                alert('Помилка створення!');
            })
        }
        else {
            axios.put(apiPath + 'membershipReceipt/update', temp).then(response => {
                navigate('/membershipReceipts', {state: {navEmployee: navEmployee, employee: employee}});
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
                      ? <Form.Item label="Абонемент" name='membershipType' rules={[{ required: true, message: 'Будь ласка, оберіть абомент!'}]} initialValue={receipt.membershipType.id}>
                            <Select placeholder="Оберіть абомент">
                                {membershipTypes?.map(c => <Option value={c.id}>{c.name}</Option>)} 
                            </Select>
                        </Form.Item>
                      : <Form.Item label="Абонемент" name='membershipType' rules={[{ required: true, message: 'Будь ласка, оберіть абомент!'}]} >
                            <Select placeholder="Оберіть абомент">
                                {membershipTypes?.map(c => <Option value={c.id}>{c.name}</Option>)} 
                            </Select>
                        </Form.Item>}
                
                {receipt != null 
                      ? <Form.Item label='Дата оплати' name='payementDateTime' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]}  initialValue={moment(receipt.payementDateTime)}>
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>
                      : <Form.Item label='Дата оплати' name='payementDateTime' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]} >
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>}

                <Button type="primary" htmlType="submit" className="create-button">
                    {receipt == null ? 'Створити' : 'Оновити'}
                </Button>
            </Form>
        </div>
        </>
    )
}

export default MembershipReceiptForm;