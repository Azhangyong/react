import React, { Component } from "react";
import { Form, Input, Button, InputNumber, Radio, message } from "antd";
//api
import { DepartmentAddApi, DepartmentDetailApi, DepartmentEditApi } from "@/api/department";

class DepartmentAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formLayout: {
        labelCol: { span: 3 }, //左边占2 向right 靠齐
        wrapperCol: { span: 20 },
      },
      loading: false,
      id: ""
    };
  }
  componentWillMount() {
    if (!this.props.location.state) { return false }
    this.setState({
      id: this.props.location.state.id
    })
  }
  componentDidMount() {
    this.detail()
  }
  detail = () => {
    if (!this.props.location.state) { return false }
    DepartmentDetailApi({ id: this.state.id }).then(response => {
      let { name, number, state, content } = response.data.data
      this.refs.form.setFieldsValue({
        name, number, state, content
      })
    })
  }
  onSubmit = (value) => {
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
    this.state.id ? this.onEdit(value) : this.onAdd(value)
  };
  //添加
  onAdd = (value) => {
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
  }
  //编辑
  onEdit = (value) => {
    value.id = this.state.id
    DepartmentEditApi(value).then((response) => {
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

  }
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
