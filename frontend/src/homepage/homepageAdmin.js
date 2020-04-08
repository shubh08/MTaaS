import React from 'react';
import TopNav from '../navigation/topnavAdmin';
import SideNav from '../navigation/sidenavAdmin';
import './homepage.css';


class HomepageAdmin extends React.Component{
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

export default HomepageAdmin;

{/*
<header className="homepage-header">

</header>*/}
