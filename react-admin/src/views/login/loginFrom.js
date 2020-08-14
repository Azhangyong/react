import React, {Component, Fragment} from 'react';
import './index.scss'; //css
import {Form, Input, Button, Row, Col} from 'antd'; //antd
import {UserOutlined, UnlockOutlined} from '@ant-design/icons';
class LoginFrom extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onFinish = (values) => {
    console.log(values);
  };
  toggleFrom = () => {
    //调用父级传过来的方法
    this.props.switchForm('register');
  };
  render() {
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
            initialValues={{remember: true}}
            onFinish={() => this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {required: true, message: '邮箱不能为空!'},
                {type: 'email', message: '邮箱格式不正确'},
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {required: true, message: '密码不能为空!'},
                // {min:6,message:"密码格式不正确"},{
                // max:20,message:"密码不能大于20位"
                // },{
                //   pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,message:"请输入6到20位的密码"
                // }
                ({getFieldValue}) => ({
                  //监听 密码框输入的值es6 结构
                  validator(rule, value) {
                    console.log(getFieldValue('password'));

                    if (value.length < 6) {
                      return Promise.reject('密码格式不正确');
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input
                prefix={<UnlockOutlined className="site-form-item-icon" />}
                placeholder="字母+数字,大于6位，小于20位"
              />
            </Form.Item>
            <Form.Item
              name="Code"
              rules={[{required: true, message: 'Please input your Username!'}]}
            >
              <Row gutter={13}>
                <Col span={15}>
                  <Input
                    prefix={<UnlockOutlined className="site-form-item-icon" />}
                    placeholder="Code"
                  />
                </Col>
                <Col span={9}>
                  <Button type="danger" block>
                    获取验证码
                  </Button>
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
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Fragment>
    );
  }
}

export default LoginFrom;
