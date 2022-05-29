import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import './memReceipts.css';
import axios from "axios";
import { Button, Table, Checkbox, DatePicker, Form } from 'antd';
import { apiPath } from "../App";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const MembershipReceiptsWindow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [dataSource, setDataSource] = useState();
    const [receipts, setReceipts] = useState();
    const [memTypes, setMemTypes] = useState();
    const [showChart, setShowChart] = useState(false);
    const [chartData, setChartData] = useState({labels: [], datasets: [{data: []}]});

    useEffect(() => {
        let dataArr = [];

        axios.get(apiPath + 'membershipType/getAll').then(response => {
            setMemTypes(response.data);
            dataArr = new Array(response.data.length).fill(0);
        })

        axios.get(apiPath + 'membershipReceipt/getAll').then(response => {
            let tempReceipts = response.data;

            let tempDataSource = []
            tempReceipts.forEach(r => {
                tempDataSource.push({
                    key: r.id,
                    customer: r.customer.firstName + ' ' + r.customer.lastName,
                    seller: r.seller.firstName + ' ' + r.seller.lastName,
                    membershipType: r.membershipType.name,
                    payementDateTime: new Date(r.payementDateTime).toLocaleDateString() + ', ' + new Date(r.payementDateTime).toLocaleTimeString()
                })
            });
    
            setReceipts(tempReceipts);
            setDataSource(tempDataSource);

            calculateChart();
        });
    }, [])

    const calculateChart = () => {
        let dataArr = {};

        receipts.forEach(r => {
            if (dataArr[r.membershipType.name] != null) {
                ++dataArr[r.membershipType.name];
            } else {
                dataArr[r.membershipType.name] = 1;
            }
        });

        let temp = {
            labels: Object.keys(dataArr),
            datasets: [{
                label: 'Продажі групових абонементів',
                data: Object.values(dataArr),
                backgroundColor: 'rgb(54, 162, 235)'
            }],
        };

        setChartData(temp);
    }

    const columns = [
        {
            title: 'Клієнт',
            dataIndex: 'customer',
            key: 'customer'
        },
        {
            title: 'Продавець',
            dataIndex: 'seller',
            key: 'seller'
        },
        {
            title: 'Абонемент',
            dataIndex: 'membershipType',
            key: 'membershipType',
        },
        {
            title: 'Дата оплати',
            dataIndex: 'payementDateTime',
            key: 'payementDateTime'
        }
    ]
    
    const onFinish = values => {
        let dataArr = new Array(memTypes.length).fill(0);

        if (values.startDate != null && values.endDate != null) {
            receipts.forEach(r => {
                if (new Date(r.payementDateTime) >= values.startDate && new Date(r.payementDateTime) <= values.endDate)
                    ++dataArr[r.membershipType.id - 1]
            });
        } else {
            if (values.startDate != null) {
                receipts.forEach(r => {
                    if (new Date(r.payementDateTime) >= values.startDate)
                        ++dataArr[r.membershipType.id - 1]
                });
            } else {
                if (values.endDate != null) {
                    receipts.forEach(r => {
                        if (new Date(r.payementDateTime) <= values.endDate)
                            ++dataArr[r.membershipType.id - 1]
                    }); 
                } else {
                    receipts.forEach(r => {
                        ++dataArr[r.membershipType.id - 1]
                    });
                }
            }
        }

        let temp = {
            labels: memTypes.map(mt => mt.name),
            datasets: [{
                label: 'Продажі загальних абонементів',
                data: dataArr,
                backgroundColor: 'rgb(54, 162, 235)'
            }],
        };

        setChartData(temp);
    }

    return (
        <>
        <Navbar employee={navEmployee} />
        <Checkbox className="check" onChange={e => setShowChart(e.target.checked)}>Статистика продажів</Checkbox>
        {showChart ?
            <>
            <div className="bar-form">
            <Form onFinish={onFinish}>
                <Form.Item label='Дата початку продажів' name='startDate'>
                    <DatePicker placeholder="Оберіть дату"/>
                </Form.Item>
                <Form.Item label='Дата закінчення продажів' name='endDate'>
                    <DatePicker placeholder="Оберіть дату"/>
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Обрахувати
                </Button>
            </Form>
            </div>
            <Bar data={chartData} />
            </> :
            <>
            <Table 
            dataSource={dataSource} 
            columns={columns}
            pagination={false}
            onRow={(record, rowIndex) => {
                return {
                    onClick: event => {
                        navigate('/membershipReceipt', {
                            state: {
                                membershipReceipt: receipts[rowIndex],
                                navEmployee: navEmployee,
                                employee: employee
                            }
                        })
                    }
                };
            }}
            />
            <Button type="primary" className="new-group-btn" onClick={() => navigate('/createMembershipReceipt', {state: {navEmployee: navEmployee, employee: employee}})}>
                Створити новий запис
            </Button>
            </>
        }
        </>
    )
}

export default MembershipReceiptsWindow;