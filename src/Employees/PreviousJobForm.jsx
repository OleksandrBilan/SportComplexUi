import { Form, Select, Input, Button, DatePicker } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPath } from "../App";
import Navbar from "../Navbar/Navbar";
import moment from 'moment';
import '../Groups/groupForm.css'

const { Option } = Select;

const PreviousJobForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const employee = location.state.employee;
    const job = location.state.job;
    const navEmployee = location.state.navEmployee;

    const onFinish = (values) => {
        let temp = {
            id: job?.id,
            employeeId: employee.id,
            company: values.company,
            startDate: values.startDate.format('YYYY-MM-DD'),
            endDate: values.endDate.format('YYYY-MM-DD')
        };

        if (job == null) {
            axios.post(apiPath + 'employee/addEmployeePreviousJob', temp).then(response => {
                axios.get(apiPath + 'employee/getById?id=' + employee.id).then(response => {
                    navigate('/employee', {state: {navEmployee: navEmployee, employee: response.data}});
                })
            }).catch(error => {
                alert('Помилка створення!');
            })
        }
        else {
            axios.put(apiPath + 'employee/updateEmployeePreviousJob', temp).then(response => {
                axios.get(apiPath + 'employee/getById?id=' + employee.id).then(response => {
                    navigate('/employee', {state: {navEmployee: navEmployee, employee: response.data}});
                })
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
                {job != null 
                    ? <Form.Item label="Місце праці" name='company' rules={[{ required: true, message: 'Будь ласка, введіть місце праці!'}]} initialValue={job.company.name}>
                        <Input placeholder="Введіть місце праці"/>
                    </Form.Item>
                    : <Form.Item label="Місце праці" name='company' rules={[{ required: true, message: 'Будь ласка, введіть місце праці!'}]}>
                        <Input placeholder="Введіть місце праці"/>
                    </Form.Item>}
                
                    {job != null 
                      ? <Form.Item label='Дата початку' name='startDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]} initialValue={moment(job.startDate)}>
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>
                      : <Form.Item label='Дата початку' name='startDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]}>
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>}

                {job != null 
                      ? <Form.Item label='Дата закінчення' name='endDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]} initialValue={moment(job.endDate)}>
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>
                      : <Form.Item label='Дата закінчення' name='endDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]} >
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>}

                    <Button type="primary" htmlType="submit" className="create-button">
                        {job == null ? 'Створити' : 'Оновити'}
                    </Button>
                </Form>
        </div>
        </>
    )
}

export default PreviousJobForm;