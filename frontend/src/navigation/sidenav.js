import React, { useState } from 'react';
import './sidenav.css';
import {
  Button
} from 'reactstrap';

class SideNav extends React.Component {

  render(){
    return (
      <div className="App-header">
        <div className="Button-Padding">
          <Button className="NavButton" href="/home">Project Management</Button>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton" href="/bugtracker">Bug Tracker</Button>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton" href="/messages">Account</Button>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton" href='/listPage'>Tests</Button>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton" href="/profile">Run Tracker</Button>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton" href="/dashboard">Admin</Button>
        </div>
      </div>
    )}

}

export default SideNav;
