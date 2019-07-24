import React, { useState, useEffect } from 'react';
import { Table, Field, Control, Input, Label, Select, Section, Container } from 'bloomer';
import dataAPI from '../modules/dataAPI'

export default function Logs() {
  const [logs, setLogs] = useState(null)
  const [filter, setFilter] = useState('')
  const [filteredLogs, setFilteredLogs] = useState(null)
  const [searchBy, setSearchBy] = useState('User ID')
  const [filteredBy, setFilteredBy] = useState('All')

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

  function updateFilter(e) {
    setFilter(e.target.value)
    if (searchBy === 'User ID') {
      setFilteredLogs(logs.filter(log => log.user.includes(e.target.value)))
    }
    else if (searchBy === 'Time') {
      setFilteredLogs(logs.filter(log => (new Date(log.time).toUTCString()).includes(e.target.value)))
    }
  }

  function updateFilteredBy(value) {
    setFilteredBy(value)
  }

  function updateSearchBy(value) {
    setSearchBy(value)
  }

  function renderData(data) {
    console.log(data)
    let dataToRender = data
     if (!filteredBy == 'All') {dataToRender = data.filter(d => d.action.includes(filteredBy.toLowerCase()))}
     return (dataToRender.map((log, index) => {
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
    <Section>
      <Container>
        <Field isGrouped>
          <Control>
            <Input type="text" value={filter} onChange={(e) => updateFilter(e)} />
          </Control>
          <Label>Search by:</Label>
          <Control>
            <Select value={searchBy} onChange={(e) => updateSearchBy(e.target.value)}>
              <option>User ID</option>
              <option>Time</option>
            </Select>
          </Control>
        </Field>
        <Field isGrouped>
          <Label>Actions:</Label>
          <Control>
            <Select value={filteredBy} onChange={(e) => updateFilteredBy(e.target.value)}>
              <option>All</option>
              <option>New</option>
              <option>Update</option>
              <option>Delete</option>
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
      </Container>
    </Section>
  );
}
