import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
//引入组件
import Login from './views/login/index.js';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route component={Login} exact path="/"></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
