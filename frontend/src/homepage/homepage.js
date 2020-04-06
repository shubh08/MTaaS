import React from 'react';
import TopNav from '../navigation/topnav.js';
import SideNav from '../navigation/sidenav.js';
import './homepage.css';


class Homepage extends React.Component{
  render(){
    return(
    <div className="homepage">
      <div>
        <TopNav/>
      </div>
      <div>
        <SideNav/>
      </div>

    </div>
    )
  }
}

export default Homepage;

{/*
<header className="homepage-header">

</header>*/}
