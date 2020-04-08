import React, { useState } from 'react';
import './profile.css';
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText, Row, Col, Container } from 'reactstrap';
import TopNav from '../navigation/topnavTester';
import SideNav from '../navigation/sidenavTester.js';
import axios from 'axios';
import { ROOT_URL } from '../config/config.js'
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';

class TesterProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      DOB: '',
      about: '',
      technologies: ''
    };
  }
  componentDidMount() {
    document.getElementById("updateButton").disabled = false;
    axios.get(ROOT_URL + '/testerByTesterID/' + localStorage.getItem('TesterID')).then((response) => {
      if (response.status == 200) {
        let tester = response.data.testers;
        this.setState({ name: tester.name, email: tester.email, about: tester.about, technologies: tester.technologies, DOB: tester.DOB.split('T')[0] });
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
  testerNameChangeHandler = e => {
    this.setState({ name: e.target.value });
  };
  testerEmailChangeHandler = e => {
    this.setState({ email: e.target.value });
  };
  testerDOBChangeHandler = e => {
    this.setState({ DOB: e.target.value })
  };
  testerAboutChangeHandler = e => {
    this.setState({ about: e.target.value })
  };
  testerTechnologiesChangeHandler = e => {
    this.setState({ technologies: e.target.value })
  };
  editButtonHandler = () => {
    document.getElementById("name").readOnly = false;
    document.getElementById("about").readOnly = false;
    document.getElementById("technologies").readOnly = false;
    document.getElementById("email").readOnly = false;
    document.getElementById("dob").readOnly = false;
    document.getElementById("updateButton").disabled = false;
  }
  updateProfile = (e) =>{
    e.preventDefault();
    var testerData = {name: this.state.name, about: this.state.about, DOB: this.state.DOB, technologies: this.state.technologies, email: this.state.email, id : localStorage.getItem('TesterID')}
    axios.put(ROOT_URL + '/tester/update', testerData ).then((response) => {
      if (response.status == 200) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
        setTimeout(() => {
          window.location.reload()
        }, 2000);
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
  render() {
    return (
      <div className="profile">
        <div>
          <TopNav />
        </div>
        <div className="profile-left">
          <SideNav />
        </div>
        <div className="profile-right">
          <div>
            <div>
              <Container className="profile-margin-top">
                <Row>
                  <Col md={3} className="profile-white"></Col>
                  <Col md={6} className="div-border">
                    <Row>
                      <Col md={11} className="text-center"><h2>My Profile</h2></Col>
                      <Col md={1}><h2><FaEdit onClick={this.editButtonHandler}></FaEdit></h2></Col>
                    </Row>
                    <Form className="profile-margin-increase-top" onSubmit = {this.updateProfile}>
                      <FormGroup >
                        <h5 >Name </h5>
                        <Input placeholder="Enter full name"
                          id="name"
                          value={this.state.name}
                          onChange={this.testerNameChangeHandler}
                          required readOnly />
                      </FormGroup>
                      <FormGroup>
                        <h5>Email</h5>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Account email will be used for login"
                          value={this.state.email}
                          onChange={this.testerEmailChangeHandler}
                          id="email"
                          required readOnly />
                      </FormGroup>
                      <FormGroup>
                        <h5 >Date of Birth</h5>
                        <Input
                          type="date"
                          name="date"
                          id="dob"
                          placeholder="Birth date"
                          value={this.state.DOB}
                          onChange={this.testerDOBChangeHandler}
                          required readOnly />
                      </FormGroup>
                      <FormGroup>
                        <h5 >About you</h5>
                        <Input type="textarea" name="text"
                          id="about"
                          value={this.state.about}
                          onChange={this.testerAboutChangeHandler}
                          required readOnly />
                      </FormGroup>
                      <FormGroup>
                        <h5 >Testing technologies you are comfortable with </h5>
                        <Input type="textarea" name="text"
                          id="technologies"
                          value={this.state.technologies}
                          onChange={this.testerTechnologiesChangeHandler}
                          required readOnly />
                      </FormGroup>
                      <Row>
                        <Col></Col>
                        <Col><Button id="updateButton" color="success" className="updateButton" type="submit" >Update</Button></Col>
                        <Col></Col>
                      </Row>
                    </Form>
                  </Col>
                  <Col md={3} className="profile-white" ></Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TesterProfile;
