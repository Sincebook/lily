import http from '@/utils/http';

// 添加商品
export function goodsAdd(params) {
  return http.post('api/goods/add', params);
}
// 删除商品
export function goodsDel(params) {
  return http.post('api/goods/deleteById', params);
}