import React, { useState } from 'react';
import './billingAdmin.css';
import { Button } from 'reactstrap';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Form, FormGroup, Input, Col, Label, Row } from 'reactstrap';
import { Badge } from 'reactstrap';
import TopNavAdmin from '../navigation/topnavAdmin';
import SideNavAdmin from '../navigation/sidenavAdmin';
import axios from 'axios';
import { ROOT_URL } from '../config/config.js'
import { toast } from 'react-toastify';
import { Line } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';
class BillingAdmin extends React.Component {
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
      timeDeviceFarm:0,
      timeEmulator:0,
      totalCost:0
    };
  }
  componentWillMount() {
    axios.get(ROOT_URL + "/allProjects").then(response => {
      if (response.status == 200) {
        this.setState({ projects: response.data.projects, optionSelected: response.data.projects[0]._id })
        //getbilling details
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
    this.setState({yAxis:[]})
    axios.get(ROOT_URL + "/billing/" + e.target.value).then(response => {
      console.log(response.data)
      if (response.status == 200) {
        this.setState({totalCost:response.data.totalCost,timeDeviceFarm:response.data.time/60,timeEmulator:0})
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
  // listChangeHandler = (e) => {
  //   this.setState({ optionSelected: e.target.value });
  //   var date = new Date();
  //   var month = date.getMonth();
  //   date.setDate(1);
  //   this.setState({ yAxis: [] })
  //   while (date.getMonth() == month) {
  //     this.state.yAxis.push(Math.floor(Math.random() * (25 - 10 + 1)) + 10)
  //     date.setDate(date.getDate() + 1);
  //     this.setState({
  //       dataLine: {
  //         labels: this.state.all_days,
  //         datasets: [
  //           {
  //             label: '$',
  //             fill: true,
  //             lineTension: 0.3,
  //             backgroundColor: 'rgba(225, 204,230, .3)',
  //             borderColor: '#00acee',
  //             borderCapStyle: 'butt',
  //             borderDash: [],
  //             borderDashOffset: 0.0,
  //             borderJoinStyle: 'miter',
  //             pointBorderColor: 'rgb(0,0,0)',
  //             pointBackgroundColor: 'rgb(0, 0, 0)',
  //             pointBorderWidth: 4,
  //             pointHoverRadius: 1,
  //             pointHoverBackgroundColor: 'rgb(0, 0, 0)',
  //             pointHoverBorderColor: 'rgba(220, 220, 220,1)',
  //             pointHoverBorderWidth: 2,
  //             pointRadius: 1,
  //             pointHitRadius: 10,
  //             data: this.state.yAxis,
  //           },
  //         ],
  //       },
  //       lineChartOptions: {
  //         responsive: true,
  //         scales: {
  //           xAxes: [
  //             {
  //               scaleLabel: {
  //                 display: true,
  //                 labelString: 'Date',
  //                 fontSize: 20,
  //               },
  //               gridLines: {
  //                 display: false,
  //                 color: 'rgba(0, 0, 0, 0.1)',
  //               },
  //             },
  //           ],
  //           yAxes: [
  //             {
  //               scaleLabel: {
  //                 display: true,
  //                 labelString: 'Cost per day',
  //                 fontSize: 20,
  //               },
  //               gridLines: {
  //                 display: false,
  //                 color: 'rgba(0, 0, 0, 0.1)',
  //               },
  //             },
  //           ],
  //         },
  //         legend: {
  //           display: false,
  //         },
  //       },
  //     });
  //     console.log(this.state.yAxis)
  //   }
  //   //getbilling details
  // }
  render() {
    let optionsList = [<option value={0} >Select</option>]
    this.state.projects && this.state.projects.map((project) => {
      if(project.active)
      optionsList.push(<option value={project._id} >{project.name}</option>)
    })
    return (
      <div className="billingAdmin">
        <div>
          <TopNavAdmin />
        </div>
        <div className="billingAdmin-left">
          <SideNavAdmin />
        </div>
        <div className="billingAdmin-right">
          <Row className="billingManager-select">
            <Col></Col>
            <Col>
              <Input type="select" style={{ fontWeight: "bolder" }} onChange={this.listChangeHandler}>{optionsList}</Input>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <Badge color="primary">Administrator View</Badge>
            </Col>
            <Col></Col>
          </Row>
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
          <div className="billingAdmin-box">
            <Form>
              <FormGroup className="billingAdmin-box-item" row>
                <Label sm={5}> Total Device Farm Hours </Label>
                <Col sm={3}>
                {this.state.timeDeviceFarm} Hours
                </Col>
              </FormGroup>

              <FormGroup className="billingAdmin-box-item" row>
                <Label sm={5}> Total Emulator Instance Hours </Label>
                <Col sm={3}>
                {this.state.timeEmulator} Hours
                </Col>
              </FormGroup>

              <FormGroup className="billingAdmin-box-item" row>
                <Label sm={5}> Total Project Cost </Label>
                <Col sm={3}>
                $ {this.state.totalCost} 
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
