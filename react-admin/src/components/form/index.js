import React, { Component } from "react";
import { Form, Input, Button, message, Select, InputNumber, Radio } from "antd";
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
      mesPreix: {
        "Input": "请输入",
        "Radio": "请选择",
        "Select": "请选择"
      }
    };
  }
  onSubmit = (value) => {
    this.props.onSubmit(value)

  };

  //初始化
  initFormItem = () => {
    const { fromItem } = this.props;
    if (!fromItem || fromItem.length === 0) {
      return false;
    }
    const FromList = [];
    fromItem.map((item) => {
      if (item.type === "Input") {
        FromList.push(this.inputElem(item));
      } else if (item.type === "Select") {
        FromList.push(this.SelectElem(item));
      } else if (item.type === "InputNumber") {
        FromList.push(this.InputNumberElem(item));
      } else if (item.type === "Radio") {
        FromList.push(this.RadioElem(item));
      }
    });
    return FromList;
  };
  rules = (item) => {
    const { mesPreix } = this.state
    let rules = [];
    //是否必填
    if (item.required) {
      let message = item.message || `${mesPreix[item.type]}${item.label}!!`;
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
        <Input style={item.style} placeholder={item.placeholder} />
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
        <Select style={item.style} placeholder={item.placeholder}>
          {item.options &&
            item.options.map((item) => {
              return <Option valeu={item.value} key={item.value}>{item.label}</Option>;
            })}
          {/* <Option></Option> */}
        </Select>
      </Form.Item>
    );
  };
  InputNumberElem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}>
        <InputNumber max={item.max} min={item.min} />
      </Form.Item>
    )
  }
  RadioElem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}>
        <Radio.Group>
          {
            item.options && item.options.map(item => {
              return <Radio value={item.value} key={item.value}>{item.label}</Radio>
            })
          }
        </Radio.Group>
      </Form.Item>
    )
  }
  render() {

    return (
      <Form
        ref="form"
        onFinish={this.onSubmit}
        initialValues={{ status: true, number: 0 }} //设置默认值
        {...this.props.formLayout}
      >

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
