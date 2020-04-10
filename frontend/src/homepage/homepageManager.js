import React from 'react';
import TopNavManager from '../navigation/topnavManager';
import SideNavManager from '../navigation/sidenavManager';
import './homepage.css';


class HomepageManager extends React.Component{
  render(){
    return(
      <div className="homepage">
      <div>
        <TopNavManager/>
      </div>
      <div className="bugtracker-left">
        <SideNavManager/>
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

export default HomepageManager;

{/*
<header className="homepage-header">

</header>*/}
