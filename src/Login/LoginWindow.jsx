import React from "react";
import {Form, Input, Button} from 'antd';
import 'antd/dist/antd.css';
import './login.css';
import axios from "axios";
import { apiPath } from "../App";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const onFinish = values => {
        console.log(values)

        axios.post(apiPath + 'employee/login', {
            login: values.login,
            password: values.password
        }).then(response => {
            console.log(response)
            navigate('/personalInfo', {state: {employee: response.data}})
        }).catch(error => {
            alert("Неправильно введені логін або пароль!");
        });
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <Form
                    name="login-form"
                    onFinish={onFinish}
                >
                    <h1 className="form-title">Вхід до системи</h1>

                    <Form.Item
                    name="login"
                    rules={[{ required: true, message: 'Будь ласка, введіть ваш логін!' }]}
                    >
                        <Input
                            placeholder="Логін"
                        />
                    </Form.Item>
        
                    <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Будь ласка, введіть ваш пароль!' }]}
                    >
                        <Input.Password 
                            placeholder="Пароль"
                        />
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Увійти
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;