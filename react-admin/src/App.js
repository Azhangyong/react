import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
//引入组件
import Login from "./views/login/index.js";
import Index from "./views/index/index.js";
//私有组件
import PrivateRouter from "./components/privateRouter/index";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact render={() => <Login />} path="/">
          </Route>
          <PrivateRouter component={Index} path="/index" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
