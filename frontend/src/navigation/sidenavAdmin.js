import React, { useState } from 'react';
import './sidenavAdmin.css';
import {
  Button
} from 'reactstrap';

class SideNavAdmin extends React.Component {

  render(){
    return (
      <div className="SideNavBar">

        <div className="Button-Padding">
          <Button className="NavButton" href="/homeAdmin">My Home</Button>
        </div>
        <div className="Button-Padding">
          <Button className="NavButton" href="/profileAdmin">My profile</Button>
        </div>
        <div className="Button-Padding">
          <Button className="NavButton" href="/billingAdmin">Billing</Button>
        </div>
        <div className="Button-Padding">
          <Button className="NavButton" href="/userManagement">User Management</Button>
        </div>
        <div className="Button-Padding">
          <Button className="NavButton" href="/loadAdminFiles">Browse Application Documents</Button>
        </div>
        <div className="Button-Padding">
          <Button className="NavButton" href="/dashboardAdmin">Admin Dashboard</Button>
        </div>
        {/*
        <div className="Button-Padding">
          <Button className="NavButton" href="/bugtrackerAdmin">Bug Tracker</Button>
        </div>
        */}
        <div className="Button-Padding">
          <Button className="NavButton" href="/">Log Out</Button>
        </div>

      </div>
    )}

}

export default SideNavAdmin;
