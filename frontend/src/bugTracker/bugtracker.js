import React, {useState} from 'react';
import './bugtracker.css';
import { Button } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Badge } from 'reactstrap';
import TopNav from '../navigation/topnavTester';
import SideNav from '../navigation/sidenavTester';

class BugTracker extends React.Component{
  render(){
    return (
      <div className="bugtracker">
        <div>
          <TopNav/>
        </div>
        <div className="bugtracker-left">
          <SideNav/>
        </div>
        <div className="bugtracker-right">
          <div>
            <div>
              <Breadcrumb>
                <BreadcrumbItem><a href="/projects">Test Project #1</a></BreadcrumbItem>
                <BreadcrumbItem><a href="/runs">Test Run #1</a></BreadcrumbItem>
                <BreadcrumbItem active>Bug Report</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
          <div>
              <Badge color="danger">Bug ID</Badge>
              <h4>
                Bug Number 1
              </h4>
              <Badge color="danger">Bug Name</Badge>
              <h4>
                On Screen Navigation issue iOS app
              </h4>
              <Badge color="info">Device Type</Badge>
              <h4>
                iOS device
              </h4>
              <Badge color="info">Device Name</Badge>
              <h4>
                iPhone 11 Pro
              </h4>
              <Badge color="info">Report Generated</Badge>
              <h4>
                April 6th, 2020 @ 10:07 PM.
              </h4>
              <Badge color="danger">Result</Badge>
              <h4>
                TEST FAILED
              </h4>
          </div>
        </div>
      </div>
    )
  }
}

export default BugTracker;
