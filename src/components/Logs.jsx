import React, { useState, useEffect } from 'react';
import { Table } from 'bloomer';
import bulma from 'bulma';
import axios from 'axios';
const dataAPI = axios.create({ baseURL: 'https://stormy-tundra-35633.herokuapp.com/' });

export default function Logs() {
  const [logs, setLogs] = useState(null)

  useEffect(() => {
    dataAPI.get('/logs').then(response => { setLogs(response.data.sort((a, b) => {
      return parseInt(new Date(b.time).getTime()) - parseInt(new Date(a.time).getTime());
    })) })
  }, []);

  function loading() {
    return (
      <tr><td colSpan="3">Loading...</td></tr>
    )
  }

  function renderData() {
    let data = logs;
    return (data.map((log, index) => {
      const { time, action, user } = log
      return (
        <tr key={index}>
          <td>{time}</td>
          <td>{action}</td>
          <td>{user}</td>
        </tr>
      )
    }))
  }

  return (
    <div>
      <Table isBordered isStriped>
        <thead>
          <tr>
            <th >Time</th>
            <th>Action</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {!logs ? loading() : renderData()}
        </tbody>
      </Table>
    </div>
  );
}
