import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
//antd
import { UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
//路由
import Router from "../../router/index";
const { SubMenu } = Menu;

class AsideMenu extends Component {
  constructor() {
    super();
    this.state = {
      selectedKeys: [],
      openKeys: [],
    };
  }
  //生命周期过滤路由
  componentDidMount() {
    const pathname = this.props.location.pathname;
    const menuKey = pathname.split("/").slice(0, 3).join("/");
    this.selectMenuHigh(pathname, menuKey);
  }
  //选择菜单
  selectMenu = ({ key, keyPath }) => {
    this.selectMenuHigh(key, keyPath[keyPath.length - 1]);
  };
  openMenu = (openKeys) => {
    this.setState({
      openKeys: [openKeys[openKeys.length - 1]],
    });
  };
  //菜单高光
  selectMenuHigh = (pathname, menuKey) => {
    this.setState({
      selectedKeys: [pathname],
      openKeys: [menuKey],
    });
  };

  renderMenu = ({ title, key }) => {
    return (
      <Menu.Item key={key}>
        <Link to={key}>
          <span>{title}</span>
        </Link>
      </Menu.Item>
    );
  };
  renderSubMenu = ({ title, key, children }) => {
    return (
      <SubMenu key={key} icon={<UserOutlined />} title={title}>
        {children &&
          children.map((item) => {
            return item.children && item.children.length > 0
              ? this.renderSubMenu(item)
              : this.renderMenu(item);
          })}
      </SubMenu>
    );
  };

  render() {
    let { openKeys, selectedKeys } = this.state;
    return (
      <Fragment>
        <h1 className="logo">
          <span>LOGO</span>
        </h1>
        <Menu
          onClick={this.selectMenu}
          onOpenChange={this.openMenu}
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          style={{ height: "100%", borderRight: 0 }}
        >
          {Router &&
            Router.map((item) => {
              return item.children && item.children.length > 0
                ? this.renderSubMenu(item)
                : this.renderMenu(item);
            })}
        </Menu>
      </Fragment>
    );
  }
}
export default withRouter(AsideMenu);
