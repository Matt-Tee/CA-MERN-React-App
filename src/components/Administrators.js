import React, { useState, useEffect } from 'react';
import { Container, Section, Table, Button, Field, Control, Input, Label, Select } from 'bloomer';
import NewUser from './NewUser'
let dataAPI = require('../modules/dataAPI')

// const dataAPI = axios.create({ baseURL: 'http://localhost:5000/authUsers' });
function Administrators() {

  const [users, setUsers] = useState(null)
  const [filter, setFilter] = useState('')
  const [searchBy, setSearchBy] = useState('Username')
  const [filteredUsers, setFilteredUsers] = useState(null)

  const getAllUsers = () => {
    dataAPI.get('/')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data)
      }
    )
  }

  // When component loads get the users!
  useEffect(() => {
    getAllUsers()
    // testing data
    // setUsers([{user_id: 12335, username: 'bob', points: 5},{user_id: 35790, username: 'sarah', points: 12},{user_id: 734623, username: 'tommy', points: 7},{user_id: 67236, username: 'nubnub', points: 1},{user_id: 235789342, username: 'samuel', points: 3}])
  }, []);

  function loading() {
    return (
      <tr><td colSpan="5">Loading...</td></tr>
    )
  }

  function sortById(e) {
    e.preventDefault();
    let sortedUsers = [].concat(users).sort((a, b) => {
      return parseInt(a.user_id) - parseInt(b.user_id);
    });
    setUsers(sortedUsers);
  }

  function sortByUsername(e) {
    e.preventDefault();
    let sortedUsers = [].concat(users).sort((a, b) => {
      return a.username.localeCompare(b.username);
    });
    setUsers(sortedUsers);
  }

  const deleteUser = async (event, user_id, index) => {
    event.preventDefault()
    const confirmation = window.confirm("are you sure you want to ruin this man's whole career?")
    if (confirmation) {
      await dataAPI.delete(`/${user_id}`)
      getAllUsers()
    }
  }

  function updateFilter(e) {
    setFilter(e.target.value)
    if (searchBy === 'Username') {
      setFilteredUsers(users.filter(user => user.username.includes(e.target.value)))
    }
    else if (searchBy === 'ID') {
      setFilteredUsers(users.filter(user => user.user_id.includes(e.target.value)))
    }
  }

  function updateSearchBy(value){
    setSearchBy(value)
  }

  function renderData(data) {
    return (data.map((user, index) => {
      const { user_id, username} = user
      return (
        <tr key={index}>
          <td>{user_id}</td>
          <td>{username}</td>
          <td><button onClick={(event) => deleteUser(event, user_id, index)}>X</button></td>
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
              <option>Username</option>
              <option>ID</option>
            </Select>
          </Control>
        </Field>

        <Button isColor="primary" onClick={sortById}>ID</Button>
        <Button isColor="primary" onClick={sortByUsername}>Username</Button>
        <Table isBordered isStriped>
          <thead>
            <tr>
              <th >ID</th>
              <th>Username</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {!filteredUsers ? loading() : renderData(filteredUsers)}
          </tbody>
        </Table>
        <NewUser getAllUsers={getAllUsers} user='Admin' uri='authUsers'/>
      </Container>
    </Section>
  )
}

export default Administrators
