import React, {useState} from 'react';
import './bugtrackerManager.css';
import { Button } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText, Row, Col, Container } from 'reactstrap';
import { Card, CardTitle, CardText } from 'reactstrap';
import { Badge } from 'reactstrap';
import TopNav from '../navigation/topnavManager';
import SideNav from '../navigation/sidenavManager';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ROOT_URL } from '../config/config.js'

class BugTrackerManager extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      array : []
    };
  }
  componentDidMount() {
    axios.get(ROOT_URL + '/managerBugs/'+ localStorage.getItem('ManagerID')).then((response) => {
      //5e97d4fc466ce968df734e38 5e884c3ce7a72f7dac73b426
      //5eb8fd8595f0864e4e02fb9b
      //5eb904f63c334651900b837d
      if (response.status == 200) {
        let bugreports = response.data.bugreport;
        this.setState({ array: response.data.bugreport});
        console.log(response.data);
        //this.setState({ projectName: bugreports.projectName, severity: bugreports.severity, operatingSystem: bugreports.operatingSystem, operatingSystemVersion: bugreports.operatingSystemVersion, bugDescription: bugreports.bugDescription, date: bugreports.date });
        // console.log(this.state.projectName)
        // console.log(this.state.severity)
        // console.log(this.state.operatingSystem)
        // console.log(this.state.operatingSystemVersion)
        // console.log(this.state.bugDescription)
        // console.log(this.state.date)
        console.log(this.state.array)
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }).catch(error => {
      toast.error('Something went wrong!', {
        position: toast.POSITION.TOP_CENTER
      });
    })
  }

  render(){
    return (
      <div className="bugtracker">
        <TopNav/>
        <SideNav/>
          <div className="bugtracker-right">
          {this.state.array.map(buggy =>
             <div className="bugCard">
               <Card body className="text-center" >
                 <CardTitle>{buggy.projectID.name}</CardTitle>
                 <CardText>{buggy.severity}</CardText>
                 <CardText>{buggy.operatingSystem}</CardText>
                 <CardText>{buggy.operatingSystemVersion}</CardText>
                 <CardText>{buggy.bugDescription}</CardText>
                 <CardText>{buggy.date}</CardText>
                {/* <Button color="danger" className="deleteBug" >Delete Bug</Button> */}
               </Card>
              </div>
              )}
              </div>

            {/*
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
            </div>*/}
      </div>
    )
  }
}

export default BugTrackerManager;
