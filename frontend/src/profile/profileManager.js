import React, { useState } from 'react';
import './profile.css';
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText, Row, Col, Container } from 'reactstrap';
import TopNav from '../navigation/topnavManager';
import SideNav from '../navigation/sidenavManager';
import axios from 'axios';
import { ROOT_URL } from '../config/config.js'
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';

class ManagerProfile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      company : '',
      email: '',
      about: '',
    };
  }
  componentDidMount() {
    document.getElementById("updateButton").disabled = true;
    axios.get(ROOT_URL + '/managerByManagerID/' + localStorage.getItem('ManagerID')).then((response) => {
      if (response.status == 200) {
        let manager = response.data.manager;
        this.setState({ name: manager.name, email: manager.email, about: manager.about, company: manager.company });
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
  managerNameChangeHandler = e => {
    this.setState({ name: e.target.value });
  };
  managerEmailChangeHandler = e => {
    this.setState({ email: e.target.value });
  };
  managerCompanyChangeHandler = e => {
    this.setState({ company: e.target.value })
  };
  managerAboutChangeHandler = e => {
    this.setState({ about: e.target.value })
  };

  editButtonHandler = () => {
    document.getElementById("name").readOnly = false;
    document.getElementById("about").readOnly = false;
    document.getElementById("email").readOnly = false;
    document.getElementById("company").readOnly = false;
    document.getElementById("updateButton").disabled = false;
  }
  updateProfile = (e) =>{
    e.preventDefault();
    var managerData = {name: this.state.name, about: this.state.about, email: this.state.email,company: this.state.company, id : localStorage.getItem('ManagerID')}
    axios.put(ROOT_URL + '/manager/update', managerData ).then((response) => {
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
                          onChange={this.managerNameChangeHandler}
                          required readOnly />
                      </FormGroup>
                      <FormGroup>
                        <h5>Email</h5>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Account email will be used for login"
                          value={this.state.email}
                          onChange={this.managerEmailChangeHandler}
                          id="email"
                          required readOnly />
                      </FormGroup>

                      <FormGroup>
                        <h5 >About you</h5>
                        <Input type="textarea" name="text"
                          id="about"
                          value={this.state.about}
                          onChange={this.managerAboutChangeHandler}
                          required readOnly />
                      </FormGroup>
                      <FormGroup>
                        <h5 >Company Name </h5>
                        <Input type="textarea" name="text"
                          id="company"
                          value={this.state.company}
                          onChange={this.managerCompanyChangeHandler}
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

export default ManagerProfile;
