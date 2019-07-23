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
  const [authed, setAuthed] = useState(true)

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
          <Route path="/api/discord/confirmed/:token" render={(props) => <TakeParams {...props} setAuthed={setNewAuthed} /> } />
        </div>
      ) : (
        <div>
          <Link to="/api/discord/login"><DiscordButton /></Link>
          <Route exact path='/api/discord/login' render={() => (
            <div style={{display: 'none'}}>
              {window.location = `https://stormy-tundra-35633.herokuapp.com/api/discord/login`}
            </div>
          )}/>
          <Route path="/api/discord/confirmed/:token" render={(props) => <TakeParams {...props} setAuthed={setNewAuthed} /> } />
        </div>
      )}
    </Router>
  )
}

export default App;
