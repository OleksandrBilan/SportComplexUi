import { Form, Select, Input, Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPath } from "../App";
import Navbar from "../Navbar/Navbar";
import '../Groups/groupForm.css';

const { Option } = Select;

const MembershipTypeForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const membershipType = location.state.membershipType;
    const navEmployee = location.state.navEmployee;
    const [sportTypes, setSportTypes] = useState();
    const [selectedSportTypes, setSelectedSportTypes] = useState();

    useEffect(() => {
        axios.get(apiPath + 'sportType/getAll').then(response => {
            setSportTypes(response.data);
        })
    }, [])

    const onFinish = values => {
        let temp = {
            id: membershipType?.id,
            name: values.name,
            price: values.price,
            availabilityDurationInMonths: values.availabilityDuration,
            workoutStartTime: values.workoutStartTime,
            workoutEndTime: values.workoutEndTime,
            sportTypeIds: selectedSportTypes ?? membershipType.sportTypes.map(st => st.id)
        };

        if (membershipType == null) {
            axios.post(apiPath + 'membershipType/create', temp).then(response => {
                navigate('/membershipTypes', {state: {navEmployee: navEmployee}});
            }).catch(error => {
                alert('Помилка створення!');
            })
        }
        else {
            axios.put(apiPath + 'membershipType/update', temp).then(response => {
                navigate('/membershipTypes', {state: {navEmployee: navEmployee}});
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
                {membershipType != null 
                      ? <Form.Item label="Назва" name='name' rules={[{ required: true, message: 'Будь ласка, введіть назву!'}]} initialValue={membershipType.name}>
                            <Input placeholder="Введіть назву" />
                        </Form.Item>
                      : <Form.Item label="Назва" name='name' rules={[{ required: true, message: 'Будь ласка, введіть назву!'}]}>
                            <Input placeholder="Введіть назву" />
                        </Form.Item>}
                
                {membershipType != null 
                      ? <Form.Item label="Ціна" name='price' rules={[{ required: true, message: 'Будь ласка, введіть ціну!'}]} initialValue={membershipType.price}>
                            <Input placeholder="Введіть ціну" type='number' min={1} />
                        </Form.Item>
                      : <Form.Item label="Ціна" name='price' rules={[{ required: true, message: 'Будь ласка, введіть ціну!'}]}>
                            <Input placeholder="Введіть ціну" type='number' min={1} />
                        </Form.Item>}

                {membershipType != null 
                      ? <Form.Item label="Тривалість" name='availabilityDuration' rules={[{ required: true, message: 'Будь ласка, введіть тривалість!'}]} initialValue={membershipType.availabilityDurationInMonths}>
                            <Input placeholder="Введіть тривалість" type='number' min={1} />
                        </Form.Item>
                      : <Form.Item label="Тривалість" name='availabilityDuration' rules={[{ required: true, message: 'Будь ласка, введіть тривалість!'}]}>
                            <Input placeholder="Введіть тривалість" type='number' min={1} />
                        </Form.Item>}
                        
                {membershipType != null 
                      ? <Form.Item label='Можливий час початку тренувань' name='workoutStartTime' rules={[{ required: true, message: 'Будь ласка, введіть час!'}]}  initialValue={membershipType.workoutStartTime.slice(0, 5)}>
                            <Input placeholder="Введіть час"/>
                        </Form.Item>
                      : <Form.Item label='Можливий час початку тренувань' name='workoutStartTime' rules={[{ required: true, message: 'Будь ласка, введіть час!'}]} >
                            <Input placeholder="Введіть час"/>
                        </Form.Item>}
                
                {membershipType != null 
                      ? <Form.Item label='Можливий час закінчення тренувань' name='workoutEndTime' rules={[{ required: true, message: 'Будь ласка, введіть час!'}]}  initialValue={membershipType.workoutEndTime.slice(0, 5)}>
                            <Input placeholder="Введіть час"/>
                        </Form.Item>
                      : <Form.Item label='Можливий час закінчення тренувань' name='workoutEndTime' rules={[{ required: true, message: 'Будь ласка, введіть час!'}]} >
                            <Input placeholder="Введіть час"/>
                        </Form.Item>}
                
                {membershipType != null
                      ? <Form.Item label="Види спорту" name='sportTypes'>
                            <Select placeholder="Оберіть види спорту" mode="multiple" onChange={values => setSelectedSportTypes(values)} defaultValue={membershipType.sportTypes.map(x => x.id)}>
                                {sportTypes?.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)} 
                            </Select>
                        </Form.Item>
                      : <Form.Item label="Види спорту" name='sportTypes' rules={[{ required: true, message: 'Будь ласка, оберіть види спорту!'}]}>
                            <Select placeholder="Оберіть види спорту" mode="multiple" onChange={values => setSelectedSportTypes(values)}>
                                {sportTypes?.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)} 
                            </Select>
                        </Form.Item>}

                <Button type="primary" htmlType="submit" className="create-button">
                    {membershipType == null ? 'Створити' : 'Оновити'}
                </Button>
            </Form>
        </div>
        </>
    )
}

export default MembershipTypeForm;