import React, {useState} from 'react';
import Points from './components/Points';
import Logs from './components/Logs';
import { Route, BrowserRouter as Router, Link, Redirect } from 'react-router-dom'
import GreenbotNavbar from './components/Navbar';
import TakeParams from './TakeParams'
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
      {authed ? (
        <div>
          <Route path="/" component={GreenbotNavbar} />
          <Route path="/point_tables" component={Points} />
          <Route path="/logs" component={Logs} />
        </div>
      ) : (
        <div>
          <Link to="/api/discord/login"><button>Take me to discord</button></Link>
          <Route exact path='/api/discord/login' render={() => window.location = `https://stormy-tundra-35633.herokuapp.com/api/discord/login`} />
          <Route path="/api/discord/confirmed/:token" render={(props) => <TakeParams {...props} setAuthed={setNewAuthed} /> } />
        </div>
      )}
    </Router>
  )
}

export default App;
