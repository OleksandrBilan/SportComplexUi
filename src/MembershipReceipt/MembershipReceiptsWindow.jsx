import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import './memReceipts.css';
import axios from "axios";
import { Button, Table } from 'antd';
import { apiPath } from "../App";

const MembershipReceiptsWindow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [dataSource, setDataSource] = useState();
    const [receipts, setReceipts] = useState();

    useEffect(() => {
        axios.get(apiPath + 'membershipReceipt/getAll').then(response => {
            let tempReceipts = response.data;

            let tempDataSource = []
            tempReceipts.forEach(r => {
                tempDataSource.push({
                    key: r.id,
                    customer: r.customer.firstName + ' ' + r.customer.lastName,
                    seller: r.seller.firstName + ' ' + r.seller.lastName,
                    membershipType: r.membershipType.name,
                    payementDateTime: new Date(r.payementDateTime).toLocaleDateString()
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

    return (
        <>
        <Navbar employee={navEmployee} />
        <Table 
        dataSource={dataSource} 
        columns={columns}
        pagination={{ pageSize: 9 }}
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
    )
}

export default MembershipReceiptsWindow;