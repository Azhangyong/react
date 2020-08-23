import React, { Component } from 'react';
//组件
import Aside from './compenents/aside';
import LayoutHeader from './compenents/header';
import ContainerMain from "../../components/containerMain/index"
//css
import './layout.scss';
//antd
import { Layout } from 'antd';
const { Sider, Header, Content } = Layout;
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }
  componentDidMount() {
    const collapsed = JSON.parse(sessionStorage.getItem("collapsed"))
    this.setState({
      collapsed
    })
  }
  toggloCollapsed = () => {
    const collapsed = !this.state.collapsed
    this.setState({
      collapsed
    })
    sessionStorage.setItem("collapsed", collapsed)
  }
  render() {
    return (
      <Layout className="layout-wrap">
        <Header className="layout-header">
          <LayoutHeader toggle={this.toggloCollapsed} collapsed={this.state.collapsed}></LayoutHeader>
        </Header>
        <Layout>
          <Sider width="250px" collapsed={this.state.collapsed}>
            <Aside></Aside>
          </Sider>
          <Content className="layout-main">
            <ContainerMain />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default Index;
