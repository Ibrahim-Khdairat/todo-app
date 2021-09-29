import React from 'react';
import ReactDOM from 'react-dom';
import '@blueprintjs/core/lib/css/blueprint.css';
import SettingsProvider from './context/settings';
import LoginProvider from './context/login';
import LoginForm from './components/LoginForm/loginform';
import { LoginContext } from './context/login';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import App from './app.js';

class Main extends React.Component {
  static contextType = LoginContext;

  render() {
    return (

      <LoginProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </LoginProvider>
    )
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);