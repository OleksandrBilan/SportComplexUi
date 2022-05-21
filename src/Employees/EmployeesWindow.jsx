import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button, Table } from 'antd';
import { apiPath, coachPostionId } from "../App";

const EmployeesWindow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navEmployee = location.state.navEmployee;
    const [dataSource, setDataSource] = useState();
    const [employees, setEmployees] = useState();

    useEffect(() => {
        axios.get(apiPath + 'employee/getAll').then(response => {
            let tempEmployees = response.data;

            axios.get(apiPath + 'coach/getAll').then(response => {
                
                axios.get(apiPath + 'coach/individualCoaches').then(indResponse => {
                    tempEmployees.filter(e => e.position.id == coachPostionId).forEach(e => {
                        let coach = response.data.filter(c => c.employeeInfo.id == e.id)[0];
                        let indCoach = indResponse.data.filter(ic => ic.coachInfo.id == coach?.id)[0];
                        if (indCoach != null) {
                            e.position.name += ', Індивідуальний';
                        }
                    })

                    let tempDataSource = []
                    tempEmployees.forEach(e => {
                        tempDataSource.push({
                            key: e.id,
                            name: e.firstName + ' ' + e.lastName,
                            login: e.login,
                            position: e.position.name,
                            hireDate: new Date(e.hireDate).toLocaleDateString(),
                            dismissDate: e.dismissDate == null ? 'Н/З' : new Date(e.dismissDate).toLocaleDateString(),
                            gym: e.gym.city.name + ', ' + e.gym.address
                        })
                    });
        
                    setEmployees(tempEmployees);
                    setDataSource(tempDataSource);
                })
            })
        });
    }, [])

    const columns = [
        {
            title: "Ім'я",
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: "Логін",
            dataIndex: 'login',
            key: 'login'
        },
        {
            title: 'Посада',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Дата найму',
            dataIndex: 'hireDate',
            key: 'hireDate'
        },
        {
            title: 'Дата звільнення',
            dataIndex: 'dismissDate',
            key: 'dismissDate'
        },
        {
            title: 'Зал',
            dataIndex: 'gym',
            key: 'gym'
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
                    navigate('/personalInfo', {
                        state: {
                            employee: employees[rowIndex],
                            navEmployee: navEmployee
                        }
                    })
                }
            };
          }}
        />
        <Button type="primary" className="new-group-btn" onClick={() => navigate('/createEmployee', {state: {navEmployee: navEmployee}})}>
            Додати працівника
        </Button>
        </>
    )
}

export default EmployeesWindow;