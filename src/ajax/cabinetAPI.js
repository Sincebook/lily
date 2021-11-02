import http from '@/utils/http';

// 测试接口
export function test(params) {
  return http.post('api/admin/code', params);
}
// 添加柜子
export function add(params) {
    return http.post('api/cabinet/add', params);
}
// 根据柜子id删除柜子
export function deleteById(params) {
    return http.post('api/cabinet/deleteById', params);
}
// 根据商户id查找柜子
export function findByShopperId(params) {
    return http.get('api/cabinet/findByShopperId', params);
}
// 修改柜子的名字
export function modifyName(params) {
    return http.post('api/cabinet/modifyName', params);
}