import service from "../utils/request"
/**
 * table 列表
 */
export function TableList(params) {
    return service.request({
        url: params.url,
        method: params.method || "post",
        data: params.data,
        // params:data//type 为get
    })
}