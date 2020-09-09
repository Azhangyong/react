import React, { Component, Fragment } from "react";
import {  message } from "antd";
//api
import {
  DepartmentAddApi,
  DepartmentDetailApi,
  DepartmentEditApi,
} from "@/api/department";
//组件
import FormCom from "@/components/form/index";
class DepartmentAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formLayout: {
        labelCol: { span: 3 }, //左边占2 向right 靠齐
        wrapperCol: { span: 20 },
      },
      loading: false,
      id: "",
      fromConfig: {
        url: "departmentAdd",
      },
      formItem: [
        {
          type: "Input",
          label: "部门名称",
          name: "name",
          required: true,
          style: { width: "200px" },
          placeholder: "请输入部门名称",
        },
        {
          type: "InputNumber",
          label: "人员数量",
          name: "number",
          required: true,
          style: { width: "200px" },
          placeholder: "请输入人员数量",
          min: 0,
          max: 100,
        },
        {
          type: "Radio",
          label: "禁启用",
          name: "status",
          required: true,
          options: [
            { label: "禁用", value: false },
            { label: "启用", value: true },
          ],
        }, {
          type: "TextArea",
          label: "描述",
          name: "content",
          required: true,
          style: { width: "400px" },
          placeholder: "请输入描述",
        },
        // {
        //   type: "Select",
        //   label: "部门名称a",
        //   name: "namea",
        //   required: true,
        //   options: [
        //     { label: "研发部", value: "a" },
        //     { label: "行政部", value: "b" },
        //   ],
        //   style: {
        //     width: "150px",
        //   },
        //   placeholder: "请选择部门",
        // },
      ],
    };
  }
  componentWillMount() {
    if (!this.props.location.state) {
      return false;
    }
    this.setState({
      id: this.props.location.state.id,
    });
  }
  componentDidMount() {
    this.detail();
  }
  detail = () => {
    if (!this.props.location.state) {
      return false;
    }
    DepartmentDetailApi({ id: this.state.id }).then((response) => {
      let { name, number, state, content } = response.data.data;
      this.refs.form.setFieldsValue({
        name,
        number,
        state,
        content,
      });
    });
  };
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
  };
  //编辑
  onEdit = (value) => {
    value.id = this.state.id;
    DepartmentEditApi(value)
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
    let { formLayout, fromConfig, formItem } = this.state;
    return (
      <Fragment>
        <FormCom
          fromItem={formItem}
          formLayout={formLayout}
          fromConfig={fromConfig}
        />
      </Fragment>
    );
  }
}

export default DepartmentAdd;
