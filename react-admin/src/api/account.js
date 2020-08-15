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