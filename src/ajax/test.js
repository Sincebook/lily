import http from '@/utils/http';

// 测试接口
export function test(params) {
  return http.post('api/admin/code', params);
}
export function testpay(params) {
  return http.post('api/pay/wxpay', params);
}


