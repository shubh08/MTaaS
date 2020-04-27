import React, { useState } from 'react';
import './billingManager.css';
import { Button } from 'reactstrap';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Form, FormGroup, Input, Col, Label, Row } from 'reactstrap';
import { Badge } from 'reactstrap';
import TopNavManager from '../navigation/topnavManager';
import SideNavManager from '../navigation/sidenavManager';
import axios from 'axios';
import { ROOT_URL } from '../config/config.js'
import { toast } from 'react-toastify';
import { Line } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';
class BillingManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLine: {
        labels: [],
        datasets: [],
      },
      projects: [],
      optionSelected: '',
      cost: [],
      all_days: [],
      timeDeviceFarm: 0,
      timeEmulator: 0,
      costDeviceFarm: 0,
      costEmulator: 0,
      totalCost: 0
    };
  }
  componentWillMount() {
    axios.get(ROOT_URL + "/projectsForManager/" + localStorage.getItem("ManagerID")).then(response => {
      if (response.status == 200) {
        this.setState({ projects: response.data.projects, optionSelected: response.data.projects[0]._id })
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    })
    var date = new Date();
    var month = date.getMonth();
    date.setDate(1);
    while (date.getMonth() == month) {
      var d = date.getFullYear() + '-' + date.getMonth().toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
      this.state.all_days.push(d);
      this.state.cost.push(0)
      date.setDate(date.getDate() + 1);

    }
    this.setState({
      dataLine: {
        labels: this.state.all_days,
        datasets: [
          {
            label: '$',
            fill: true,
            lineTension: 0.3,
            backgroundColor: 'rgba(225, 204,230, .3)',
            borderColor: '#00acee',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(0,0,0)',
            pointBackgroundColor: 'rgb(0, 0, 0)',
            pointBorderWidth: 4,
            pointHoverRadius: 1,
            pointHoverBackgroundColor: 'rgb(0, 0, 0)',
            pointHoverBorderColor: 'rgba(220, 220, 220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.state.cost,
          },
        ],
      },
      lineChartOptions: {
        responsive: true,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Date',
                fontSize: 20,
              },
              gridLines: {
                display: false,
                color: 'rgba(0, 0, 0, 0.1)',
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Cost per day',
                fontSize: 20,
              },
              gridLines: {
                display: false,
                color: 'rgba(0, 0, 0, 0.1)',
              },
            },
          ],
        },
        legend: {
          display: false,
        },
      },
    });
  }
  listChangeHandler = (e) => {
    this.setState({ optionSelected: e.target.value });
    this.setState({ yAxis: [] })
    axios.get(ROOT_URL + "/billing/" + e.target.value).then(response => {
      console.log(response.data)
      if (response.status == 200) {
        this.setState({ timeEmulator: response.data.totalTimeEmulator, costEmulator: response.data.totalCostEmulator, timeDeviceFarm: response.data.totalTimeAWS, costDeviceFarm: response.data.totalCostAWS, totalCost: response.data.totalCostAWS+response.data.totalCostEmulator })
        this.setState({
          dataLine: {
            labels: response.data.days,
            datasets: [
              {
                label: '$',
                fill: true,
                lineTension: 0.3,
                backgroundColor: 'rgba(225, 204,230, .3)',
                borderColor: '#00acee',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgb(0,0,0)',
                pointBackgroundColor: 'rgb(0, 0, 0)',
                pointBorderWidth: 4,
                pointHoverRadius: 1,
                pointHoverBackgroundColor: 'rgb(0, 0, 0)',
                pointHoverBorderColor: 'rgba(220, 220, 220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: response.data.costs,
              },
            ],
          },
          lineChartOptions: {
            responsive: true,
            scales: {
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Date',
                    fontSize: 20,
                  },
                  gridLines: {
                    display: false,
                    color: 'rgba(0, 0, 0, 0.1)',
                  },
                },
              ],
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Cost per day',
                    fontSize: 20,
                  },
                  gridLines: {
                    display: false,
                    color: 'rgba(0, 0, 0, 0.1)',
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
          },
        });
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    })


  }
  render() {
    let optionsList = [<option value={0} >Select</option>]
    this.state.projects && this.state.projects.map((project) => {
      if (project.active)
        optionsList.push(<option value={project._id} >{project.name}</option>)
    })
    return (
      <div className="billingManager">
        <div>
          <TopNavManager />
        </div>
        <div className="billingManager-left">
          <SideNavManager />
        </div>
        <div className="billingManager-right">
          <div className="">
            <Row className="billingManager-select">
              <Col></Col>
              <Col>
                <Input type="select" style={{ fontWeight: "bolder" }} onChange={this.listChangeHandler}>{optionsList}</Input>
              </Col>
              <Col></Col>
            </Row>


          </div>
          <Row className="billingManager-marginBottom">
            <MDBContainer>
              <h5 className="billingManager-marginTop">Current Month's Billing details
              </h5>
              <Line data={this.state.dataLine} width={800} options={this.state.lineChartOptions} />
            </MDBContainer>
          </Row>
          <div>

            <h5>
              The following billing details are applicable for cost associated with project runs.
              </h5>
          </div>

          <Row>
            <Col><div className="billingManager-box">
              <Form>
                <FormGroup className="billingManager-box-item" row>
                  <Label md={6}> Total Device Farm Minutes </Label>
                  <Col md={6}>
                    {this.state.timeDeviceFarm} Hours
                  </Col>
                </FormGroup>

                <FormGroup className="billingManager-box-item" row>
                  <Label md={6}> Total Emulator Instance Minutes </Label>
                  <Col md={6}>
                    {this.state.timeEmulator} Minutes
                  </Col>
                </FormGroup>
                <FormGroup className="billingManager-box-item" row>
                  <Label md={6}>Device Farm Cost </Label>
                  <Col md={6}>
                    $ {this.state.costDeviceFarm} 
                  </Col>
                </FormGroup>

                <FormGroup className="billingManager-box-item" row>
                  <Label md={6}>Emulator Cost </Label>
                  <Col md={6}>
                    $ {this.state.costEmulator} 
                  </Col>
                </FormGroup>

                <FormGroup className="billingManager-box-item" row>
                  <Label md={6}> Total Project Cost </Label>
                  <Col md={6}>
                    $ {this.state.totalCost}
                  </Col>
                </FormGroup>
              </Form>
            </div>
            </Col>
          </Row>

        </div>
      </div>
    )
  }
}

export default BillingManager;
