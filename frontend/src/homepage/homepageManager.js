import React from 'react';
import TopNav from '../navigation/topnavManager';
import SideNav from '../navigation/sidenavManager';
import './homepage.css';


class HomepageManager extends React.Component{
  render(){
    return(
      <div className="homepage">
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

export default HomepageManager;

{/*
<header className="homepage-header">

</header>*/}
