import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
//antd 组件
import { Button, message, Switch } from "antd";
//api
import { DepartmentStatusApi } from "../../api/department";
//table 组件
import TableComponent from "@/components/tableData/index";
class DepartmentList extends Component {
  constructor() {
    super();
    this.state = {
      //查询部门名称
      keyWork: "",
      //复选框id
      rowKeys: [],
      //表数据
      data: [],
      selectId: "",
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
                  {/* 在父组件获取子组件的实例
                  1.在子组件调用父组件的方法，并将子组件实例传回父组件
                  2.通过实例调用子组件的方法
                  
                  */}
                </div>
              );
            },
          },
        ],
        formItem: [
          {
            type: "Input",
            label: "部门名称",
            name: "name",
            placeholder: "请输入部门名称",
          },

          {
            type: "Select",
            label: "禁启用",
            name: "status",
            placeholder: "请输入",
            style: { width: "100px" },
            option: "status",
          },
        ],
      },
    };
  }
  //获取子组件
  getChildren = (ref) => {
    this.TableComponent = ref; //存储子组件
  };
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

  onCheckBox = (rowKeys, rows) => {
    this.setState({
      rowKeys,
    });
  };
  //删除
  onHandlerDelete = (id) => {
    this.TableComponent.onHandlerDelete(id);
  };
  render() {
    return (
      <Fragment>
        <div className="table-wrap">
          <TableComponent
            onRef={this.getChildren}
            batchButton={true}
            config={this.state.tableConfig}
          />
        </div>
      </Fragment>
    );
  }
}
export default DepartmentList;
