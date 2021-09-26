import React from 'react';
import SettingsProvider from './context/settings'
import ToDo from './components/todo/todo.js';
import "./app.scss"
export default class App extends React.Component {
  render() {
    return (
      <SettingsProvider>
        <ToDo />
      </SettingsProvider>
    );
  }
}