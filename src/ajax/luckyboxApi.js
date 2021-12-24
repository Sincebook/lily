import http from '@/utils/http'

// 添加收货信息
export function addInfo(obj) {
    return http.post('/api/info/add', obj);
}

// 用户查询自己的收货信息
export function getInfo(obj) {
    return http.get('/api/info/get', obj);
}

// 用户查询自己的收货信息
export function delInfo(obj) {
    return http.post('/api/info/delete', obj);
}

// 完善收货信息
export function finishInfo(obj) {
    return http.post('/api/record/addInfo', obj);
}

// 发货
export function sendInfo(obj) {
    return http.post('/api/record/send', obj);
}

// 修改收货信息
export function modifyInfo(obj) {
    return http.post('/api/record/modify', obj);
}

// 查询用户抽奖记录
export function findInfo(obj) {
    return http.get('/api/record/findByWxuserId', obj);
}

// 生成线上订单
export function createOnline(obj) {
    return http.post('/api/orders/onlinecreate', obj);
}

// 抽奖
export function getOnline(obj) {
    return http.post('/api/orders/onlineget', obj);
}
export function findAll(obj) {
    return http.get('/api/record/findAll', obj);
}
