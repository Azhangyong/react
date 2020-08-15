import axios from "axios"
//拦截器 第一步，创建实例
const service = axios.create({
    baseURL: 'devApi',
    timeout: 5000,
});
//第二步，请求拦截
service.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
//第三步，响应拦截
// Add a response interceptor
service.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
export default service

