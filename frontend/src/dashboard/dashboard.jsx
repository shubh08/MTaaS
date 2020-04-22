import TopNav from "../navigation/topnavAdmin";
import SideNav from "../navigation/sidenavAdmin";
import "./Analytics.css";
import React, { Component } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import axios from "axios";
import { ROOT_URL } from "../config/config.js";
import { toast } from "react-toastify";
import { Row, Col } from 'reactstrap';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xAxisTester: ["Proj1", "Proj2", "Proj3", "Proj4", "Proj5", "Proj6", "Proj7", "Proj8", "Proj9", "Proj10"],
      yAxisTester: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      xAxisManager: ["Rita", "Rayan", "Ram", "Laxman", "Sita","Rajan","Srijan","Ani","Dhyan","Som"],
      yAxisManager: [10,9,8,7,6,5,4,3,2,1],
      xAxisTester1: ["Proj1", "Proj2", "Proj3", "Proj4", "Proj5", "Proj6", "Proj7", "Proj8", "Proj9", "Proj10"],
      yAxisTester1: [100,90,80,70,60,50,40,30,20,10],
      xAxisManager1: ["Rita", "Rayan", "Ram", "Laxman", "Sita","Rajan","Srijan","Ani","Dhyan","Som"],
      yAxisManager1: [10,9,8,7,6,5,4,3,2,1],
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
    //Working Code for testers per project
    /*axios.get(ROOT_URL + "/allProjects").then(response => {
      if (response.status == 200) {
        response.data.projects.map((project) => {
          this.state.xAxis.push(project.name)
        });
        response.data.projects.map((project) => {
          this.state.yAxis.push(project.testerID.length);
        });
        
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    })*/
    //working projects per manager
    /*axios.get(ROOT_URL + "/allManagers").then(response => {
      if (response.status == 200) {
        response.data.managers.map((manager) => {
          this.state.xAxisManager.push(manager.name)
        });
        response.data.managers.map((manager) => {
          this.state.yAxisManager.push(manager.projectID.length);
        });
        
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    });*/
    this.setState({
      dataDoughnut: {
        labels: this.state.xAxisTester,
        datasets: [
          {
            data: this.state.yAxisTester,
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
          display: false
        }
      },
    });
    this.setState({
      dataPie: {
        labels: this.state.xAxisManager,
        datasets: [
          {
            data: this.state.yAxisManager,
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
          },
        ],
      },
      pieOptions: {
        tooltips: {
          callbacks: {
            label(tooltipItems, data) {
              return `${data.labels[tooltipItems.index]} : ${
                data.datasets[0].data[tooltipItems.index]
                } Projects`;
            },
          },
        },
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: false,
        },
      },
    });
    this.setState({
      dataDoughnut2: {
        labels: this.state.xAxisManager1,
        datasets: [
          {
            data: this.state.yAxisManager1,
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
          }
        ]
      },
      donutOptions2: {
        tooltips: {
          callbacks: {
            label(tooltipItems, data) {
              return `${data.labels[tooltipItems.index]} : ${
                data.datasets[0].data[tooltipItems.index]
                } Scripts`;
            }
          }
        },
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: false
        }
      },
    });
    this.setState({
      dataPie2: {
        labels: this.state.xAxisTester1,
        datasets: [
          {
            data: this.state.yAxisTester1,
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
          display: false,
        },
      },
    });
  }

  render() {
    return (
      <div className="homepage">
        <div>
          <TopNav />
        </div>
        <div className="bugtracker-left">
          <SideNav />
        </div>
        <div className="bugtracker-right">
          <div>
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
                    <div className="fontChanges">Project count per Manager</div>
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
                    <div className="fontChanges">Script count per tester</div>
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

export default Dashboard;