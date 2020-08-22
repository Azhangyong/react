import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom"
//antd
import {
    UserOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
//路由
import Router from "../../router/index"
const { SubMenu } = Menu;

export default class AsideMenu extends Component {
    constructor() {
        super();
        this.state = {};
    }
    renderMenu = ({ title, key }) => {
        return <Menu.Item key={key}>
            <Link to={key}><span>{title}</span></Link>
        </Menu.Item>
    }
    renderSubMenu = ({ title, key, children }) => {
        return (<SubMenu key={key} icon={<UserOutlined />} title={title}>
            {children && children.map(item => {
                return item.children && item.children.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item)
            })}
        </SubMenu>)
    }
    render() {
        return (
            <Fragment>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        Router && Router.map(item => {
                            return item.children && item.children.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item)
                        })
                    }


                </Menu>
            </Fragment>
        );
    }
}