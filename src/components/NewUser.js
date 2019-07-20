import React, { useState } from 'react';
import { Field, Label, FieldBody, Control, Input, Button } from 'bloomer'
import 'bulma'
import axios from 'axios'
const dataAPI = axios.create({ baseURL: 'https://stormy-tundra-35633.herokuapp.com/' });


function NewUser(props) {

  const [userId, setUserId] = useState('')
  const [username, setUsername] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    dataAPI.post('/users', {
      user_id: userId,
      username: username,
      points: 1
    }).then(response => {
      // send a refresh here
      props.getAllUsers()
      })
      .catch(error => {
        //handle error
        console.log('this is a error');
      })
  }

  const handleUserIdChange = (event) => {
    let state = [...userId]
    state = event.target.value
    setUserId(state)
  }

  const handleUsernameChange = (event) => {
    let state = [...username]
    state = event.target.value
    setUsername(state)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field>
        <Label>New User</Label>
      </Field>
      <FieldBody>
        <Field isGrouped>
          <Control isExpanded hasIcons={['left', 'right']}>
            <Input placeholder='User Id' value={userId} onChange={handleUserIdChange} style={{ maxWidth: '250px'}}/>
            <Input placeholder='Username' value={username} name='userame' onChange={handleUsernameChange} style={{ maxWidth: '250px'}} />
          </Control>
        </Field>
      </FieldBody>
      <Control>
        <Button onClick={handleSubmit}>Submit</Button>
      </Control>
    </form>
  )
}

export default NewUser
