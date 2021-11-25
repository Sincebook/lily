import http from '@/utils/http'
// 查询所有商户收入
export function findAllEarnings(obj) {
    return http.get('/api/orders/findAllEarnings', obj);
}
// 查找商户某天(整天)的收入
export function findByDay(obj) {
    return http.get('/api/orders/findByDay', obj);
}
// 查找商户某月(整月)的收入
export function findByMonth(obj) {
    return http.get('/api/orders/findByMonth', obj);
}
// 查找商户的收入
export function findEarningsByshopperId(obj) {
    return http.get('/api/orders/findEarningsByshopperId', obj);
}