import React, {useState, Component} from 'react';
import Points from './components/Points';
import Logs from './components/Logs';
import { Route, BrowserRouter as Router, Link,  } from 'react-router-dom'
import GreenbotNavbar from './components/Navbar';
import TakeParams from './TakeParams'
import Administrators from './components/Administrators'
import DiscordButton from './components/DiscordButton'
import cookie from 'react-cookie'


function readCookie() {
  return cookie.load('authorized')
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={props => authed ? (
      <Component {...props} />
    ) : (
      <Redirect to="/api/discord/login" />
    )
  } /> )
}

function App() {
  const [authed, setAuthed] = useState(readCookie)

  const setNewAuthed = (isAuthed) => {
    setAuthed(isAuthed)
  }

  return (
    <Router>
      <Route path="/" component={GreenbotNavbar} />
      <PrivateRoute path="/point_tables" component={Points} />
      <PrivateRoute path="/logs" component={Logs} />
      <PrivateRoute path="/administrators" component={Administrators} />
      <Route exact path='/api/discord/login' render={() => (
        <div style={{display: 'none'}}>
          {window.location = `http://localhost:5000/api/discord/login`}
        </div>
      )}/>
      <Route path="/api/discord/confirmed/:token" render={(props) => <TakeParams {...props} setAuthed={setNewAuthed} /> } />
    </Router>
  )
}

export default App;
