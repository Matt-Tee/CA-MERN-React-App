import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Points from './components/Points';
import Logs from './components/Logs';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import GreenbotNavbar from './components/Navbar';


const routing = (
    <Router>
        <div>
            <Route path="/" component={GreenbotNavbar} />
            <Route path="/point_tables" component={Points} />
            <Route path="/logs" component={Logs} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));