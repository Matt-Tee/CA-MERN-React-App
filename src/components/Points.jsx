import React, { useState, useEffect } from 'react';
import { Container, Section, Table, Button, Field, Control, Input, Label, Select } from 'bloomer';
import NewUser from './NewUser'
import dataAPI from '../modules/dataAPI'

export default function Points() {

  // Enables these states to be used in this functional component
  const [users, setUsers] = useState(null)
  const [newPoints, setNewPoints] = useState([])
  const [filter, setFilter] = useState('')
  const [searchBy, setSearchBy] = useState('Username')
  const [filteredUsers, setFilteredUsers] = useState(null)

  // Fetch all user data
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
    // dataAPI.get('/').then(response => { setUsers(response.data);
    // setFilteredUsers(response.data) })

    // setUsers([{user_id: 12335, username: 'bob', points: 5},{user_id: 35790, username: 'sarah', points: 12},{user_id: 734623, username: 'tommy', points: 7},{user_id: 67236, username: 'nub nub', points: 1},{user_id: 235789342, username: 'samuel', points: 3}])
  }, []);

  // Loading message to be rendered while the fetching is not yet complete
  function loading() {
    return (
      <tr><td colSpan="5">Loading...</td></tr>
    )
  }

  // A sorting function designed to sort the users by their Points in the database
  function sortByPoints(e) {
    // Stop the button from refreshing the page
    e.preventDefault();
    // Create a new array of users and sort that by having the higher point values be lower in index.
    let sortedUsers = [].concat(users).sort((a, b) => {
      return parseInt(b.points) - parseInt(a.points);
    });
    // Set the users state to this new sorted array so that when the filter function is called the results are still sorted.
    setUsers(sortedUsers);
    // Passes the sorted users through a filter function to ensure that both the sort and the filter are applied at the same time.
    sortFilter(sortedUsers);
  }

  function sortById(e) {
    // Stop the button from refreshing the page
    e.preventDefault();
    // Create a new array of users and sort that by having the lower user ids be lower in index.
    let sortedUsers = [].concat(users).sort((a, b) => {
      return parseInt(a.user_id) - parseInt(b.user_id);
    });
    // Set the users state to this new sorted array so that when the filter function is called the results are still sorted.
    setUsers(sortedUsers);
    // Passes the sorted users through a filter function to ensure that both the sort and the filter are applied at the same time.
    sortFilter(sortedUsers);
  }

  // A sorting function designed to sort the users by their usernames
  function sortByUsername(e) {
    // Stop the button from refreshing the page
    e.preventDefault();
    // Create a new array of users and sort that by comparing the words of the usernames. This is actually case insensitive.    
    let sortedUsers = [].concat(users).sort((a, b) => {
      return a.username.localeCompare(b.username);
    });
    // Set the users state to this new sorted array
    setUsers(sortedUsers);
    // Passes the sorted users through a filter function to ensure that both the sort and the filter are applied at the same time.
    sortFilter(sortedUsers);
  }

  // Deletes a user from the database
  const deleteUser = async (event, user_id) => {
    // Stop the button from refreshing the page    
    event.preventDefault()
    // Asks for confirmation before ending someones career
    const confirmation = window.confirm("are you sure you want to ruin this man's whole career?")
    // If confirmed, deletes the user permanently and updates the users state 
    if (confirmation) {
      await dataAPI.delete(`/users/${user_id}`)
      getAllUsers()
    }
  }
  
  // Updates the points of a user to the input amount and updates the users state.
  const updatePoints = async (event, index, user_id,) => {
    // Stop the button from refreshing the page    
    event.preventDefault()
    // Since the API takes in an amount to add or subtract from the points database, some maths happens first to make sure the amount typed is the amount the points are set to.
    await dataAPI.patch(`/users/${user_id}/points`, {
      points: ((0-users[index].points) + parseInt(newPoints[index]))
    })
    // Update the user state 
    getAllUsers()
  }

  // Handles changes made to the points forms
  const handleChange = (event, index) => {
    // Makes an array out of the newPoints state for ease of editing
    let state = [...newPoints]
    // Changes the value of the new points that match the index of the user it was entered for 
    state[index] = event.target.value
    // Update the state with the new changes
    setNewPoints(state)
  }

  // Applies a filter to the users state based on which search by drop down is selected and what has been typed into the search bar.
  function updateFilter(e) {
    // Sets the filter state, however the filter state can not be used on the same tic it is set without problems
    // So the e.target.value is used instead for the rest of this function
    setFilter(e.target.value)
    if (searchBy === 'Username') {
      // Updates the filtered users state
      setFilteredUsers(users.filter(user => user.username.includes(e.target.value)))
    }
    else if (searchBy === 'ID') {
      // Updates the filtered users state
      setFilteredUsers(users.filter(user => user.user_id.includes(e.target.value)))
    }
  }

  // Filters the sorted data by the value of the filter
  // Is only called from within the sort functions to make sure that the sorted array is filtered before rendering.
  function sortFilter(sortedData){
    if (searchBy === 'Username') {
      setFilteredUsers(sortedData.filter(user => user.username.includes(filter)))
    }
    else if (searchBy === 'ID') {
      setFilteredUsers(sortedData.filter(user => user.user_id.includes(filter)))
    }
  }

  // Sets the search by state to value selected in the drop down.
  function updateSearchBy(value){
    setSearchBy(value)
  }

  // Renders a row of data for each user.
  function renderData(data) {
    return (data.map((user, index) => {
      // Deconstructs the user object into the Id, points and Username
      const { user_id, username, points } = user
      return (
        // Index of the user in the users array used as a unique key for that user's row.
        <tr key={index}>
          <td>{user_id}</td>
          <td>{username}</td>
          <td>{points}</td>
          {/* Adds a button for deleting the user detailed in this row  */}
          <td><button onClick={(event) => deleteUser(event, user_id)}>X</button></td>
          <td>
          {/* Form for updating a user's points */}
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
          {/* Checks if the users have been fetched yet and either renders loading or the users as appropriate */}
            {!filteredUsers ? loading() : renderData(filteredUsers)}
          </tbody>
        </Table>
        <NewUser getAllUsers={getAllUsers} user='User' uri='users'/>
      </Container>
    </Section>
  );
}
