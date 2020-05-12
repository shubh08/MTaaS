import React, { useState } from 'react';
import './topnav.css';

class TopNavManager extends React.Component {

  render(){
    return (
      <div>
        <div className="NaviTop">
          <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="/homeManager"><h5>Mobile Testing as a Service</h5></a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

export default TopNavManager;
