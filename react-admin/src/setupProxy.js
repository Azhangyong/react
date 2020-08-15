const { createProxyMiddleware } = require("http-proxy-middleware")
module.exports = function (app) {
    app.use(createProxyMiddleware("/devApi", {
        target: "http://www.web-jshtml.cn/api/react",//配置请求地址
        changeOrigin: true,
        pathRewrite:{//把/devApi替换成空
            "^/devApi":"",
        }
    }))
    // app.use(proxy("/manage/api",{
    //     target:"http://admintest.happymmall.com:7000",
    //     changeOrigin:true,
    // }))
}