import React, { useState } from 'react';
import { Button, Checkbox, Divider, Form, Input, message, notification } from 'antd';
import './register.scss';
import { useNavigate } from 'react-router-dom';
import { callRegister } from '../../services/api'
const RegisterPage = () => {

    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { fullName, email, password, phone } = values;
        const res = await callRegister(fullName, email, password, phone);
        if (res?.data?._id) {
            message.success('Account registration successful!');
            navigate('/login')
        } else {
            notification.error({
                message: "An error occurred",
                description:
                    res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5
            })
        }
    };



    return (
        <div className="register-page">
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Register new account</h2>
                            <Divider />
                        </div>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Full Name:"
                                name="fullName"
                                rules={[{ required: true, message: 'Please input your full name!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Email:"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password:"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Phone:"
                                name="phone"
                                rules={[{ required: true, message: 'Please input your phone!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default RegisterPage;