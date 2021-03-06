import React, { useState } from 'react';
import './sidenav.css';
import {
  Button
} from 'reactstrap';

class SideNavManager extends React.Component {

  render(){
    return (
      <div className="SideNavBar">
        <div className="Button-Padding">
          <Button className="NavButton" href="/homeManager">My Home</Button>
        </div>
        <div className="Button-Padding">
          <Button className="NavButton" href="/createProject">Create Project</Button>
        </div>
        <div className="Button-Padding">
          <Button className="NavButton" href="/viewProjectManager">My Projects</Button>
        </div>
        <div className="Button-Padding">
          <Button className="NavButton" href="/profileManager">My profile</Button>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton" href="/billingManager">Billing</Button>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton" href="/managerUpload">Upload Files</Button>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton" href="/notificationManager">My Notifications</Button>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton" href="/bugtrackerManager">Bug Tracker</Button>
        </div>
        {/*
        <div className="Button-Padding">
          <Button className="NavButton" href="/applications"> Applications</Button>
        </div>
        */}
        <div className="Button-Padding">
          <Button className="NavButton" href="/projectOperation"> Project Operation</Button>
        </div>
        <div className="Button-Padding">
          <Button className="NavButton" href="/allocateDeviceManager">Allocate Device</Button>
        </div>
        <div className="Button-Padding">
          <Button className="NavButton" href="/deallocateDeviceManager">Deallocate Device</Button>
        </div>
        <div className="Button-Padding">
          <Button className="NavButton" href="/dashboardManager">Dashboard</Button>
        </div>
        <div className="Button-Padding">
          <Button className="NavButton" href="/">Log Out</Button>
        </div>
      </div>
    )}

}

export default SideNavManager;
