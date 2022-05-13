import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button, Table } from 'antd';
import { apiPath } from "../App";

const IndividualTrainingsWindow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [dataSource, setDataSource] = useState();
    const [individualTrainings, setIndTrainings] = useState();

    useEffect(() => {
        axios.get(apiPath + 'individualTraining/getAll').then(response => {
            let tempIndTrainings = response.data;   

            let tempDataSource = [];
            tempIndTrainings.forEach(it => {
                tempDataSource.push({
                    key: it.id,
                    customer: it.membershipReceipt.customer.firstName + ' ' + it.membershipReceipt.customer.lastName,
                    coach: it.coach.coachInfo.employeeInfo.firstName + ' ' + it.coach.coachInfo.employeeInfo.lastName,
                    price: it.price,
                    payedHours: it.payedHours,
                    payementDateTime: new Date(it.payementDateTime).toLocaleString()
                })
            });

            axios.get(apiPath + 'coach/getByEmployeeId', {params: {employeeId: employee.id}}).then(response => {
                let coach = response.data;
    
                if (coach != null) {
                    tempIndTrainings = tempIndTrainings.filter(g => g.coach.id == coach.id);
                }
    
                let tempDataSource = [];
                tempIndTrainings.forEach(it => {
                    tempDataSource.push({
                        key: it.id,
                        customer: it.membershipReceipt.customer.firstName + ' ' + it.membershipReceipt.customer.lastName,
                        coach: it.coach.coachInfo.employeeInfo.firstName + ' ' + it.coach.coachInfo.employeeInfo.lastName,
                        price: it.price,
                        payedHours: it.payedHours,
                        payementDateTime: new Date(it.payementDateTime).toLocaleString()
                    })
                });
    
                setIndTrainings(tempIndTrainings);
                setDataSource(tempDataSource);
            }).catch(error => {
                setIndTrainings(tempIndTrainings);
                setDataSource(tempDataSource);
            });
        });
    }, [])

    const columns = [
        {
            title: 'Клієнт',
            dataIndex: 'customer',
            key: 'customer'
        },
        {
            title: 'Тренер',
            dataIndex: 'coach',
            key: 'coach'
        },
        {
            title: 'Ціна',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Оплачені години',
            dataIndex: 'payedHours',
            key: 'payedHours'
        },
        {
            title: 'Час оплати',
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
                    navigate('/individualTraining', {
                        state: {
                            individualTraining: individualTrainings[rowIndex], 
                            navEmployee: navEmployee,
                            employee: employee
                        }
                    })
                }
            };
          }}
        />
        <Button type="primary" className="new-group-btn" onClick={() => navigate('/createIndividualTraining', {state: {navEmployee: navEmployee, employee: employee}})}>
            Створити новий запис
        </Button>
        </>
    )
}

export default IndividualTrainingsWindow;