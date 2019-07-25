import React, { useState, useEffect } from 'react';
import { Table, Field, Control, Input, Label, Select, Section, Container } from 'bloomer';
import dataAPI from '../modules/dataAPI'

export default function Logs() {
  // Allows the following states to be used within this functional component
  const [logs, setLogs] = useState(null)
  const [filter, setFilter] = useState('')
  const [filteredLogs, setFilteredLogs] = useState(null)
  const [searchBy, setSearchBy] = useState('User ID')
  //  Filter by action feature currently not working and is not a core feature.
  // const [filteredBy, setFilteredBy] = useState('All')

  // When component successfully mounts fetch the logs
  useEffect(() => {
    dataAPI.get('/logs').then(response => {
      // Sort the retrieved logs by their time
      // This is necessary since mongo stores them in reverse order
      let sortedLogs = response.data.sort((a, b) => {
        return parseInt(new Date(b.time).getTime()) - parseInt(new Date(a.time).getTime());
      });
      // Set the log states to the new logs
      setLogs(sortedLogs);
      setFilteredLogs(sortedLogs);
    })
  }, []);

  // Loading message to be rendered while the fetching is not yet complete
  function loading() {
    return (
      <tr><td colSpan="3">Loading...</td></tr>
    )
  }

  // Applies a filter to the logs state based on which search by drop down is selected and what the user puts into the search bar.
  function updateFilter(e) {
    // Sets the filter state, however the filter state can not be used on the same tic it is set without problems
    // So the e.target.value is used instead for the rest of this function
    setFilter(e.target.value)
    if (searchBy === 'User ID') {
      setFilteredLogs(logs.filter(log => log.user.includes(e.target.value)))
    }
    else if (searchBy === 'Time') {
      setFilteredLogs(logs.filter(log => (new Date(log.time).toUTCString()).includes(e.target.value)))
    }
  }
  // function updateFilteredBy(value) {
  //   setFilteredBy(value)
  // }

  // Sets the search by state to value selected in the drop down.
  function updateSearchBy(value) {
    setSearchBy(value)
  }

  // Renders a row for each log entry
  function renderData(data) {
     return (data.map((log, index) => {
      // Deconstructs the log object into its time, action and user
      var { time, action, user, extra } = log
      return (
        // Index of the log in the logs array used as a unique key for that log's row.
        <tr key={index}>
          <td>{new Date(time).toUTCString()}</td>
          <td>{action}</td>
          <td>{user}</td>
          <td>{extra}</td>
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
        {/* <Field isGrouped>
          <Label>Actions:</Label>
          <Control>
            <Select value={filteredBy} onChange={(e) => updateFilteredBy(e.target.value)}>
              <option>All</option>
              <option>New</option>
              <option>Update</option>
              <option>Delete</option>
            </Select>
          </Control>
        </Field> */}
        <Table isBordered isStriped>
          <thead>
            <tr>
              <th >Time</th>
              <th>Action</th>
              <th>User</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
          {/* Checks if the logs are loaded yet and either renders loading or the logs as appropriate */}
            {!filteredLogs ? loading() : renderData(filteredLogs)}
          </tbody>
        </Table>
      </Container>
    </Section>
  );
}
