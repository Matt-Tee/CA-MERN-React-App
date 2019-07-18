import React, {useState, useEffect} from 'react';
import { Table } from 'bloomer';
import bulma from 'bulma';
import axios from 'axios';
const dataAPI = axios.create({ baseURL: 'https://stormy-tundra-35633.herokuapp.com/' });


export default function Points() {

  const [users, setUsers] = useState(null)

  useEffect(() => {
      dataAPI.get('/').then(response => {setUsers(response.data)})
  },[]);

  function loading(){
    return(
      <tr>Loading...</tr>
    )
  }
    
  function renderData(data){
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
      <Table isBordered isStriped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {!users ? loading():renderData(users)}
        </tbody>
      </Table>
    </div>
  );
}
