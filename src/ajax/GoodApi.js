import http from '@/utils/http';

// 上传图片
export function goodsImg(params) {
  return http.post('api/goods/upload', params);
}
// 添加商品
export function goodsAdd(params) {
  return http.post('api/goods/add', params);
}
// 删除商品
export function goodsDel(params) {
  return http.post('api/goods/deleteById', params);
}