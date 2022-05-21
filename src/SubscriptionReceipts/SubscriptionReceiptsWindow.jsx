import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button, Table } from 'antd';
import { apiPath } from "../App";

const SubscriptionReceiptsWindow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [dataSource, setDataSource] = useState();
    const [receipts, setReceipts] = useState();

    useEffect(() => {
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
        });
    }, [])

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
    )
}

export default SubscriptionReceiptsWindow;