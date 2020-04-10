import React from 'react';
import TopNavAdmin from '../navigation/topnavAdmin';
import SideNavAdmin from '../navigation/sidenavAdmin';
import './homepage.css';


class HomepageAdmin extends React.Component{
  render(){
    return(
      <div className="homepage">
      <div>
        <TopNavAdmin/>
      </div>
      <div className="bugtracker-left">
        <SideNavAdmin/>
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
