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
/*
 * 修改状态
 */
export function DepartmentStatusApi(data) {
  return service.request({
    url: "/department/status/",
    method: "post",
    data,
    // params:data//type 为get
  });
}
/*
 * 详情
 */
export function DepartmentDetailApi(data) {
  return service.request({
    url: "/department/detailed/",
    method: "post",
    data,
    // params:data//type 为get
  });
}
/*
 *编辑
 */
export function DepartmentEditApi(data) {
  return service.request({
    url: "/department/edit/",
    method: "post",
    data,
    // params:data//type 为get
  });
}
