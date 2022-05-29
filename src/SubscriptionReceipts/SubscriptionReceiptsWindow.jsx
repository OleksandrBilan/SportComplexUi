import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button, Table, Checkbox, DatePicker, Form } from 'antd';
import { apiPath } from "../App";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import '../MembershipReceipts/memReceipts.css';

const SubscriptionReceiptsWindow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [dataSource, setDataSource] = useState();
    const [receipts, setReceipts] = useState();
    const [sportSections, setSportSections] = useState();
    const [showChart, setShowChart] = useState(false);
    const [chartData, setChartData] = useState({labels: [], datasets: [{data: []}]});

    useEffect(() => {
        axios.get(apiPath + 'sportSection/getAll').then(response => {
            setSportSections(response.data);
        })

        axios.get(apiPath + 'subscriptionReceipt/getAll').then(response => {
            let tempReceipts = response.data;

            let tempDataSource = []
            tempReceipts.forEach(r => {
                tempDataSource.push({
                    key: r.id,
                    customer: r.customer.firstName + ' ' + r.customer.lastName,
                    seller: r.seller.firstName + ' ' + r.seller.lastName,
                    sportSection: r.subscriptionType.sportSection.name,
                    isPayed: r.isPayed ? 'Так' : 'Ні',
                    isActive: r.isActive ? 'Так' : 'Ні'
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
            debugger
            if (dataArr[r.subscriptionType.sportSection.name] != null) {
                ++dataArr[r.subscriptionType.sportSection.name];
            } else {
                dataArr[r.subscriptionType.sportSection.name] = 1;
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
            title: 'Спортивна секція',
            dataIndex: 'sportSection',
            key: 'sportSection',
        },
        {
            title: 'Оплачений',
            dataIndex: 'isPayed',
            key: 'isPayed'
        },
        {
            title: 'Активний',
            dataIndex: 'isActive',
            key: 'isActive'
        }
    ]

    return (
        <>
        <Navbar employee={navEmployee} />
        <Checkbox className="check" onChange={e => {setShowChart(e.target.checked); calculateChart(new Array(sportSections.length).fill(0))}}>Статистика продажів</Checkbox>
        {showChart ?
            <Bar data={chartData} /> :
            <>
            <Table 
            dataSource={dataSource} 
            columns={columns}
            pagination={false}
            onRow={(record, rowIndex) => {
                return {
                    onClick: event => {
                        navigate('/subscriptionReceipt', {
                            state: {
                                subscriptionReceipt: receipts[rowIndex],
                                navEmployee: navEmployee,
                                employee: employee
                            }
                        })
                    }
                };
            }}
            />
            <Button type="primary" className="new-group-btn" onClick={() => navigate('/createSubscriptionReceipt', {state: {navEmployee: navEmployee, employee: employee}})}>
                Створити новий запис
            </Button>
            </>
        }
        </>
    )
}

export default SubscriptionReceiptsWindow;