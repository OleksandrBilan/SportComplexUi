import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button, Table } from 'antd';
import { apiPath } from "../App";

const GroupTrainingsWindow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [dataSource, setDataSource] = useState();
    const [groupTrainings, setGroupTrainings] = useState();

    useEffect(() => {
        axios.get(apiPath + 'groupTraining/getAll').then(response => {
            let tempTrainings = response.data;   

            let tempDataSource = [];
            tempTrainings.forEach(it => {
                tempDataSource.push({
                    key: it.id,
                    customer: it.receipt.customer.firstName + ' ' + it.receipt.customer.lastName,
                    sportSection: it.group.sportSection.name,
                    coach: it.group.coach.employeeInfo.firstName + ' ' + it.group.coach.employeeInfo.lastName,
                    startDateTime: new Date(it.startDateTime).toLocaleDateString() + ', ' + new Date(it.startDateTime).toLocaleTimeString().slice(0, 5)
                })
            });

            axios.get(apiPath + 'coach/getByEmployeeId', {params: {employeeId: employee.id}}).then(response => {
                let coach = response.data;
    
                if (coach != null) {
                    tempTrainings = tempTrainings.filter(g => g.group.coach.id == coach.id);
                }
    
                let tempDataSource = [];
                tempTrainings.forEach(it => {
                    tempDataSource.push({
                        key: it.id,
                        customer: it.receipt.customer.firstName + ' ' + it.receipt.customer.lastName,
                        sportSection: it.group.sportSection.name,
                        coach: it.group.coach.employeeInfo.firstName + ' ' + it.group.coach.employeeInfo.lastName,
                        startDateTime: new Date(it.startDateTime).toLocaleDateString() + ', ' + new Date(it.startDateTime).toLocaleTimeString().slice(0, 5)
                    })
                });
    
                setGroupTrainings(tempTrainings);
                setDataSource(tempDataSource);
            }).catch(error => {
                setGroupTrainings(tempTrainings);
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
            title: 'Секція',
            dataIndex: 'sportSection',
            key: 'sportSection',
        },
        {
            title: 'Тренер',
            dataIndex: 'coach',
            key: 'coach'
        },
        {
            title: 'Час початку тренування',
            dataIndex: 'startDateTime',
            key: 'startDateTime'
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
                    navigate('/groupTraining', {
                        state: {
                            groupTraining: groupTrainings[rowIndex], 
                            navEmployee: navEmployee,
                            employee: employee
                        }
                    })
                }
            };
          }}
        />
        <Button type="primary" className="new-group-btn" onClick={() => navigate('/createGroupTraining', {state: {navEmployee: navEmployee, employee: employee}})}>
            Створити новий запис
        </Button>
        </>
    )
}

export default GroupTrainingsWindow;