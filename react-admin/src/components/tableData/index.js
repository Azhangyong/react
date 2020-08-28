import React, { Component } from "react";
//antd 组件
import { Table } from "antd";
//api
import {
  DepartmentListApi,
  DepartmentDeleteApi,
  DepartmentStatusApi,
} from "@/api/department";
class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableLoading: false,
      pageNumber: 1,
      pageSize: 10,
      //查询部门名称
      keyWork: "",
      //数据
      data: [],
      //请求数据地址
      dataUrl: "",
    };
  }
  componentDidMount() {
    this.setState({
      dataUrl: this.props.url,
    });
    this.loadData();
  }
  //获取数据
  loadData = () => {
    const { pageSize, pageNumber, keyWork,dataUrl } = this.state;
    const requestData = {
      pageSize,
      pageNumber,
    };
    if (keyWork) {
      requestData.name = keyWork;
    }
    this.setState({
      tableLoading: true,
    });
    DepartmentListApi(requestData,this.props.url)
      .then((response) => {
        const dataList = response.data.data; //数据
        if (response) {
          //返回一个null
          this.setState({
            data: dataList.data,
          });
        }
        this.setState({
          tableLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          tableLoading: false,
        });
      });
  };
  render() {
    let { tableLoading, data } = this.state;
    let { columns, rowSelection } = this.props;
    return (
      <Table
        loading={tableLoading}
        rowSelection={rowSelection}
        rowKey="id"
        columns={columns}
        dataSource={data}
        bordered
      ></Table>
    );
  }
}
export default TableComponent;
