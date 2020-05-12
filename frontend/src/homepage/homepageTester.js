import React from 'react';
import TopNav from '../navigation/topnavTester';
import SideNav from '../navigation/sidenavTester';
import ProjectApplications from '../projectApplication/projectApplications.js';
import './homepage.css';


class HomepageTester extends React.Component{
  render(){
    return(
      <div className="homepage">
        <TopNav/>
        <div className="homepage-left">
          <SideNav/>
        </div>
        <div className="homepage-right">
          <ProjectApplications/>
        </div>
    </div>
    )
  }
}

export default HomepageTester;

{/*
<header className="homepage-header">

</header>*/}
