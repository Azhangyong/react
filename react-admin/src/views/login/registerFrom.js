import React, { Component, Fragment } from 'react';
import './index.scss'; //css
import { Form, Input, Button, Row, Col } from 'antd'; //antd
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
//组件
import Code from "../../components/code/index"
class RegisterFrom extends Component {
  constructor() {
    super();
    this.state = {
      username: ""
    };
  }
  onFinish = (values) => {
    console.log(values);
  };
  toggleFrom = () => {
    //调用父级传过来的方法
    this.props.switchForm("login")
  }
  render() {
    let { username } = this.state
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
            onFinish={() => this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input
                prefix={<UnlockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="passwords"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input
                prefix={<UnlockOutlined className="site-form-item-icon" />}
                placeholder="Passwords"
              />
            </Form.Item>
            <Form.Item
              name="Code"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Row gutter={13}>
                <Col span={15}>
                  <Input
                    prefix={<UnlockOutlined className="site-form-item-icon" />}
                    placeholder="Code"
                  />
                </Col>
                <Col span={9}>
                  <Code username={username}></Code>
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
