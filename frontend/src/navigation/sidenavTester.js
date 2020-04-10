import React, { useState } from 'react';
import './sidenav.css';
import {
  Button
} from 'reactstrap';

class SideNavTester extends React.Component {

  render(){
    return (
      <div className="App-header">
        <div className="Button-Padding">
          <Button className="NavButton" href="/homeTester">My Home</Button>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton" href="/profileTester">My profile</Button>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton" href="/createRunTester">Create Run</Button>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton" href="/notificationTester">My Notifications</Button>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton" href="/bugtracker">Bug Tracker</Button>
        </div>

      </div>
    )}

}

export default SideNavTester;
