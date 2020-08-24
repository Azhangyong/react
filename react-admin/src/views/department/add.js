import React, { Component } from "react";
import { Form, Input, Button, InputNumber, Radio, message } from "antd";
//api
import { DepartmentAddApi } from "../../api/department";

class DepartmentAdd extends Component {
  constructor() {
    super();
    this.state = {
      formLayout: {
        labelCol: { span: 3 }, //左边占2 向right 靠齐
        wrapperCol: { span: 20 },
      },
      loading: false,
    };
  }
  onSubmit = (value) => {
    console.log(value);
    if (!value.name) {
      message.error("部门名称不能为空");
      return false;
    }
    if (!value.number || value.number === 0) {
      message.error("人员数量不能为0");
      return false;
    }
    if (!value.content) {
      message.error("描述不能为空");
      return false;
    }
    this.setState({
      loading: true,
    });
    DepartmentAddApi(value)
      .then((response) => {
        const data = response.data;
        message.info(data.message);
        this.setState({
          loading: false,
        });
        this.refs.form.resetFields(); //清空表单
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    let { formLayout } = this.state;
    return (
      <Form
        ref="form"
        onFinish={this.onSubmit}
        initialValues={{ status: true, number: 0 }} //设置默认值
        {...formLayout}
      >
        <Form.Item label="部门名称" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="人员数量" name="number">
          <InputNumber max={100} min={0} />
          {/* //defaultValue={value} 保错现无法解决*/}
        </Form.Item>
        <Form.Item label="禁启用" name="status">
          <Radio.Group>
            <Radio value={false}>禁用</Radio>
            <Radio value={true}>启用</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="描述" name="content">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" loading={this.state.loading} htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default DepartmentAdd;
