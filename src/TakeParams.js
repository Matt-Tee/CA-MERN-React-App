import React from 'react';
import {Redirect } from 'react-router-dom'
import cookie from 'react-cookie'

const jwt = require('jsonwebtoken')

function TakeParams(props) {
  if (jwt.verify(props.match.params.token, 'superSecretKey').authorized == true) {
    cookie.save('authorized', true, { maxAge: 60000, path: '/', domain: ".serene-crag-19981.herokuapp.com"})
    props.setAuthed(true)
    return (
      <Redirect to='/point_tables' />
    )
  } else {
    return (
      <h2>Not AUthed</h2>
    )
  }
}

export default TakeParams;
