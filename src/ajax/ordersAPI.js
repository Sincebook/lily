import http from '@/utils/http'
// 获取验证码
export function order_Code(obj) {
    return http.post('/api/orders/code', obj);
}

// 生成订单
export function orders_Create(obj) {
    return http.post('/api/orders/create', obj);
}
// 生成订单
export function mhorders_Create(obj) {
    return http.post('/api/orders/mhcreate', obj);
}
// 立即开柜
export function order_Get(obj) {
    return http.post('/api/orders/get', obj);
}
export function mhorder_Get(obj) {
    return http.post('/api/orders/mhget', obj);
}
// 根据商户id查找订单
export function orders_Find(obj) {
    return http.get('/api/orders/findByShopperId', obj);
}

//上传收款码
export function upload(obj) {
    return http.post('/api/orders/upload', obj);
}

//查看收款码
export function look(obj) {
    return http.get('/api/orders/look', obj);
}
