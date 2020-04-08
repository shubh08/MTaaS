import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Landing from './landing/landing.js';
import Homepage from './homepage/homepage.js';
import SignUp from './signup/signup.js';
import Login from './login/login.js';
import BugTracker from './bugTracker/bugtracker.js';

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProjectApplications from './projectApplication/projectApplications';
import LoadApplications from './applications/loadApplications';

class Routes extends React.Component {

  render(){
    return(
      <Router>
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/home' component={Homepage}/>
          <Route exact path='/signup' component={SignUp}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/bugtracker' component={BugTracker}/>  //ProjectApplications
          <Route exact path='/applications' component={ProjectApplications}/>
          <Route exact path='/loadapplications' component={LoadApplications}/>
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
