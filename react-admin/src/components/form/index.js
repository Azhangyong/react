import React, { Component } from "react";
import { Form, Input, Button, message, Select, InputNumber, Radio } from "antd";
//验证propTypes
import PropTypes from "prop-types"
//api
import { requestData } from "@/api/common.js";
//url
import requestUrl from "@/api/requestUrl";
const { Option } = Select;
// import FormList from "antd/lib/form/FormList";
class FormCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mesPreix: {
        Input: "请输入",
        Radio: "请选择",
        Select: "请选择",
        InputNumber: "请输入",
        TextArea: "请输入",
      },
      loading: false,
    };
  }
  onSubmit = (value) => {
    if (value.number === 0) {
      message.info("人员数量为0至100");
      return;
    }
    const data = {
      url: requestUrl[this.props.fromConfig.url],
      data: value,
    };
    this.setState({ loading: true });
    requestData(data).then((response) => {
      const data = response.data;
      message.info(data.message);
      this.setState({ loading: false });
    });
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
      } else if (item.type === "TextArea") {
        FromList.push(this.TextArea(item));
      }
    });
    return FromList;
  };
  rules = (item) => {
    const { mesPreix } = this.state;
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
              return (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
    );
  };
  InputNumberElem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <InputNumber max={item.max} min={item.min} />
      </Form.Item>
    );
  };
  TextArea = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <Input.TextArea style={item.style} />
      </Form.Item>
    );
  };
  RadioElem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <Radio.Group>
          {item.options &&
            item.options.map((item) => {
              return (
                <Radio value={item.value} key={item.value}>
                  {item.label}
                </Radio>
              );
            })}
        </Radio.Group>
      </Form.Item>
    );
  };
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
          <Button type="primary" htmlType="submit" loading={this.state.loading}>
            确定
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
FormCom.propTypes = {
  fromConfig: PropTypes.object
}
//定义默认值
FormCom.defaultProps = {
  fromConfig: {}
}
export default FormCom;
