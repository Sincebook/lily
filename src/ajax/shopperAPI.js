import http from '@/utils/http';

// 测试接口
export function test(params) {
  return http.post('api/admin/code', params);
}
// 根据商户id查找shopper
// export function findById(params) {
//     return http.get('/api/shopper/findById', params);
// }
  
export function findById(params) {
    return http.get('/api/shopper/findById',params)
}
// 修改shopper信息
export function modifyById(params) {
    return http.post('/api/shopper/modifyById', params);
}