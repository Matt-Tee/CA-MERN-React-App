import React, { useState, useEffect } from 'react';
import { Icon, Container, Section, FieldLabel, FieldBody, Table, Button, Field, Control, Input, Label, Select } from 'bloomer';
import NewUser from './NewUser'
import bulma from 'bulma';
import axios from 'axios';
const dataAPI = axios.create({ baseURL: 'https://stormy-tundra-35633.herokuapp.com/' });


export default function Points() {

  const [users, setUsers] = useState(null)
  const [newPoints, setNewPoints] = useState([])
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

  useEffect(() => {
    getAllUsers()
    // dataAPI.get('/').then(response => { setUsers(response.data);
    // setFilteredUsers(response.data) })

    // setUsers([{user_id: 12335, username: 'bob', points: 5},{user_id: 35790, username: 'sarah', points: 12},{user_id: 734623, username: 'tommy', points: 7},{user_id: 67236, username: 'nubnub', points: 1},{user_id: 235789342, username: 'samuel', points: 3}])
  }, []);

  function loading() {
    return (
      <tr><td colSpan="5">Loading...</td></tr>
    )
  }

  function sortByPoints(e) {
    e.preventDefault();

    let sortedUsers = [].concat(users).sort((a, b) => {
      return parseInt(b.points) - parseInt(a.points);
    });
    setUsers(sortedUsers);
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
      await dataAPI.delete(`/users/${user_id}`)
      getAllUsers()
    }
  }

  const updatePoints = async (event, index, user_id,) => {
    event.preventDefault()
    await dataAPI.patch(`/users/${user_id}/points`, {
      points: ((0-users[index].points) + parseInt(newPoints[index]))
    })
    getAllUsers()
  }

  const handleChange = (event, index) => {
    let state = [...newPoints]
    state[index] = event.target.value
    setNewPoints(state)
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
      const { user_id, username, points } = user
      return (
        <tr key={index}>
          <td>{user_id}</td>
          <td>{username}</td>
          <td>{points}</td>
          <td><button onClick={(event) => deleteUser(event, user_id, index)}>X</button></td>
          <td>
            <form onSubmit={(event) => updatePoints(event, index, user_id)}>
              <input style={{width: '100px'}} value={newPoints[index]} onChange={(event) => handleChange(event, index)}/>
            </form>
          </td>
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
        <Button isColor="primary" onClick={sortByPoints}>Points</Button>
        <Table isBordered isStriped>
          <thead>
            <tr>
              <th >ID</th>
              <th>Username</th>
              <th>Points</th>
              <th>Delete</th>
              <th>Update Points</th>
            </tr>
          </thead>
          <tbody>
            {!filteredUsers ? loading() : renderData(filteredUsers)}
          </tbody>
        </Table>
        <NewUser getAllUsers={getAllUsers}/>
      </Container>
    </Section>
  );
}
