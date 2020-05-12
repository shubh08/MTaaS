import React from 'react';
import TopNavManager from '../navigation/topnavManager';
import SideNavManager from '../navigation/sidenavManager';
import LoadApplications from '../applications/loadApplications.js';
import './homepage.css';

class HomepageManager extends React.Component{
  render(){
    return(
    <div className="homepage">
        <TopNavManager/>
        <SideNavManager/>
        <div className="homepage-right">
          <LoadApplications/>
        </div>
    </div>
    )
  }
}

export default HomepageManager;

{/*
<header className="homepage-header">

</header>*/}
