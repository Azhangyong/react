import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
//antd 组件
import { Form, Input, Button, message, Switch, Modal } from "antd";
//api
import {

  DepartmentDeleteApi,
  DepartmentStatusApi,
} from "../../api/department";
//table 组件
import TableComponent from "@/components/tableData/index";
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
      //id
      id: "",
      //复选框id
      rowKeys: [],
      //表数据
      data: [],
      //弹出层
      visible: false,
      confirmLoading: false,
      selectId: "",
      tableLoading: false,
      tableConfig: {
        url: "departmentList",
        checkbox: true,
        method: "post",
        rowkey: "id",
        thead: [
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
                  loading={record.id === this.state.selectId}
                  checkedChildren="启用"
                  unCheckedChildren="禁用"
                  defaultChecked={record.status === "1" ? true : false}
                  onChange={() => this.switchChange(record.id, record.status)}
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
                  <Button type="primary">
                    <Link
                      to={{
                        pathname: "/index/department/add",
                        state: { id: record.id },
                      }}
                    >
                      编辑
                    </Link>
                  </Button>
                  <Button onClick={() => this.onHandlerDelete(record.id)}>
                    删除
                  </Button>
                </div>
              );
            },
          },
        ],
      }
    };
  }
  //禁启用按钮
  switchChange = (id, statusx) => {
    if (!id) {
      return false;
    }
    this.setState({
      selectId: id,
    });
    let status = statusx === "1" ? false : true;
    DepartmentStatusApi({ id, status })
      .then((response) => {
        message.info(response.data.message);
        this.loadData();
        this.setState({
          selectId: "",
        });
      })
      .catch((error) => {
        this.setState({
          selectId: "",
        });
      });
  };
  //确认删除
  modalThen = () => {
    this.setState({
      confirmLoading: true,
    });
    DepartmentDeleteApi({ id: this.state.id }).then((response) => {
      message.info(response.data.message);
      //请求数据
      this.loadData();
      this.setState({
        visible: false,
        confirmLoading: false,
        id: "",
        rowKeys: [],
      });
    });
  };
  hideCancel = () => {
    this.setState({
      visible: false,
    });
  };

  // 数据删除
  onHandlerDelete(id) {
    if (!id) {
      if (this.state.rowKeys.length === 0) {
        return false;
      }
      id = this.state.rowKeys.join(); //转成字符串
    }
    this.setState({
      visible: true,
      id,
    });
  }

  onFinish = (values) => {
    if (this.state.tableLoading) {
      return false;
    }
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
  };
  render() {
    let { confirmLoading } = this.state
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
          <TableComponent config={this.state.tableConfig} />
          {/* <Table
            loading={tableLoading}
            rowSelection={rowSelection}
            rowKey="id"
            columns={columns}
            dataSource={data}
            bordered
          ></Table> */}
          <Button type="primary" onClick={() => this.onHandlerDelete()}>
            批量删除
          </Button>
        </div>
        <Modal
          title="提示"
          visible={this.state.visible}
          onOk={this.modalThen}
          onCancel={this.hideCancel}
          confirmLoading={confirmLoading}
          okText="确认"
          cancelText="取消"
        >
          <p className="text-center">
            确定删除此信息？
            <strong className="color-red">删除后将无法恢复。</strong>
          </p>
        </Modal>
      </Fragment>
    );
  }
}
export default DepartmentList;
