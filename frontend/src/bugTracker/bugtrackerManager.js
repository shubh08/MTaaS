import React, {useState} from 'react';
import './bugtrackerManager.css';
import { Button } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText, Row, Col, Container } from 'reactstrap';
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
          {/*
          <div>
            <div>
              <Breadcrumb>
                <BreadcrumbItem><a href="/projects">Test Project #1</a></BreadcrumbItem>
                <BreadcrumbItem><a href="/runs">Test Run #1</a></BreadcrumbItem>
                <BreadcrumbItem active>Bug Report</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
          */}
          <div>
              <Form className = "bug-padding">
                <FormGroup >
                  <h5 >Name </h5>
                  <Input name="text"
                    id="severity"
                    value={this.state.severity}
                    readOnly />
                </FormGroup>
                <FormGroup>
                  <h5>Email</h5>
                  <Input type="textarea" name="text"
                    value={this.state.bugDescription}
                    id="bugDescription"
                    readOnly />
                </FormGroup>
                <FormGroup>
                  <h5>Email</h5>
                  <Input name="text"
                    value={this.state.path}
                    id="bugDescription"
                    readOnly />
                </FormGroup>
              </Form>
              {/*
                <div>
                  <Badge color="danger">Bug ID</Badge>
                  <h4>
                    here
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
                </div>

              <h4>
                TEST FAILED
              </h4>
              */}
          </div>
        </div>
      </div>
    )
  }
}

export default BugTrackerManager;
