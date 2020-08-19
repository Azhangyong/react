import React, { Component, Fragment } from 'react';
import './index.scss'; //css
import { Form, Input, Button, Row, Col, message } from 'antd'; //antd
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
//公共验证
import { validate_ps } from '../../utils/validate';
//组件
import Code from "../../components/code/index"
//接口 
import { Register } from "../../api/account"
//密码加密
import CryptoJs from "crypto-js"
class RegisterFrom extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      passwoed: "",
      code: "",
      module: "register",
     
    };
  }
  onFinish = (values) => {
    const requestData = {
      username: this.state.username,
      password: CryptoJs.MD5(this.state.password).toString(),
      code: this.state.code
    }
    Register(requestData).then(response => {
      const data=response.data
      message.success(data.message)
      if(data.resCode===0){
        this.toggleFrom()
      }
    }).catch(error => {

    })
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
    this.props.switchForm("login")
  }
  render() {
    let { username, module } = this.state
    return (
      <Fragment>
        <div className="from-header">
          <h4 className="colum">注册</h4>
          <span onClick={this.toggleFrom}>登录</span>
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
              onChange={this.inputChange}
              rules={[{ required: true, message: '邮箱不能为空!' },
              { type: 'email', message: '邮箱格式不正确' }
              ]

              }
            >
              <Input
                value={username}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入邮箱"
                onChange={this.inputChangeUsername}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '密码不能为空!' },
              ({ getFieldValue }) => ({
                validator(role, value) {

                  if (!validate_ps(value)) {
                    return Promise.reject("请输入6到20位密码")
                  }
                  if (getFieldValue("passwords") && value !== getFieldValue("passwords")) {
                    return Promise.reject("两次密码不一致")
                  }
                  return Promise.resolve()
                }
              })
              ]}
            >
              <Input
                type="password"
                prefix={<UnlockOutlined className="site-form-item-icon" />}
                placeholder="请输入密码"
                onChange={this.inputChangePassword}
              />
            </Form.Item>
            <Form.Item
              name="passwords"
              rules={[{ required: true, message: '再次确认密码不能为空!' },
              ({ getFieldValue }) => ({
                validator(role, value) {
                  if (value !== getFieldValue("password")) {
                    return Promise.reject("密码不一致")
                  }
                  return Promise.resolve()
                }
              })]}
            >
              <Input
                type="password"
                prefix={<UnlockOutlined className="site-form-item-icon" />}
                placeholder="请再次输入密码"
              />
            </Form.Item>
            <Form.Item
              name="Code"
              rules={[{ required: true, message: '请输入6位验证码!', len: 6 },
              ]}
            >
              <Row gutter={13}>
                <Col span={15}>
                  <Input
                    prefix={<UnlockOutlined className="site-form-item-icon" />}
                    placeholder="请输入验证码"
                    onChange={this.inputChangeCode}
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
                htmlType="submit"
                className="login-form-button"
                block
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Fragment>
    );
  }
}
export default RegisterFrom;
