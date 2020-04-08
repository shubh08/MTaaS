import React, {useState} from 'react';
import './profile.css';
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText, Row, Col, Container } from 'reactstrap';
import TopNav from '../navigation/topnavAdmin';
import SideNav from '../navigation/sidenavAdmin';
import axios from 'axios';
import { ROOT_URL } from '../config/config.js'
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';

class AdminProfile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: ''
   };
  }
  componentDidMount() {
    document.getElementById("updateButton").disabled = true;
    axios.get(ROOT_URL + '/adminByAdminID/' + localStorage.getItem('AdminID')).then((response) => {
      if (response.status == 200) {
        let admin = response.data.admin;
        this.setState({ name: admin.name, email: admin.email });
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
  adminNameChangeHandler = e => {
    this.setState({ name: e.target.value });
  };
  adminEmailChangeHandler = e => {
    this.setState({ email: e.target.value });
  };
  

  editButtonHandler = () => {
    document.getElementById("name").readOnly = false;
    document.getElementById("email").readOnly = false;
    document.getElementById("updateButton").disabled = false;
  }
  updateProfile = (e) =>{
    e.preventDefault();
    var adminData = {name: this.state.name, email: this.state.email, id : localStorage.getItem('AdminID')}
    axios.put(ROOT_URL + '/admin/update', adminData ).then((response) => {
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
                          onChange={this.adminNameChangeHandler}
                          required readOnly />
                      </FormGroup>
                      <FormGroup>
                        <h5>Email</h5>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Account email will be used for login"
                          value={this.state.email}
                          onChange={this.adminEmailChangeHandler}
                          id="email"
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

export default AdminProfile;
