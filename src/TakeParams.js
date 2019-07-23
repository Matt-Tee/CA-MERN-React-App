import React from 'react';
import {Redirect } from 'react-router-dom'
import cookie from 'react-cookie'

const jwt = require('jsonwebtoken')

function TakeParams(props) {
  if (jwt.verify(props.match.params.token, 'superSecretKey').authorized == true) {
    cookie.save('authorized', true, { maxAge: 60000, path: '/', domain: ".elated-lovelace-d9b735.netlify.com"})
    props.setAuthed(true)
    return (
      <h2>AUthed</h2>
    )
  } else {
    return (
      <Redirect to='/point_tables' />
    )
  }
}

export default TakeParams;
