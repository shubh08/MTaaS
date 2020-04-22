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
      severity : '',
      bugDescription : '',
      path: ''
    };
  }
  componentDidMount() {
    axios.get(ROOT_URL + '/bugs/5e97d4fc466ce968df734e38').then((response) => {
      if (response.status == 200) {
        let bugreports = response.data.bugreport;
        console.log(response.data);
        this.setState({ severity: bugreports.severity, bugDescription: bugreports.bugDescription, path: bugreports.path });
        console.log(this.state.severity)
        console.log(this.state.bugDescription)
        console.log(this.state.path)
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
  bugreportSeverityChangeHandler = e => {
    this.setState({ severity: e.target.value });
  };
  bugreportBugDescriptionChangeHandler = e => {
    this.setState({ bugDescription: e.target.value });
  };
  bugreportPathChangeHandler = e => {
    this.setState({ path: e.target.value })
  };

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
                    <h5 > Severity </h5>
                    <Input name="text"
                      id="severity"
                      value={this.state.severity}
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
                    <h5> Path </h5>
                    <Input name="text"
                      value={this.state.path}
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
