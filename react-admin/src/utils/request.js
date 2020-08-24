import axios from "axios";
//获取存储数据
import { getToken, getUsername } from "./cookes";
import { message } from "antd";
//拦截器 第一步，创建实例

const service = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 5000,
});
//第二步，请求拦截
service.interceptors.request.use(
  function (config) {
    //发送前 操作
    config.headers["Token"] = getToken();
    config.headers["Username"] = getUsername();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
//第三步，响应拦截
// Add a response interceptor
service.interceptors.response.use(
  function (response) {
    const data = response.data
    if (data.resCode === 0) {//数据成功
      return response;
    } else {//全局错误拦截
      message.info(data.message)
      return Promise.reject(response);
    }

  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
export default service;
