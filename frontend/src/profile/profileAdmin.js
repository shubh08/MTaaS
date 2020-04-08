import React, {useState} from 'react';
import './profile.css';
import { Button } from 'reactstrap';

import TopNav from '../navigation/topnavAdmin';
import SideNav from '../navigation/sidenavAdmin';

class AdminProfile extends React.Component{
  render(){
    return (
      <div className="bugtracker">
        <div>
          <TopNav/>
        </div>
        <div className="bugtracker-left">
          <SideNav/>
        </div>
        <div className="bugtracker-right">
          <div>
            <div>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AdminProfile;
