import React, { Component } from "react"
import { MenuFoldOutlined } from "@ant-design/icons"
//css
import './aside.scss';
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: props.collapsed
        }
    }
    toggleMenu = () => {
        this.props.toggle()
        console.log(this.state.collapsed)
    }
    //生命周期监听 父级传值
    componentWillReceiveProps({ collapsed }) {
        this.setState({
            collapsed
        })
    }
    render() {
        const { collapsed } = this.state
        return (<div className={collapsed ? "close" : ""}>
            <h1 className="logo">
                <span>LOGO</span>
            </h1>
            <div className="header-worp">
                <span className="collapsed-icon" onClick={this.toggleMenu}><MenuFoldOutlined /></span>
            </div>
        </div>)
    }
}