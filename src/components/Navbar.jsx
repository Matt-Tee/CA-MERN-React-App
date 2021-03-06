import React from 'react';
import {Navbar, NavbarBrand, NavbarItem} from 'bloomer';
import { NavbarStart } from 'bloomer/lib/components/Navbar/NavbarStart';
import greenheart from '../images/greenheart.png'
import {Link} from 'react-router-dom'

export default function GreenbotNavbar() {
    return (
        <div>
            <Navbar style={{ background: '#000000', margin: '0' }}>
                <NavbarBrand>
                    <NavbarItem hasTextColor='white'>
                        <img src={greenheart} alt='I Love GreenBot' style={{ marginRight: 5 }} />Greenbot
                    </NavbarItem>
                </NavbarBrand>
                <NavbarStart>
                    <NavbarItem hasTextColor='white'>
                      <Link to="/point_tables" >Point Tables</Link>
                    </NavbarItem>
                    <NavbarItem hasTextColor='white'>
                      <Link to="/logs">Activity Logs</Link>
                    </NavbarItem>
                    <NavbarItem>
                      <Link to="/administrators">Administrators</Link>
                    </NavbarItem>
                </NavbarStart>
            </Navbar>
        </div>
    );
}
