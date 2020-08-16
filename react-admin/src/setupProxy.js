const { createProxyMiddleware } = require("http-proxy-middleware")
module.exports = function (app) {
    // app.use(createProxyMiddleware([process.env.REACT_APP_API], {es6写法配置环境变量后使用
    app.use(createProxyMiddleware([process.env.REACT_APP_API], {
        target: process.env.REACT_APP_BASE_URL,//配置请求地址
        changeOrigin: true,
        pathRewrite: {//把/devApi替换成空
            [`^${process.env.REACT_APP_API}`]:"",//[`^${process.env.REACT_APP_API}`]:""{es6写法配置环境变量后使用
        }
    }))
    // app.use(proxy("/manage/api",{
    //     target:"http://admintest.happymmall.com:7000",
    //     changeOrigin:true,
    // }))
}
/**
 * 1.匹配到devApi,开始做代理 http://www.web-jshtml.cn/api/react
 * 2./devApi/login/ 替换成/login/
 * 3.替换过后的地址http://www.web-jshtml.cn/api/react/login/
 */