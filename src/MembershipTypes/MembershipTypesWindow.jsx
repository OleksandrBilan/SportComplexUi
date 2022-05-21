import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button, Table, Tag } from 'antd';
import { apiPath } from "../App";

const MembershipTypesWindow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [dataSource, setDataSource] = useState();
    const [memTypes, setMemTypes] = useState();

    useEffect(() => {
        axios.get(apiPath + 'membershipType/getAll').then(response => {
            let tempMemTypes = response.data;

            let tempDataSource = [];
            tempMemTypes.forEach(it => {
                tempDataSource.push({
                    key: it.id,
                    name: it.name,
                    price: it.price,
                    availabilityDuration: it.availabilityDurationInMonths,
                    workoutTime: it.workoutStartTime.slice(0, 5) + ' - ' + it.workoutEndTime.slice(0, 5),
                    sportTypes: it.sportTypes.map(st => <Tag color='blue'>{st.name}</Tag>)
                })
            });

            setMemTypes(tempMemTypes);
            setDataSource(tempDataSource);
        });
    }, [])

    const columns = [
        {
            title: 'Назва',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Ціна',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Кількість місяців',
            dataIndex: 'availabilityDuration',
            key: 'availabilityDuration'
        },
        {
            title: 'Можливий час занять',
            dataIndex: 'workoutTime',
            key: 'workoutTime'
        },
        {
            title: 'Можливі види спорту',
            dataIndex: 'sportTypes',
            key: 'sportTypes'
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
                    navigate('/membershipType', {
                        state: {
                            membershipType: memTypes[rowIndex], 
                            navEmployee: navEmployee,
                            employee: employee
                        }
                    })
                }
            };
          }}
        />
        <Button type="primary" className="new-group-btn" onClick={() => navigate('/createMembershipType', {state: {navEmployee: navEmployee, employee: employee}})}>
            Створити новий запис
        </Button>
        </>
    )
}

export default MembershipTypesWindow;