import React, {useState, Component, Fragment} from 'react';
import Points from './components/Points';
import Logs from './components/Logs';
import { Route, BrowserRouter as Router, Link, Redirect  } from 'react-router-dom'
import GreenbotNavbar from './components/Navbar';
import TakeParams from './TakeParams'
import Administrators from './components/Administrators'
import DiscordButton from './components/DiscordButton'
import cookie from 'react-cookie'
import Routes from './routes'


function readCookie() {
  return cookie.load('authorized')
}


function App() {
  const [authed, setAuthed] = useState(readCookie)

  const setNewAuthed = (isAuthed) => {
    setAuthed(isAuthed)
  }

  return (
    <Routes authed={authed} setNewAuthed={setNewAuthed}/>
  )
}

export default App;
