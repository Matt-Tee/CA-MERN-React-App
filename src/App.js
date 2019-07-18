import React from 'react';
import Points from './components/Points';
import Logs from './components/Logs';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import GreenbotNavbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Route path="/" component={GreenbotNavbar} />
        <Route path="/point_tables" component={Points} />
        <Route path="/logs" component={Logs} />
      </div>
    </Router>
  );
}

export default App;
