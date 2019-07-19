import React, {useState} from 'react';
import Points from './components/Points';
import Logs from './components/Logs';
import { Route, BrowserRouter as Router, Link, Redirect } from 'react-router-dom'
import GreenbotNavbar from './components/Navbar';
import TakeParams from './TakeParams'
import cookie from 'react-cookie'


function readCookie() {
  const cValue = cookie.load('rememberme')
  if (cValue == 1) {
    return true
  } else {
    return false
  }
}

function App() {
  const [authed, setAuthed] = useState(readCookie)

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
          <Route path='/' render={() => window.location = `http://localhost:5000/api/discord/login`} />
          <Route exact path="/api/discord/confirmed" render={(props) => <TakeParams {...props} setAuthed={setNewAuthed} />} />
        </div>
      )}
    </Router>
  )
}

export default App;
