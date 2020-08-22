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
    this.state = {};
  }
  render() {
    return (
      <Layout className="layout-wrap">
        <Header className="layout-header">
          <LayoutHeader></LayoutHeader>
        </Header>
        <Layout>
          <Sider width="250">
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
