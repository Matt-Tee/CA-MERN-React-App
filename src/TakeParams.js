import React from 'react';
import {Redirect } from 'react-router-dom'
import cookie from 'react-cookie'

const cValue = cookie.load('rememberme')

function TakeParams(props) {
  if (cValue == 1) {
    props.setNewAuthed(true)
    return (
      <Redirect to='/' />
    )
  } else {
    console.log(cValue);
  }
  return null
}




export default TakeParams;
