import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Landing from './landing/landing.js';
import HomepageTester from './homepage/homepageTester';
import HomepageManager from './homepage/homepageManager';
import HomepageAdmin from './homepage/homepageAdmin';
import ProfileTester from './profile/profileTester';
import ProfileManager from './profile/profileManager';
import ProfileAdmin from './profile/profileAdmin';
import NotificationManager from './notification/notificationManager';
import NotificationTester from './notification/notificationTester';
import CreateProject from './createProject/createProject';
import SignUp from './signup/signup.js';
import Login from './login/login.js';
import BugTracker from './bugTracker/bugtracker.js';
import BugTrackerManager from './bugTracker/bugtrackerManager.js';
import BugTrackerAdmin from './bugTracker/bugtrackerAdmin.js';
import BillingManager from './billing/billingManager.js';
import BillingAdmin from './billing/billingAdmin.js';
import NewRunTester from './newRun/newRunTester.js';

import { ToastContainer } from 'react-toastify';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProjectApplications from './projectApplication/projectApplications';
import LoadApplications from './applications/loadApplications';
import UserManagement from './userManagement/userManagement';
import ProjectOperations from './projectOperations/projectOperations';
import DashboardAdmin from './dashboard/dashboard'
import ManagerFilesView from './filesUpload/managerUpload';
import TesterFilesView from './filesUpload/testerUpload';
import AllocateDeviceTester from './allocateDevice/allocateDeviceTester'
import AllocateDeviceManager from './allocateDevice/allocateDeviceManager'
import DeallocateDeviceManager from './allocateDevice/deallocateManager'
import DeallocateDeviceTester from './allocateDevice/deallocateTester'
import TestRunStatus from './testRunStatus/testRunStatus';
import NewEmulatorRunTester from './newRun/newEmulatorTestRunner';
import ViewProjectManager from './project/viewProjectsManager';
import ViewProjectTester from './project/viewProjectsTester';
import DashboardManager from './dashboard/dashboardManager';

class Routes extends React.Component {

  render(){
    return(
      <Router>
        <ToastContainer autoClose={3000} />
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/homeTester' component={HomepageTester}/>
          <Route exact path='/homeManager' component={HomepageManager}/>
          <Route exact path='/homeAdmin' component={HomepageAdmin}/>
          <Route exact path='/profileTester' component={ProfileTester}/>
          <Route exact path='/profileManager' component={ProfileManager}/>
          <Route exact path='/profileAdmin' component={ProfileAdmin}/>
          <Route exact path='/notificationManager' component={NotificationManager}/>
          <Route exact path='/notificationTester' component={NotificationTester}/>
          <Route exact path='/createProject' component={CreateProject}/>
          <Route exact path='/signup' component={SignUp}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/bugtracker' component={BugTracker}/>
          <Route exact path='/bugTrackerManager' component={BugTrackerManager}/>
          <Route exact path='/bugTrackerAdmin' component={BugTrackerAdmin}/>
          <Route exact path='/billingManager' component={BillingManager}/>
          <Route exact path='/createRunTester' component={NewRunTester}/>
          <Route exact path='/billingAdmin' component={BillingAdmin}/>

          <Route exact path='/applications' component={ProjectApplications}/>
          <Route exact path='/loadapplications' component={LoadApplications}/>
          <Route exact path='/userManagement' component={UserManagement}/>
          <Route exact path='/projectOperation' component={ProjectOperations}/>
          <Route exact path='/dashboardAdmin' component={DashboardAdmin}/>
          <Route exact path='/managerUpload' component={ManagerFilesView}/>
          <Route exact path='/testerUpload' component={TesterFilesView}/>
          <Route exact path='/allocateDeviceTester' component={AllocateDeviceTester}/>
          <Route exact path='/allocateDeviceManager' component={AllocateDeviceManager}/>
          <Route exact path='/deallocateDeviceManager' component={DeallocateDeviceManager}/>
          <Route exact path='/deallocateDeviceTester' component={DeallocateDeviceTester}/>
          <Route exact path='/getRunStatus' component={TestRunStatus}/>
          <Route exact path='/newEmulatorRun' component={NewEmulatorRunTester}/>
          <Route exact path='/viewProjectManager' component={ViewProjectManager}/>
          <Route exact path='/viewProjectTester' component={ViewProjectTester}/>
          <Route exact path='/dashboardManager' component={DashboardManager}/>
        </Switch>
      </Router>
    )
  }
}


ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
