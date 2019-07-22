import React, {useState} from 'react';
import Points from './components/Points';
import Logs from './components/Logs';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom'
import GreenbotNavbar from './components/Navbar';
import TakeParams from './TakeParams'
import Administrators from './components/Administrators'
import DiscordButton from './components/DiscordButton'
import cookie from 'react-cookie'


function readCookie() {
  return cookie.load('authorized')
}

function App() {
  const [authed, setAuthed] = useState(readCookie)

  const setNewAuthed = (isAuthed) => {
    setAuthed(isAuthed)
  }

  return (
    <Router>
    <Route path="/" component={GreenbotNavbar} />
      {authed ? (
        <div>
          <Route path="/point_tables" component={Points} />
          <Route path="/logs" component={Logs} />
          <Route path="/administrators" component={Administrators} />
        </div>
      ) : (
        <div>
          <a href="https://elated-lovelace-d9b735.netlify.com/api/discord/login"><DiscordButton /></a>
          <Route path="/api/discord/confirmed/:token" render={(props) => <TakeParams {...props} setAuthed={setNewAuthed} /> } />
        </div>
      )}
    </Router>
  )
}

export default App;
