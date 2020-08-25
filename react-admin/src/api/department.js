import service from "../utils/request";
/**
 * 增加
 */
export function DepartmentAddApi(data) {
  return service.request({
    url: "/department/add/",
    method: "post",
    data,
    // params:data//type 为get
  });
}
/**
 * 部门列表
 */
export function DepartmentListApi(data) {
  return service.request({
    url: "/department/list/",
    method: "post",
    data,
    // params:data//type 为get
  });
}
/*
 * 删除部门
 */
export function DepartmentDeleteApi(data) {
  return service.request({
    url: "/department/delete/",
    method: "post",
    data,
    // params:data//type 为get
  });
}
