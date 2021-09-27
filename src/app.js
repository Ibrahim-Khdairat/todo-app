import React from 'react';
import ToDo from './components/todo/todo.js';
import "./app.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SettingForm from "./components/Setting-Form/settingform";
import Header from './components/header/header.js';


export default class App extends React.Component {
  render() {
    return (

      <Router >
        <Header/>
        <Switch>
          <Route exact path="/">
             <ToDo />
          </Route>

          <Route exact path="/settings">
             <SettingForm/>
          </Route>
        </Switch>
      </Router>
       
    );
  }
}