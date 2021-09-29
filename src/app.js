import React from 'react';
import ToDo from './components/todo/todo.js';
import "./app.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SettingForm from "./components/Setting-Form/settingform";
import Header from './components/header/header.js';
import { When } from 'react-if';
import { LoginContext } from './context/login.js';
import LoginForm from './components/LoginForm/loginform.js';


export default class App extends React.Component {

  static contextType = LoginContext;
  render() {
    return (

      <Router >
        <When condition =  {this.context.loggedIn} >
        <Header/>
        <Switch>
          <Route exact path="/">
             <ToDo />
          </Route>

          <Route exact path="/settings">
             <SettingForm/>
          </Route>
        </Switch>
        </When>

        <When condition = {!this.context.loggedIn}>
          <LoginForm/>
        </When>

      </Router>
       
    );
  }
}