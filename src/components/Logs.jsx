import React, { useState, useEffect } from 'react';
import { Table, Field, Control, Input, Label, Select } from 'bloomer';
import bulma from 'bulma';
import axios from 'axios';
const dataAPI = axios.create({ baseURL: 'https://stormy-tundra-35633.herokuapp.com/' });

export default function Logs() {
  const [logs, setLogs] = useState(null)
  const [filter, setFilter] = useState('')
  const [filteredLogs, setFilteredLogs] = useState(null)
  const [searchBy, setSearchBy] = useState('User ID')

  useEffect(() => {
    dataAPI.get('/logs').then(response => {
      let sortedLogs = response.data.sort((a, b) => {
        return parseInt(new Date(b.time).getTime()) - parseInt(new Date(a.time).getTime());
      });
      setLogs(sortedLogs);
      setFilteredLogs(sortedLogs);
    })
  }, []);

  function loading() {
    return (
      <tr><td colSpan="3">Loading...</td></tr>
    )
  }

  function updateFilter(e){
    setFilter(e.target.value)
    if (searchBy === 'User ID'){
    setFilteredLogs(logs.filter(log => log.user.includes(e.target.value)))}
    else if (searchBy === 'Time'){
    setFilteredLogs(logs.filter(log => (new Date(log.time).toUTCString()).includes(e.target.value)))
    }
  }
  
  function updateSearchBy(value){
    setSearchBy(value)
  }

  function renderData(data) {
    console.log(data)
    return (data.map((log, index) => {
      var { time, action, user } = log
      return (
        <tr key={index}>
          <td>{new Date(time).toUTCString()}</td>
          <td>{action}</td>
          <td>{user}</td>
        </tr>
      )
    }))
  }

  return (
    <div>
      <Field isGrouped>
        <Control>
          <Input type="text" value={filter} onChange={(e) => updateFilter(e)}/>
        </Control>
        <Label>Search by:</Label>
        <Control>
          <Select value={searchBy} onChange={(e) => updateSearchBy(e.target.value)}>
            <option>User ID</option>
            <option>Time</option>
          </Select>
        </Control>
      </Field>
      <Table isBordered isStriped>
        <thead>
          <tr>
            <th >Time</th>
            <th>Action</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {!filteredLogs ? loading() : renderData(filteredLogs)}
        </tbody>
      </Table>
    </div>
  );
}
