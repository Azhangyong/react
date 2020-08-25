import React, { Component, Fragment } from "react";
//antd 组件
import { Form, Input, Button, message, Table, Switch } from "antd";
//api
import { DepartmentListApi, DepartmentDeleteApi } from "../../api/department";

class DepartmentList extends Component {
  constructor() {
    super();
    this.state = {
      //查询部门名称
      keyWork: "",
      //显示条数
      pageSize: 10,
      //页码
      pageNumber: 1,
      //复选框id
      rowKeys: [],
      //表头
      columns: [
        {
          title: "部门名称",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "禁启用",
          dataIndex: "status",
          key: "status",
          render: (text, record, index) => {
            return (
              <Switch
                checkedChildren="启用"
                unCheckedChildren="禁用"
                defaultChecked={record.status === "1" ? true : false}
                onClick={() => this.switchChange(record.id, record.status)}
              />
            );
          },
        },
        {
          title: "人员数量",
          dataIndex: "number",
          key: "number",
        },
        {
          title: "操作",
          dataIndex: "operation",
          key: "operation",
          width: 215,
          render: (text, record) => {
            return (
              <div className="inline-button">
                <Button type="primary">编辑</Button>
                <Button onClick={() => this.onHandlerDelete(record.id)}>
                  删除
                </Button>
              </div>
            );
          },
        },
      ],
      //表数据
      data: [],
    };
  }
  //禁启用按钮
  switchChange = (id, status) => {
    console.log(id, status);
  };
  // 数据删除
  onHandlerDelete = (id) => {
    if (!id) {
      return false;
    }
    DepartmentDeleteApi({ id }).then((response) => {
      message.info(response.data.message);
      //请求数据
      this.loadData();
    });
  };
  //生命周期 挂载完成
  componentDidMount() {
    this.loadData();
  }
  //获取数据
  loadData = () => {
    const { pageSize, pageNumber, keyWork } = this.state;
    const requestData = {
      pageSize,
      pageNumber,
    };
    if (keyWork) {
      requestData.name = keyWork;
    }

    DepartmentListApi(requestData).then((response) => {
      const dataList = response.data.data; //数据
      if (response) {
        //返回一个null
        this.setState({
          data: dataList.data,
        });
      }
    });
    // {
    //   key: "1",
    //   name: "123",
    //   status: false,
    //   number: 50,
    // },
  };
  onFinish = (values) => {
    if (!values.name) {
      message.info("请输入查询部门名称!!");
      return false;
    }
    this.setState({
      keyWork: values.name,
      pageSize: 10,
      pageNumber: 1,
    });
    //请求数据
    this.loadData();
  };
  /**
   * 复选框
   */
  onCheckBox = (rowKeys, rows) => {
    this.setState({
      rowKeys,
    });
    console.log(rowKeys, rows);
  };
  render() {
    const { columns, data } = this.state;
    const rowSelection = {
      onChange: this.onCheckBox,
    };
    return (
      <Fragment>
        <Form name="horizontal_login" layout="inline" onFinish={this.onFinish}>
          <Form.Item label="部门名称" name="name">
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
        <div className="table-wrap">
          <Table
            rowSelection={rowSelection}
            rowKey="id"
            columns={columns}
            dataSource={data}
            bordered
          ></Table>
          <Button type="primary">批量删除</Button>
        </div>
      </Fragment>
    );
  }
}
export default DepartmentList;
