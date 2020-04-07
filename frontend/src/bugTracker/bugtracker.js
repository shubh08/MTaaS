import React, {useState} from 'react';
import './bugtracker.css';
import { Button } from 'reactstrap';

import TopNav from '../navigation/topnav.js';
import SideNav from '../navigation/sidenav.js';

class BugTracker extends React.Component{
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

export default BugTracker;
