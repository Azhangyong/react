import React, { Component } from "react";
//antd 组件
import { Table } from "antd";
//api
import {
  TableList
} from "@/api/common";

import requestUrl from "@/api/requestUrl"
class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableLoading: false,
      pageNumber: 1,
      pageSize: 10,
      //数据
      data: [],
      dataList: []
    };
  }
  componentDidMount() {
    this.setState({
      data: this.props.config,
    });
    this.loadData();
  }
  //获取数据
  loadData = () => {
    const { pageSize, pageNumber } = this.state;
    const requestData = {
      url: requestUrl[this.props.config.url],
      method: this.props.config.method,
      data: {
        pageSize: pageSize,
        pageNumber: pageNumber,
      }

    }

    TableList(requestData)
      .then((response) => {
        const dataList = response.data.data; //数据
        if (response) {
          //返回一个null
          this.setState({
            dataList: dataList.data,
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
  /**复选框 */
  onCheckbox = (value) => {
    console.log(value)
  }
  render() {
    let { data, dataList, tableLoading } = this.state;
    let { checkbox, rowkey } = this.props.config;
    const rowSelection = {
      onChange: this.onCheckBox,
    };
    return (
      <Table
        loading={tableLoading}
        rowSelection={checkbox ? rowSelection : null}
        rowKey={rowkey || "id"}
        columns={data.thead}
        dataSource={dataList}
        bordered
      ></Table>
    );
  }
}
export default TableComponent;
