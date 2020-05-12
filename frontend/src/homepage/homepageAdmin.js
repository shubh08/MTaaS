import React from 'react';
import TopNavAdmin from '../navigation/topnavAdmin';
import SideNavAdmin from '../navigation/sidenavAdmin';
import './homepage.css';


class HomepageAdmin extends React.Component{
  render(){
    return(
    <div className="homepage">
        <TopNavAdmin/>
        <SideNavAdmin/>
        <div className="homepage-right">
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
