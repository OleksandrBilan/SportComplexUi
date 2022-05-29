import { Form, Select, Input, DatePicker, Button, Checkbox } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPath, coachPostionId, managerPositionId } from "../App";
import Navbar from "../Navbar/Navbar";
import moment from 'moment';

const { Option } = Select;

const EmployeeForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const employee = location.state.employee;
    const navEmployee = location.state.navEmployee;
    const [positions, setPositions] = useState();
    const [gyms, setGyms] = useState();
    const [selectedPosition, setSelectedPosition] = useState(employee?.position?.id);
    const [sportTypes, setSportTypes] = useState();
    const [coach, setCoach] = useState();
    const [selectedSportTypes, setSelectedSportTypes] = useState();
    const [canBeIndividual, setCanBeIndividual] = useState(false);

    useEffect(() => {
        axios.get(apiPath + 'employee/getPositionTypes').then(response => {
            setPositions(response.data);
        })

        axios.get(apiPath + 'gym/getAll').then(response => {
            setGyms(response.data);
        })

        axios.get(apiPath + 'sportType/getAll').then(response => {
            setSportTypes(response.data);
        })

        if (employee != null && employee.position.id == coachPostionId) {
            axios.get(apiPath + 'coach/getByEmployeeId', {params: {employeeId: employee.id}}).then(response => {
                setCoach(response.data);
                let temp = response.data;

                axios.get(apiPath + 'coach/individualCoaches').then(response => {
                    let ind = response.data.filter(i => i.coachInfo.id == temp.id);

                    if (ind != null && ind.length == 1) {
                        setCanBeIndividual(true);
                        temp.pricePerHour = ind[0].pricePerHour;
                    }

                    setCoach(temp);
                }).catch(error => {})
            });
        }
    }, [])

    const onFinish = values => {
        let tempEmployee = {
            id: employee?.id,
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            hireDate: values.hireDate.format('YYYY-MM-DD'),
            dismissDate: values.dismissDate.format('YYYY-MM-DD'),
            login: values.login,
            password: values.password,
            positionId: values.position,
            gymId: values.gym
        };

        let tempCoach = null;
        if (selectedPosition == coachPostionId || coach != null) {
            tempCoach = {
                id: coach?.id,
                employeeId: employee?.id,
                description: values.description,
                sportTypeIds: selectedSportTypes ?? coach.sportTypes.map(st => st.id),
                canBeIndividual: canBeIndividual,
                pricePerHour: values.pricePerHour
            }
        }

        let createdEmployee = null;
        if (employee == null) {
            axios.post(apiPath + 'employee/create', tempEmployee).then(response => {
                createdEmployee = response.data;
                
                if (selectedPosition == coachPostionId) {
                    tempCoach.employeeId = createdEmployee.id;
                    axios.post(apiPath + 'coach/create', tempCoach);
                }

                navigate('/employees', {state: {navEmployee: navEmployee, employee: employee}});
            }).catch(error => {
                alert('Помилка створення!');
            })
        }
        else {
            axios.put(apiPath + 'employee/update', tempEmployee).then(response => {
                if (selectedPosition == coachPostionId || coach != null) {
                    axios.put(apiPath + 'coach/update', tempCoach);
                }

                navigate('/employees', {state: {navEmployee: navEmployee, employee: employee}});
            }).catch(error => {
                alert('Помилка оновлення!');
            })
        }
    }

    return (
        <>
        <Navbar employee={navEmployee} />
        <div className="group-form">
            <Form onFinish={onFinish}>           
                {employee != null 
                      ? <Form.Item label="Ім'я" name='firstName' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]} initialValue={employee.firstName}>
                            <Input placeholder="Введіть ім'я"/>
                        </Form.Item>
                      : <Form.Item label="Ім'я" name='firstName' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]}>
                            <Input placeholder="Введіть ім'я"/>
                        </Form.Item>}

                {employee != null 
                      ? <Form.Item label="Прізвище" name='lastName' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]} initialValue={employee.lastName}>
                            <Input placeholder="Введіть прізвище"/>
                        </Form.Item>
                      : <Form.Item label="Прізвище" name='lastName' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]}>
                            <Input placeholder="Введіть прізвище"/>
                        </Form.Item>}

                {employee != null 
                    ? <Form.Item label="Номер телефону" name='phoneNumber' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]} initialValue={employee.phoneNumber}>
                        <Input placeholder="Введіть номер телефону"/>
                    </Form.Item>
                    : <Form.Item label="Номер телефону" name='phoneNumber' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]}>
                        <Input placeholder="Введіть номер телефону"/>
                    </Form.Item>}

                {employee != null 
                      ? <Form.Item label='Дата найму' name='hireDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]} initialValue={moment(employee.hireDate)}>
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>
                      : <Form.Item label='Дата найму' name='hireDate' rules={[{ required: true, message: 'Будь ласка, оберіть дату!'}]} >
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>}
                
                {employee != null 
                      ? <Form.Item label='Дата звільнення' name='dismissDate' initialValue={moment(employee.dismissDate)}>
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>
                      : <Form.Item label='Дата звільнення' name='dismissDate'>
                            <DatePicker placeholder="Оберіть дату"/>
                        </Form.Item>}

                {employee != null 
                      ? <Form.Item label="Логін" name='login' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]} initialValue={employee.login}>
                            <Input placeholder="Введіть логін"/>
                        </Form.Item>
                      : <Form.Item label="Логін" name='login' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]}>
                            <Input placeholder="Введіть логін"/>
                        </Form.Item>}

                {employee != null 
                    ? <Form.Item label="Пароль" name='password' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]} initialValue={employee.password}>
                          <Input placeholder="Введіть пароль" type="password" />
                      </Form.Item>
                    : <Form.Item label="Пароль" name='password' rules={[{ required: true, message: 'Будь ласка, введіть значення!'}]}>
                          <Input placeholder="Введіть пароль" type="password" />
                      </Form.Item>}

                {employee != null 
                      ? <Form.Item label="Спортзал" name='gym' rules={[{ required: true, message: 'Будь ласка, оберіть спортзал!'}]} initialValue={employee.gym.id}>
                            <Select placeholder="Оберіть спортзал">
                                {gyms?.map(s => <Option value={s.id}>{s.city.name + ', ' + s.address}</Option>)} 
                            </Select>
                        </Form.Item>
                      : <Form.Item label="Спортзал" name='gym' rules={[{ required: true, message: 'Будь ласка, оберіть спортзал!'}]}>
                            <Select placeholder="Оберіть спортзал">
                                {gyms?.map(s => <Option value={s.id}>{s.city.name + ', ' + s.address}</Option>)} 
                            </Select>
                        </Form.Item>}
                
                {employee != null 
                      ? <Form.Item label="Посада" name='position' rules={[{ required: true, message: 'Будь ласка, оберіть посаду!'}]} initialValue={employee.position.id}>
                            <Select placeholder="Оберіть посаду" onSelect={(value, e) => setSelectedPosition(value)}>
                                {positions?.map(c => <Option value={c.id}>{c.name}</Option>)} 
                            </Select>
                        </Form.Item>
                      : <Form.Item label="Посада" name='position' rules={[{ required: true, message: 'Будь ласка, оберіть посаду!'}]}>
                            <Select placeholder="Оберіть посаду" onSelect={(value, e) => setSelectedPosition(value)}>
                                {positions?.map(c => <Option value={c.id}>{c.name}</Option>)} 
                            </Select>
                        </Form.Item>}

                {selectedPosition == coachPostionId 
                    ? 
                    <>
                    {coach != null
                        ? <Form.Item label="Види спорту" name='sportTypes'>
                              <Select placeholder="Оберіть види спорту" mode="multiple" onChange={values => setSelectedSportTypes(values)} defaultValue={coach.sportTypes.map(x => x?.id)}>
                                  {sportTypes?.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)} 
                              </Select>
                          </Form.Item>
                        : <Form.Item label="Види спорту" name='sportTypes' rules={[{ required: true, message: 'Будь ласка, оберіть види спорту!'}]}>
                              <Select placeholder="Оберіть види спорту" mode="multiple" onChange={values => setSelectedSportTypes(values)}>
                                  {sportTypes?.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)} 
                              </Select>
                          </Form.Item>}
                    
                    {coach != null
                        ? <Form.Item label="Опис" name='description' rules={[{ required: true, message: 'Будь ласка, оберіть введіть значення!'}]} initialValue={coach.description}>
                              <Input.TextArea placeholder="Введіть опис" size="large" />
                          </Form.Item>
                        : <Form.Item label="Опис" name='description' rules={[{ required: true, message: 'Будь ласка, оберіть введіть значення!'}]}>
                              <Input.TextArea placeholder="Введіть опис" size="large" />
                          </Form.Item>}

                    <Form.Item name='canBeIndividual'>
                        <Checkbox onChange={e => setCanBeIndividual(e.target.checked)} checked={canBeIndividual}>
                            Індивідуальний
                        </Checkbox>
                    </Form.Item>

                    {canBeIndividual == true && coach != null
                        ? <Form.Item label='Ціна за годину' name='pricePerHour' rules={[{ required: true, message: 'Будь ласка, оберіть введіть значення!'}]} initialValue={coach.pricePerHour}>
                              <Input type='number' />
                          </Form.Item>
                        : canBeIndividual == true &&
                          <Form.Item label='Ціна за годину' name='pricePerHour' rules={[{ required: true, message: 'Будь ласка, оберіть введіть значення!'}]}>
                              <Input type='number' />
                          </Form.Item>}
                    </>
                    : null}

                <Button type="primary" htmlType="submit" className="create-button">
                    {employee == null ? 'Створити' : 'Оновити'}
                </Button>
            </Form>
        </div>
        </>
    )
}

export default EmployeeForm;