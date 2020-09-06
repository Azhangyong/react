import React, { Component, Fragment } from "react";
//验证propTypes
import PropTypes from "prop-types"
//antd 组件
import { Form, Input, Table, Pagination, Row, Col, Button, message, Modal } from "antd";
//api
import {
  TableList,
  TableDelete
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
      id: "",
      //页码
      total: 0,
      //弹出层
      modalConfirmLoading: false,
      modalVisible: false,
      confirmLoading: false,
      //复选框
      checkBoxValue: [],
      keyWork: ""
    };
  }
  componentDidMount() {
    this.setState({
      data: this.props.config,
    });
    this.loadData();
    //返回子组件实例
    this.props.onRef(this)
  }
  //获取数据
  loadData = () => {
    const { pageSize, pageNumber, keyWork } = this.state;
    const requestData = {
      url: requestUrl[this.props.config.url],
      method: this.props.config.method,
      data: {
        pageSize: pageSize,
        pageNumber: pageNumber,
      }

    }
    if (keyWork) { requestData.data.name = keyWork }
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
  onCheckBox = (value) => {
    this.setState({
      checkBoxValue: value
    })
  }
  /**分页页码 */
  onChangeCurrnePage = (value, pageSize) => {

    this.setState({
      pageNumber: value === 0 ? 1 : value,
      pageSize: pageSize
    }, () => {
      this.loadData()
    })

  }
  //一次请求条数
  onChangeSizePage(value, page) {
    this.setState({
      pageNumber: 1,
      pageSize: page
    }, () => {
      this.loadData()
    })
  }
  hideCancel = () => {
    this.setState({
      visible: false,
    });
  };
  // 数据删除
  onHandlerDelete(id) {
    //判断是否选中数据
    if (this.state.checkBoxValue.length === 0) {
      message.info("请选择需要删除的数据")
      return
    }
    id = this.state.checkBoxValue.join()
    this.setState({
      modalVisible: true,
      id,
    });
  }
  //确认删除
  modalThen = () => {

    this.setState({
      confirmLoading: true,
    });
    const requestData = {
      url: requestUrl[`${this.props.config.url}Delete`],
      data: {
        id: this.state.id
      }

    }
    TableDelete(requestData).then((response) => {
      message.info(response.data.message);
      //请求数据
      this.loadData();
      this.setState({
        modalVisible: false,
        confirmLoading: false,
        id: "",
        rowKeys: [],
      });
    });
  };
  hideCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  onFinish = (values) => {//搜索

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
  render() {
    let { data, dataList, tableLoading, total, modalConfirmLoading, modalVisible } = this.state;
    let { checkbox, rowkey } = this.props.config;
    const rowSelection = {
      onChange: this.onCheckBox,
    };
    return (
      <Fragment>
        <Form name="horizontal_login" layout="inline" onFinish={this.onFinish}  className="paddingB10">
          <Form.Item label="部门名称" name="name">
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
        {/* tabel组件 */}
        <Table
          pagination={false}
          loading={tableLoading}
          rowSelection={checkbox ? rowSelection : null}
          rowKey={rowkey || "id"}
          columns={data.thead}
          dataSource={dataList}
          bordered
          className="paddingB10"
        ></Table>

        <Row >
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
            /></Col>
        </Row>
        {/* 弹窗 */}
        <Modal
          title="提示"
          visible={modalVisible}
          onOk={this.modalThen}
          onCancel={this.hideCancel}
          confirmLoading={modalConfirmLoading}
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
TableComponent.propTypes = {
  config: PropTypes.object
}
//定义默认值
TableComponent.defaultProps = {
  batchButton: false
}
export default TableComponent;
