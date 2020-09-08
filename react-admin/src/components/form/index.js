import React, { Component } from "react";
import { Form, Input, Button, message, Select } from "antd";
const { Option } = Select;
// import FormList from "antd/lib/form/FormList";
class FormCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formLayout: {
        labelCol: { span: 3 }, //左边占2 向right 靠齐
        wrapperCol: { span: 20 },
      },
    };
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
    this.state.id ? this.onEdit(value) : this.onAdd(value);
  };

  //初始化
  initFormItem = () => {
    const { fromItem } = this.props;
    if (!fromItem || fromItem.length === 0) {
      return false;
    }
    const FromList = [];
    fromItem.map((item) => {
      if (item.type === "input") {
        FromList.push(this.inputElem(item));
      } else if (item.type === "Select") {
        FromList.push(this.SelectElem(item));
      }
    });
    return FromList;
  };
  rules = (item) => {
    let rules = [];
    //是否必填
    if (item.required) {
      let message = item.message || `${item.label}不能为空!!`;
      rules.push({
        required: true,
        message,
      });
    }
    if (item.rules && item.rules.length > 0) {
      rules = rules.concat(item.rules);
    }
    return rules;
  };
  inputElem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <Input />
      </Form.Item>
    );
  };
  SelectElem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <Select>
          {item.options &&
            item.options.map((item) => {
              return <Option valeu={item.value}>{item.label}</Option>;
            })}
          {/* <Option></Option> */}
        </Select>
      </Form.Item>
    );
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
        {/* <Form.Item label="部门名称" name="name">
                    <Input />
                </Form.Item> */}
        {this.initFormItem()}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default FormCom;
