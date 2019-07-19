import React, {useState} from 'react';
import Points from './components/Points';
import Logs from './components/Logs';
import { Route, BrowserRouter as Router, Link, Redirect } from 'react-router-dom'
import GreenbotNavbar from './components/Navbar';
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

  // useEffect() {
  //   setNewAuthed(readCookie)
  // }

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
          <Route path='/' render={() => window.location = `https://stormy-tundra-35633.herokuapp.com//api/discord/login`} />
          <Route exact path="/api/discord/confirmed" render={() => {setNewAuthed(readCookie)}} />

        </div>
      )}
    </Router>
  )
}

export default App;
