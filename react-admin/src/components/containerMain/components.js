//获取文件
const files = require.context("../../views", true, /\.js$/);
//声明组件
const components = [];
//循环文件
files.keys().map((key) => {
  //过滤文件
  if (key.includes("/index/") || key.includes("/login/")) {
    return false;
  }
  //分割字符
  const splitFilesName = key.split(".");
  //拼接路由
  const path = `/index${splitFilesName[1].toLowerCase()}`;
  //拿到跳转路由组件
  const component = files(key).default;
  //赋值
  return components.push({ path, component });
});
export default components;
