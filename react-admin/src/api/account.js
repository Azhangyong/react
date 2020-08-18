import service from "../utils/request"
/**
 * 登录接口
 */
export function Login(data){
   return service.request({
        url:"/login/",
        method:"post",
        data,
        // params:data//type 为get
    })
}
//获取验证码
export function GetCode(data){
    return service.request({
         url:"/getSms/",
         method:"post",
         data,
         // params:data//type 为get
     })
 }
 //注册
export function Register(data){
    return service.request({
         url:"/register/",
         method:"post",
         data,
         // params:data//type 为get
     })
 }