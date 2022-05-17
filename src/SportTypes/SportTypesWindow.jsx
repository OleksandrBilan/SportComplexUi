import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button, Card } from 'antd';
import { apiPath } from "../App";
import '../Customers/customers.css';

const SportTypesWindow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navEmployee = location.state.navEmployee;
    const employee = location.state.employee ?? navEmployee;
    const [sportTypes, setSportTypes] = useState();
    const [reload, setReload] = useState();

    useEffect(() => {
        axios.get(apiPath + 'sportType/getAll').then(response => {
            setSportTypes(response.data);
        });
    }, [reload])

    const onDelete = (e, id) => {
        e.preventDefault();
        if (window.confirm('Ви впевнені, що хочете видалити цей вид спорту?')) {
            axios.delete(apiPath + 'sportType/delete?id=' + id).then(() => {
                setReload(reload + 1);
            });
        }
    }

    return (
        <>
        <Navbar employee={navEmployee} />
        <div className='cards'>
            {sportTypes?.map(c => 
                <Card style={{ width: 250 }} hoverable title={c.name} 
                      onClick={() => {navigate('/editSportType', {state: {sportType: c, navEmployee: navEmployee}})}}
                      onContextMenu={e => onDelete(e, c.id)} />)}
        </div>
        <Button type="primary" className="new-group-btn" onClick={() => navigate('/createSportType', {state: {navEmployee: navEmployee, employee: employee}})}>
            Створити новий запис
        </Button>
        </>
    )
}

export default SportTypesWindow;