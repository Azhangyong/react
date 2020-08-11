import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import './App.scss';
//引入组件
import Home from './views/home';
import About from './views/about';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>335215</h1>
        <BrowserRouter>
          <Switch>
            <Route component={Home} exact path="/"></Route>
            <Route component={About} path="/about"></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
