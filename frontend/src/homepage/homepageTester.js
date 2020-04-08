import React from 'react';
import TopNav from '../navigation/topnavTester';
 import SideNav from '../navigation/sidenavTester';
import './homepage.css';


class HomepageTester extends React.Component{
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

export default HomepageTester;

{/*
<header className="homepage-header">

</header>*/}
