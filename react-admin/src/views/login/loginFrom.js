import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router-dom'
import { Form, Input, Button, Row, Col } from 'antd'; //antd
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
//公共验证
import { validate_password, validate_email } from '../../utils/validate';
//api
import { Login } from '../../api/account.js';
//组件
import Code from "../../components/code/index"
//密码加密
import CryptoJs from "crypto-js"
//方法
import {setToken} from "../../utils/session"
class LoginFrom extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      passwoed: "",
      code: "",
      module: "login",
      loading:false
    };
    //react 没有数据双向绑定的概念
  }
  //登录
  onFinish = (values) => {
    const requestData={
      username:this.state.username,
      password:CryptoJs.MD5(this.state.password).toString(),
      code:this.state.code
    }
    this.setState({
      loading:true
    })
    Login(requestData)
      .then((response) => {
        this.setState({
          loading:false
        })
        setToken(response.data.data.token)//存token
        //路由跳转
       this.props.history.push("./index")
      })
      .catch((error) => {
        this.setState({
          loading:false
        })
      });
  };

  //input输入数据处理
  inputChangeUsername = (e) => {
    //e.persist()其实真正的原因是因为React里面的事件并不是真实的DOM事件，而是自己在原生DOM事件上进行了封装与合成。
    //合成事件是由事件池来管理的，合成事件对象可能会被重用，合成事件的所有属性也会随之被清空。所以当在异步处理程序（如setTimeout等等）
    //中或者浏览器控制台中去访问合成事件的属性，默认react 会把其属性全部设为null。
    //e.persist()，其实就是将当前的合成事件从事件池中移除了
    let username = e.target.value;
    this.setState({
      username,
    });
  };
  inputChangePassword = (e) => {
    //e.persist()其实真正的原因是因为React里面的事件并不是真实的DOM事件，而是自己在原生DOM事件上进行了封装与合成。
    //合成事件是由事件池来管理的，合成事件对象可能会被重用，合成事件的所有属性也会随之被清空。所以当在异步处理程序（如setTimeout等等）
    //中或者浏览器控制台中去访问合成事件的属性，默认react 会把其属性全部设为null。
    //e.persist()，其实就是将当前的合成事件从事件池中移除了
    let password = e.target.value;
    this.setState({
      password,
    });
  }; inputChangeCode = (e) => {
    //e.persist()其实真正的原因是因为React里面的事件并不是真实的DOM事件，而是自己在原生DOM事件上进行了封装与合成。
    //合成事件是由事件池来管理的，合成事件对象可能会被重用，合成事件的所有属性也会随之被清空。所以当在异步处理程序（如setTimeout等等）
    //中或者浏览器控制台中去访问合成事件的属性，默认react 会把其属性全部设为null。
    //e.persist()，其实就是将当前的合成事件从事件池中移除了
    let code = e.target.value;
    this.setState({
      code,
    });
  };
  toggleFrom = () => {
    //调用父级传过来的方法
    this.props.switchForm('register');
  };
  render() {
    const {
      username,
      module,
      loading
    } = this.state;
    let _this = this;
    return (
      <Fragment>
        <div className="from-header">
          <h4 className="colum">登录</h4>
          <span onClick={this.toggleFrom}>账号注册</span>
        </div>
        <div className="form-content">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '邮箱不能为空!' },
                // {type: 'email', message: '邮箱格式不正确'},
                ({ getFieldValue }) => ({
                  //监听 密码框输入的值es6 结构
                  validator(rule, value) {
                    if (validate_email(value)) {
                      _this.setState({
                        code_button_disabled: false,
                      });
                      return Promise.resolve();
                    } else {
                      _this.setState({
                        code_button_disabled: true,
                      });
                    }
                    return Promise.reject('邮箱格式不正确');
                  },
                }),
              ]}
            >
              <Input
                value={username}
                onChange={this.inputChangeUsername}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: '密码不能为空!' },
                { min: 6, message: '密码格式不正确' },
                {
                  max: 20,
                  message: '密码不能大于20位',
                },
                {
                  pattern: validate_password,
                  message: '请输入6到20位的数字加子母密码',
                },
                // ({getFieldValue}) => ({
                //   //监听 密码框输入的值es6 结构
                //   validator(rule, value) {
                //     console.log(value);

                //     // if (value.length < 6) {

                //     // } else {
                //     //   return Promise.resolve();
                //     // }
                //     return Promise.reject('密码格式不正确');
                //   },
                // }),
              ]}
            >
              <Input
                onChange={this.inputChangePassword}
                type="password"
                prefix={<UnlockOutlined className="site-form-item-icon" />}
                placeholder="字母+数字,大于6位，小于20位"
              />
            </Form.Item>
            <Form.Item
              name="Code"
              rules={[
                { required: true, message: '请输入6位验证码!', len: 6 }
              ]}
            >
              <Row gutter={13}>
                <Col span={15}>
                  <Input
                    onChange={this.inputChangeCode}
                    prefix={<UnlockOutlined className="site-form-item-icon" />}
                    placeholder="Code"
                  />
                </Col>
                <Col span={9}>
                  <Code username={username} module={module}></Code>

                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                loading={loading}
                htmlType="submit"
                className="login-form-button"
                block
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(LoginFrom);
