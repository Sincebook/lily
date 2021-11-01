import http from '@/utils/http'
// 获取验证码
export function order_Code(obj) {
    return http.post('/api/orders/code', obj);
}

// 生成订单
export function orders_Create(obj) {
    return http.post('/api/orders/create', obj);
}
// 立即开柜
export function order_Get(obj) {
    return http.post('/api/orders/get', obj);
}