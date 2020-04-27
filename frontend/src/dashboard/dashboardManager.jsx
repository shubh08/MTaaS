import TopNav from "../navigation/topnavManager";
import SideNav from "../navigation/sidenavManager";
import "./Analytics.css";
import React, { Component } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import axios from "axios";
import { ROOT_URL } from "../config/config.js";
import { toast } from "react-toastify";
import { Row, Col } from 'reactstrap';

class DashboardManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xAxisTester: [],
      yAxisTester: [],
      xAxisManager: [],
      yAxisManager: [],
      donutOptions: {},
      dataDoughnut: {
        labels: [],
        datasets: []
      },
      pieOptions: {},
      dataPie: {
        labels: [],
        datasets: [],
      },
      donutOptions2: {},
      dataDoughnut2: {
        labels: [],
        datasets: []
      },
      pieOptions2: {},
      dataPie2: {
        labels: [],
        datasets: [],
      }
    };
  }

  componentDidMount() {
    axios.get(ROOT_URL + "/testerPerProject/"+localStorage.getItem("ManagerID")).then(response => {
      if (response.status == 200) {
     
        this.setState({
          dataDoughnut: {
            labels: response.data.projectName,
            datasets: [
              {
                data: response.data.projectTesterLength,
                //hoverBackgroundColor:['#3784E7','#3784E7','#3784E7','#3784E7','#3784E7','#3784E7','#3784E7','#3784E7','#3784E7','#3784E7','#3784E7','#3784E7','#3784E7'],
                backgroundColor: [
                  "#46A2FF",
                  // "#58ACFF",
                  "#6BB5FF",
                  // "#7DBEFF",
                  // "#90C7FF",
                  "#A2D1FF",
                  "#B5DAFF",
                  "#C7E3FF",
                  "#DAECFF",
                  "#ECF6FF"
                ],
                hoverBackgroundColor: [
                  "#46A2FF",
                  // "#58ACFF",
                  "#6BB5FF",
                  // "#7DBEFF",
                  // "#90C7FF",
                  "#A2D1FF",
                  "#B5DAFF",
                  "#C7E3FF",
                  "#DAECFF",
                  "#ECF6FF"
                ]
              }
            ]
          },
          donutOptions: {
            tooltips: {
              callbacks: {
                label(tooltipItems, data) {
                  return `${data.labels[tooltipItems.index]} : ${
                    data.datasets[0].data[tooltipItems.index]
                    } testers`;
                }
              }
            },
            responsive: true,
            maintainAspectRatio: true,
            legend: {
              display: true
            }
          },
        });
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    })
    axios.get(ROOT_URL + "/bugsPerProject/"+localStorage.getItem("ManagerID")).then(response => {
      if (response.status == 200) {
        this.setState({
          dataPie: {
            labels: response.data.projectName,
            datasets: [
              {
                data: response.data.projectBugLength,
                backgroundColor: [
                "#46A2FF",
                "#58ACFF",
                "#6BB5FF",
                "#7DBEFF",
                "#90C7FF",
                "#A2D1FF",
                "#B5DAFF",
                "#C7E3FF",
                "#DAECFF",
                "#ECF6FF"],
                hoverBackgroundColor: [
                  "#46A2FF",
                  "#58ACFF",
                  "#6BB5FF",
                  "#7DBEFF",
                  "#90C7FF",
                  "#A2D1FF",
                  "#B5DAFF",
                  "#C7E3FF",
                  "#DAECFF",
                  "#ECF6FF"]
               // hoverBackgroundColor:['#3784E7','#3784E7','#3784E7','#3784E7','#3784E7','#3784E7','#3784E7','#3784E7','#3784E7','#3784E7','#3784E7','#3784E7','#3784E7']
              },
              
            ],
          },
          pieOptions: {
            tooltips: {
              callbacks: {
                label(tooltipItems, data) {
                  return `${data.labels[tooltipItems.index]} : ${
                    data.datasets[0].data[tooltipItems.index]
                    } Bugs`;
                },
              },
            },
            responsive: true,
            maintainAspectRatio: true,
            legend: {
              display: true,
            },
          },
        });
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    });
    axios.get(ROOT_URL + "/testrunPerProject/"+localStorage.getItem("ManagerID")).then(response => {
      if (response.status == 200) {
        this.setState({
          dataDoughnut2: {
            labels: response.data.projectName,
            datasets: [
              {
                data: response.data.testRunLength,
                backgroundColor: [
                  "#FF1717",
                  "#FF2E2E",
                  "#FF4646",
                  "#FF5D5D",
                  "#FF7474",
                  "#FF8B8B",
                  "#FFA2A2",
                  "#FFB9B9",
                  "#FFD1D1",
                  "#FFE8E8"
                ]
                ,
                hoverBackgroundColor: [
                  "#FF1717",
                  "#FF2E2E",
                  "#FF4646",
                  "#FF5D5D",
                  "#FF7474",
                  "#FF8B8B",
                  "#FFA2A2",
                  "#FFB9B9",
                  "#FFD1D1",
                  "#FFE8E8"
                ]
               // hoverBackgroundColor:['#BF0A30','#BF0A30','#BF0A30','#BF0A30','#BF0A30','#BF0A30','#BF0A30','#BF0A30','#BF0A30','#BF0A30','#BF0A30','#BF0A30','#BF0A30']
              }
            ]
          },
          donutOptions2: {
            tooltips: {
              callbacks: {
                label(tooltipItems, data) {
                  return data.datasets[0].data[tooltipItems.index] == 0? `${data.labels[tooltipItems.index]}` :`${data.labels[tooltipItems.index]} : ${
                    data.datasets[0].data[tooltipItems.index]
                    } Scripts`;
                }
              }
            },
            responsive: true,
            maintainAspectRatio: true,
            legend: {
              display: true
            }
          },
        });
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    });
    axios.get(ROOT_URL + "/scriptsPerProject/"+localStorage.getItem("ManagerID")).then(response => {
      if (response.status == 200) {
        this.setState({
          dataPie2: {
            labels: response.data.projectName,
            datasets: [
              {
                data: response.data.projectScriptLength,
                backgroundColor: [
                  "#FF1717",
                  "#FF2E2E",
                  "#FF4646",
                  "#FF5D5D",
                  "#FF7474",
                  "#FF8B8B",
                  "#FFA2A2",
                  "#FFB9B9",
                  "#FFD1D1",
                  "#FFE8E8"],
                  hoverBackgroundColor: [
                    "#FF1717",
                    "#FF2E2E",
                    "#FF4646",
                    "#FF5D5D",
                    "#FF7474",
                    "#FF8B8B",
                    "#FFA2A2",
                    "#FFB9B9",
                    "#FFD1D1",
                    "#FFE8E8"],
                 // hoverBackgroundColor:['#BF0A30','#BF0A30','#BF0A30','#BF0A30','#BF0A30','#BF0A30','#BF0A30','#BF0A30','#BF0A30','#BF0A30','#BF0A30','#BF0A30','#BF0A30']
                },
            ],
          },
          pieOptions2: {
            tooltips: {
              callbacks: {
                label(tooltipItems, data) {
                  return `${data.labels[tooltipItems.index]} : ${
                    data.datasets[0].data[tooltipItems.index]
                    } Documents`;
                },
              },
            },
            responsive: true,
            maintainAspectRatio: true,
            legend: {
              display: true,
            }
          },
        });
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    });
    
    
  }

  render() {
    return (
      <div className="homepage">
        <div>
          <TopNav />
        </div>
        <div className="analytics-left">
          <SideNav />
        </div>
        <div className="bugtracker-right">
          <div className="scroll-dashboard">
            <div>
              <Row>
                <Col>
                  <MDBContainer>
                    <div className="fontChanges">Tester count per Project</div>
                    <Doughnut
                      data={this.state.dataDoughnut}
                      width={300}
                      options={this.state.donutOptions}
                    />
                  </MDBContainer>
                </Col>
                <Col>
                  <MDBContainer>
                    <div className="fontChanges">Bugs per Project</div>
                    <Pie
                      data={this.state.dataPie}
                      width={300}
                      options={this.state.pieOptions}
                      onElementsClick={this.elementClicked}
                    />
                  </MDBContainer>
                </Col>
              </Row>
              <Row>
                <Col>
                  <MDBContainer>
                    <div className="fontChanges">Test runs per project</div>
                    <Doughnut
                      data={this.state.dataDoughnut2}
                      width={300}
                      options={this.state.donutOptions2}
                    />
                  </MDBContainer>
                </Col>
                <Col>
                  <MDBContainer>
                    <div className="fontChanges">Document count per Project</div>
                    <Pie
                      data={this.state.dataPie2}
                      width={300}
                      options={this.state.pieOptions2}
                    />
                  </MDBContainer>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardManager;