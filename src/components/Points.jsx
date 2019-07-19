import React, { useState, useEffect } from 'react';
import { Table, Button } from 'bloomer';
import bulma from 'bulma';
import axios from 'axios';
const dataAPI = axios.create({ baseURL: 'https://stormy-tundra-35633.herokuapp.com/' });


export default function Points() {

  const [users, setUsers] = useState(null)

  useEffect(() => {
    dataAPI.get('/').then(response => { setUsers(response.data) })
    // setUsers([{user_id: 12335, username: 'bob', points: 5},{user_id: 35790, username: 'sarah', points: 12},{user_id: 734623, username: 'tommy', points: 7},{user_id: 67236, username: 'nubnub', points: 1},{user_id: 235789342, username: 'samuel', points: 3}])
  }, []);

  function loading() {
    return (
      <tr><td colSpan="3">Loading...</td></tr>
    )
  }

  function sortByPoints(e) {
    e.preventDefault();

    let sortedUsers = [].concat(users).sort((a, b) => {
      return parseInt(b.points) - parseInt(a.points);
    });
    console.log(sortedUsers)

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

  function renderData(data) {

    return (data.map((user, index) => {
      const { user_id, username, points } = user
      return (
        <tr key={index}>
          <td>{user_id}</td>
          <td>{username}</td>
          <td>{points}</td>
        </tr>
      )
    }))
  }

  return (
    <div>
     <Button isColor="primary" onClick={sortById}>ID</Button>
     <Button isColor="primary" onClick={sortByUsername}>Username</Button>
     <Button isColor="primary" onClick={sortByPoints}>Points</Button>
      <Table isBordered isStriped>
        <thead>
          <tr>
            <th >ID</th>
            <th>Username</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {!users ? loading() : renderData(users)}
        </tbody>
      </Table>
    </div>
  );
}
