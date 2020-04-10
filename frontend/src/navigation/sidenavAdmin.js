import React, { useState } from 'react';
import './sidenav.css';
import {
  Button
} from 'reactstrap';

class SideNavAdmin extends React.Component {

  render(){
    return (
      <div className="App-header">
        <div className="Button-Padding">
          <Button className="NavButton" href="/profileAdmin">My profile</Button>
        </div>
        <div className="Button-Padding">
          <Button className="NavButton" href="/userManagement">User Management</Button>
        </div>
        <div className="Button-Padding">
          <Button className="NavButton" href="/dashboardAdmin">Admin Dashboard</Button>
        </div>
      </div>
    )}

}

export default SideNavAdmin;
