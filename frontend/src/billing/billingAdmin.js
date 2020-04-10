import React, {useState} from 'react';
import './billingAdmin.css';
import { Button } from 'reactstrap';
import {Dropdown, DropdownButton } from 'react-bootstrap';
import { Form, FormGroup, Input, Col, Label } from 'reactstrap';
import { Badge } from 'reactstrap';
import TopNavAdmin from '../navigation/topnavAdmin';
import SideNavAdmin from '../navigation/sidenavAdmin';

class BillingAdmin extends React.Component{
  render(){
    return (
      <div className="billingAdmin">
        <div>
          <TopNavAdmin/>
        </div>
        <div className="billingAdmin-left">
          <SideNavAdmin/>
        </div>
        <div className="billingAdmin-right">
          <div className="billingAdmin-dropdown">

            <DropdownButton variant="secondary" title="Select Project">
              <Dropdown.Item href="#/action-1">Project #1</Dropdown.Item>
            </DropdownButton>

          </div>
          <div>
              <Badge color="primary">Administrator View</Badge>
              <h5>
                The following billing details are applicable for cost associated with project runs.
              </h5>
          </div>
          <div className="billingAdmin-box">
              <Form>
                <FormGroup className="billingAdmin-box-item" row>
                  <Label sm={3}> Total Device Farm Hours </Label>
                  <Col sm={3}>
                    <Input placeholder=" Select project " />
                  </Col>
                </FormGroup>

                <FormGroup className="billingAdmin-box-item" row>
                  <Label sm={3}> Total Emulator Instance Hours </Label>
                  <Col sm={3}>
                    <Input placeholder=" Select project " />
                  </Col>
                </FormGroup>

                <FormGroup className="billingAdmin-box-item" row>
                  <Label sm={3}> Total Project Cost </Label>
                  <Col sm={3}>
                    <Input placeholder=" Select project " />
                  </Col>
                </FormGroup>
              </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default BillingAdmin;
