import React, {useState} from 'react';
import './billingManager.css';
import { Button } from 'reactstrap';
import {Dropdown, DropdownButton } from 'react-bootstrap';
import { Form, FormGroup, Input, Col, Label } from 'reactstrap';
import { Badge } from 'reactstrap';
import TopNavManager from '../navigation/topnavManager';
import SideNavManager from '../navigation/sidenavManager';

class BillingManager extends React.Component{
  render(){
    return (
      <div className="billingManager">
        <div>
          <TopNavManager/>
        </div>
        <div className="billingManager-left">
          <SideNavManager/>
        </div>
        <div className="billingManager-right">
          <div className="billingManager-dropdown">

            <DropdownButton variant="secondary" id="dropdown-basic-button" title="Select Project">
              <Dropdown.Item href="#/action-1">Project #1</Dropdown.Item>
            </DropdownButton>

          </div>
          <div>
              {/*<Badge color="success">Project Completed!</Badge> */}
              {/* <Badge color="primary">Administrator View</Badge> */}
              <h5>
                The following billing details are applicable for cost associated with project runs.
              </h5>
          </div>
          <div className="billingManager-box">
              <Form>
                <FormGroup className="billingManager-box-item" row>
                  <Label sm={3}> Total Device Farm Hours </Label>
                  <Col sm={3}>
                    <Input placeholder=" Select project " />
                  </Col>
                </FormGroup>

                <FormGroup className="billingManager-box-item" row>
                  <Label sm={3}> Total Emulator Instance Hours </Label>
                  <Col sm={3}>
                    <Input placeholder=" Select project " />
                  </Col>
                </FormGroup>

                <FormGroup className="billingManager-box-item" row>
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

export default BillingManager;
