import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import './groups.css';
import axios from "axios";
import { Button, Table } from 'antd';
import { apiPath } from "../App";

const GroupsWindow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [dataSource, setDataSource] = useState();
    const [groups, setGroups] = useState();

    useEffect(() => {
        axios.get(apiPath + 'group/getAll').then(response => {
            let tempGroups = response.data;

            let tempDataSource = []
            tempGroups.forEach(g => {
                tempDataSource.push({
                    key: g.id,
                    sportSection: g.sportSection.name,
                    coach: g.coach.employeeInfo.firstName + ' ' + g.coach.employeeInfo.lastName,
                    maxCustomersCount: g.maxCustomersCount,
                    startDate: new Date(g.startDate).toLocaleDateString(),
                    endDate: new Date(g.endDate).toLocaleDateString()
                })
            });

            axios.get(apiPath + 'coach/getByEmployeeId', {params: {employeeId: employee.id}}).then(response => {
                let coach = response.data;
    
                if (coach != null) {
                    tempGroups = tempGroups.filter(g => g.coach.id == coach.id);
                }
    
                let tempDataSource = []
                tempGroups.forEach(g => {
                    tempDataSource.push({
                        key: g.id,
                        sportSection: g.sportSection.name,
                        coach: g.coach.employeeInfo.firstName + ' ' + g.coach.employeeInfo.lastName,
                        maxCustomersCount: g.maxCustomersCount,
                        startDate: new Date(g.startDate).toLocaleDateString(),
                        endDate: new Date(g.endDate).toLocaleDateString()
                    })
                });
    
                setGroups(tempGroups);
                setDataSource(tempDataSource);
            }).catch(error => {
                setGroups(tempGroups);
                setDataSource(tempDataSource);
            });
        });
    }, [])

    const columns = [
        {
            title: 'Спортивна секція',
            dataIndex: 'sportSection',
            key: 'sportSection'
        },
        {
            title: 'Тренер',
            dataIndex: 'coach',
            key: 'coach'
        },
        {
            title: 'Максимальна кількість відвідувачів',
            dataIndex: 'maxCustomersCount',
            key: 'maxCustomersCount',
        },
        {
            title: 'Дата початку занять',
            dataIndex: 'startDate',
            key: 'startDate'
        },
        {
            title: 'Дата закінчення занять',
            dataIndex: 'endDate',
            key: 'endDate'
        }
    ]

    return (
        <>
        <Navbar employee={navEmployee} />
        <Table 
        dataSource={dataSource} 
        columns={columns}
        onRow={(record, rowIndex) => {
            return {
                onClick: event => {
                    navigate('/group', {
                        state: {
                            group: groups[rowIndex],
                            navEmployee: navEmployee,
                            employee: employee
                        }
                    })
                }
            };
          }}
        />
        <Button type="primary" className="new-group-btn" onClick={() => navigate('/createGroup', {state: {navEmployee: navEmployee, employee: employee}})}>
            Створити нову групу
        </Button>
        </>
    )
}

export default GroupsWindow;