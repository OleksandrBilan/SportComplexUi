import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import './groups.css';
import axios from "axios";
import { Table } from 'antd';
import { apiPath } from "../App";

const GroupsWindow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const employee = location.state.employee;
    const [dataSource, setDataSource] = useState();
    const [groups, setGroups] = useState();

    useEffect(() => {
        axios.get(apiPath + 'group/getAll').then(response => {
            let tempGroups = response.data;   
            
            let tempDataSource = [];
            response.data.forEach(g => {
                tempDataSource.push({
                    key: g.id,
                    sportSection: g.sportSection.name,
                    coach: g.coach.employeeInfo.firstName + ' ' + g.coach.employeeInfo.lastName,
                    maxCustomersCount: g.maxCustomersCount,
                    startDate: g.startDate.split('T')[0],
                    endDate: g.endDate.split('T')[0]
                })
            });

            setGroups(tempGroups);
            setDataSource(tempDataSource);

            axios.get(apiPath + 'coach/getByEmployeeId', {params: {employeeId: employee.id}}).then(response => {
                let coach = response.data;
    
                if (coach != null) {
                    let temp = tempGroups.filter(g => g.coach.id == coach.id);
    
                    let tempDataSource = []
                    temp.forEach(g => {
                        tempDataSource.push({
                            key: g.id,
                            sportSection: g.sportSection.name,
                            coach: g.coach.employeeInfo.firstName + ' ' + g.coach.employeeInfo.lastName,
                            maxCustomersCount: g.maxCustomersCount,
                            startDate: g.startDate.split('T')[0],
                            endDate: g.endDate.split('T')[0]
                        })
                    });
    
                    setGroups(temp);
                    setDataSource(tempDataSource);
                }
            }).catch(error => {});
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
        <Navbar employee={employee} />
        <Table 
        dataSource={dataSource} 
        columns={columns}
        onRow={(record, rowIndex) => {
            return {
                onClick: event => {
                    navigate('/group', {
                        state: {
                            group: groups[rowIndex], 
                            employee: employee
                        }
                    })
                }
            };
          }}
        />
        </>
    )
}

export default GroupsWindow;