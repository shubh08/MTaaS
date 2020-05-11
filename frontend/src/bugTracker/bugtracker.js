import React, {useState} from 'react';
import './bugtracker.css';
import { Button } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText, Row, Col, Container } from 'reactstrap';
import { Badge } from 'reactstrap';
import TopNav from '../navigation/topnavTester';
import SideNav from '../navigation/sidenavTester';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ROOT_URL } from '../config/config.js'

class BugTracker extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      data : [],
      projectName: '',
      severity: '',
      operatingSystem: '',
      operatingSystemVersion: '',
      bugDescription: '',
      date: ''
    };
  }
  componentDidMount() {
    axios.get(ROOT_URL + '/bugs/'+ localStorage.getItem('TesterID')).then((response) => {
      //5e97d4fc466ce968df734e38 5e884c3ce7a72f7dac73b426
      //5eb8fd8595f0864e4e02fb9b
      //5eb904f63c334651900b837d
      if (response.status == 200) {
        let bugreports = response.data.bugreport;
        console.log(response.data);
        this.setState({ projectName: bugreports.projectName, severity: bugreports.severity, operatingSystem: bugreports.operatingSystem, operatingSystemVersion: bugreports.operatingSystemVersion, bugDescription: bugreports.bugDescription, date: bugreports.date });
        console.log(this.state.projectName)
        console.log(this.state.severity)
        console.log(this.state.operatingSystem)
        console.log(this.state.operatingSystemVersion)
        console.log(this.state.bugDescription)
        console.log(this.state.date)
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
  // bugreportProjectNameChangeHandler = e => {
  //   this.setState({ projectName: e.target.value });
  // };
  // bugreportSeverityChangeHandler = e => {
  //   this.setState({ severity: e.target.value });
  // };
  // bugreportOperatingSystemChangeHandler = e => {
  //   this.setState({ operatingSystem: e.target.value });
  // };
  // bugreportOperatingSystemVersionChangeHandler = e => {
  //   this.setState({ operatingSystemVersion: e.target.value });
  // };
  // bugreportBugDescriptionChangeHandler = e => {
  //   this.setState({ bugDescription: e.target.value });
  // };
  // bugreportDateChangeHandler = e => {
  //   this.setState({ date: e.target.value })
  // };

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
                <Form className = "bug-padding">
                  <FormGroup >
                    <h5 > Project Name </h5>
                    <Input name="text"
                      id="projectName"
                      value={this.state.projectName}
                      readOnly> </Input>
                  </FormGroup>
                  <FormGroup >
                    <h5 > Severity </h5>
                    <Input name="text"
                      id="severity"
                      value={this.state.severity}
                      readOnly> </Input>
                  </FormGroup>
                  <FormGroup >
                    <h5 > Operating System </h5>
                    <Input name="text"
                      id="operatingSystem"
                      value={this.state.operatingSystem}
                      readOnly> </Input>
                  </FormGroup>
                  <FormGroup >
                    <h5 > Operating System Version </h5>
                    <Input name="text"
                      id="operatingSystemVersion"
                      value={this.state.operatingSystemVersion}
                      readOnly> </Input>
                  </FormGroup>
                  <FormGroup>
                    <h5> Bug Description </h5>
                    <Input type="textarea" name="text"
                      value={this.state.bugDescription}
                      id="bugDescription"
                      readOnly>  </Input>
                  </FormGroup>
                  <FormGroup>
                    <h5> Date </h5>
                    <Input name="text"
                      value={this.state.date}
                      id="bugDescription"
                      readOnly> </Input>
                  </FormGroup>
                </Form>
                </div>

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

export default BugTracker;
