import React from 'react';
import {
  Route,
  Router,
  HashHistory,
  Link,
  HashRouter,
  Switch,
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route component={login} exact path="/login"></Route>
          <Route component={lofo} path="/info"></Route>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
