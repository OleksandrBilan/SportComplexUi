import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button, Table } from 'antd';
import { apiPath } from "../App";

const EmployeesWindow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [dataSource, setDataSource] = useState();
    const [employees, setEmployees] = useState();

    useEffect(() => {
        axios.get(apiPath + 'employee/getAll').then(response => {
            let tempEmployees = response.data;

            let tempDataSource = []
            tempEmployees.forEach(e => {
                tempDataSource.push({
                    key: e.id,
                    name: e.firstName + ' ' + e.lastName,
                    login: e.login,
                    position: e.position.name,
                    hireDate: new Date(e.hireDate).toLocaleDateString(),
                    dismissDate: e.dismissDate == null ? 'Н/З' : new Date(e.dismissDate).toLocaleDateString(),
                    city: e.gym.city.name,
                    address: e.gym.address
                })
            });

            setEmployees(tempEmployees);
            setDataSource(tempDataSource);
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
            title: 'Місто',
            dataIndex: 'city',
            key: 'city'
        },
        {
            title: 'Адреса',
            dataIndex: 'address',
            key: 'address'
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