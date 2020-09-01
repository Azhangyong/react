import React, { Component, Fragment } from "react";
//验证propTypes
import PropTypes from "prop-types"
//antd 组件
import { Table, Pagination, Row, Col, Button } from "antd";
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
      dataList: [],
      //页码
      total: 0
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
            total: dataList.total
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
  /**分页页码 */
  onChangeCurrnePage = (value, pageSize) => {
    console.log(value, pageSize)
    this.setState({
      pageNumber: value,
      pageSize: pageSize
    }, () => {
      this.loadData()
    })

  }
  //一次请求条数
  onChangeSizePage(value, page) {
    console.log(123)
    // this.setState({
    //   pageNumber: 1,
    //   pageSize: page
    // }, () => {
    //   this.loadData()
    // })
  }

  render() {
    let { data, dataList, tableLoading, total } = this.state;
    let { checkbox, rowkey } = this.props.config;
    const rowSelection = {
      onChange: this.onCheckBox,
    };
    console.log(typeof total)
    return (
      <Fragment>
        <Table
          pagination={false}
          loading={tableLoading}
          rowSelection={checkbox ? rowSelection : null}
          rowKey={rowkey || "id"}
          columns={data.thead}
          dataSource={dataList}
          bordered
        ></Table>

        <Row>
          <Col span={8}>  {this.props.batchButton && <Button type="primary" onClick={() => this.onHandlerDelete()}>
            批量删除
          </Button>}</Col>
          <Col span={16}>
            <Pagination
            
              onChange={this.onChangeCurrnePage}
              className="pull-right"
              total={total}
              showSizeChanger
              showQuickJumper
              showTotal={total => `数据共${total}条`}
              defaultCurrent={1}
            /></Col>
        </Row>
      </Fragment>

    );
  }
}
TableComponent.propTypes = {
  config: PropTypes.object
}
//定义默认值
TableComponent.defaultProps = {
  batchButton: false
}
export default TableComponent;
