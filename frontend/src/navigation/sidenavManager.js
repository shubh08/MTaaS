import React, { useState } from 'react';
import './sidenav.css';
import {
  Button
} from 'reactstrap';

class SideNavManager extends React.Component {

  render(){
    return (
      <div className="App-header">
        <div className="Button-Padding">
          <Button className="NavButton" href="/createProject">Create Project</Button>
        </div>
        <div className="Button-Padding">
          <Button className="NavButton" href="/profileManager">My profile</Button>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton" href="/notificationManager">My Notifications</Button>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton" href="/applications"> Applications</Button>
        </div>
      </div>
    )}

}

export default SideNavManager;
