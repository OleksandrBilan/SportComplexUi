import { Form, Select, Input, Button, DatePicker } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPath } from "../App";
import Navbar from "../Navbar/Navbar";
import moment from 'moment';
import '../Groups/groupForm.css'

const { Option } = Select;

const EmployeeEducationForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const employee = location.state.employee;
    const education = location.state.education;
    const navEmployee = location.state.navEmployee;
    const [levels, setLevels] = useState();

    useEffect(() => {
        axios.get(apiPath + 'employee/getEducationLevels').then(response => {
            setLevels(response.data);
        })
    }, []);

    const onFinish = (values) => {
        let temp = {
            id: education?.id,
            employeeId: employee.id,
            university: values.university,
            levelId: values.level,
            specialty: values.specialty,
            graduationDate: values.graduationDate.format()
        };

        if (education == null) {
            axios.post(apiPath + 'employee/addEmployeeEducation', temp).then(response => {
                axios.get(apiPath + 'employee/getById?id=' + employee.id).then(response => {
                    navigate('/employee', {state: {navEmployee: navEmployee, employee: response.data}});
                })
            }).catch(error => {
                alert('Помилка створення!');
            })
        }
        else {
            axios.put(apiPath + 'employee/updateEmployeeEducation', temp).then(response => {
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
                {education != null 
                    ? <Form.Item label="Спеціальність" name='specialty' rules={[{ required: true, message: 'Будь ласка, введіть спеціальність!'}]} initialValue={education.specialty.name}>
                        <Input placeholder="Введіть спеціальність"/>
                    </Form.Item>
                    : <Form.Item label="Спеціальність" name='specialty' rules={[{ required: true, message: 'Будь ласка, введіть спеціальність!'}]}>
                        <Input placeholder="Введіть спеціальність"/>
                    </Form.Item>}

                {education != null 
                    ? <Form.Item label="Навчальний заклад" name='university' rules={[{ required: true, message: 'Будь ласка, введіть назву навчального закладу!'}]} initialValue={education.university.name}>
                        <Input placeholder="Введіть назву навчального закладу"/>
                    </Form.Item>
                    : <Form.Item label="Навчальний заклад" name='university' rules={[{ required: true, message: 'Будь ласка, введіть назву навчального закладу!'}]}>
                        <Input placeholder="Введіть назву навчального закладу"/>
                    </Form.Item>}

                {education != null 
                      ? <Form.Item label="Рівень" name='level' rules={[{ required: true, message: 'Будь ласка, оберіть рівень освіти!'}]} initialValue={education.level.id}>
                            <Select placeholder="Оберіть рівень освіти">
                                {levels?.map(s => <Option value={s.id}>{s.name}</Option>)} 
                            </Select>
                        </Form.Item>
                      : <Form.Item label="Рівень" name='level' rules={[{ required: true, message: 'Будь ласка, оберіть рівень освіти!'}]}>
                            <Select placeholder="Оберіть рівень освіти">
                                {levels?.map(s => <Option value={s.id}>{s.name}</Option>)} 
                            </Select>
                        </Form.Item>}
                    
                {education != null 
                      ? <Form.Item label='Дата закінчення' name='graduationDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]} initialValue={moment(education.graduationDate)}>
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>
                      : <Form.Item label='Дата закінчення' name='graduationDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]} >
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>}

                    <Button type="primary" htmlType="submit" className="create-button">
                        {education == null ? 'Створити' : 'Оновити'}
                    </Button>
                </Form>
        </div>
        </>
    )
}

export default EmployeeEducationForm;