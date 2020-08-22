import React from 'react';
import { Switch } from 'react-router-dom';
//组件
import User from "../../views/user/index"
import Add from "../../views/user/add"
//路由拦截器
import PrivateRouter from "../privateRouter/index"

class ContainerMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Switch>
                <PrivateRouter exact path="/index/user/list" component={User} />
                <PrivateRouter exact path="/index/user/add" component={Add} />
            </Switch>
        );
    }
}

export default ContainerMain;
