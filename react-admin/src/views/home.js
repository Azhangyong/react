import React, { Component, Fragment } from 'react';//Fragment 可以不被渲染
import { Button } from 'antd';
class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <Button type="primary">Primary Button</Button>
      </Fragment>);
  }
}
export default Home;
