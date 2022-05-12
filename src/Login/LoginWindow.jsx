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
        axios.post(apiPath + 'employee/login', {
            login: values.login,
            password: values.password
        }).then(response => {
            navigate('/personalInfo', {state:response.data})
        }).catch(error => {
            alert("Wrong credentials!");
        });
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <Form
                    name="login-form"
                    onFinish={onFinish}
                >
                    <h1 className="form-title">Sign In</h1>

                    <Form.Item
                    name="login"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            placeholder="Login"
                        />
                    </Form.Item>
        
                    <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password 
                            placeholder="Password"
                        />
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;