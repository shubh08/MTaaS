import React, { useState } from 'react';
import './topnav.css';

class TopNavAdmin extends React.Component {

  render(){
    return (
      <div>
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/homeAdmin"><h5>Mobile Testing as a Service</h5></a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default TopNavAdmin;


{/*
<Collapse navbar>
  <Nav className="mr-auto" navbar>
    <NavItem>
      <NavLink href="/components/">Components</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
    </NavItem>
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        Options
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>
          Option 1
        </DropdownItem>
        <DropdownItem>
          Option 2
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          Reset
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  </Nav>
  <NavbarText>Simple Text</NavbarText>
</Collapse>
*/}
