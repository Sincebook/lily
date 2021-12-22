import http from '@/utils/http'

// 添加收货信息
export function addInfo(obj) {
    return http.get('/api/info/add', obj);
}

// 用户查询自己的收货信息
export function getInfo(obj) {
    return http.get('/api/info/get', obj);
}

// 用户查询自己的收货信息
export function getInfo(obj) {
    return http.get('/api/info/get', obj);
}

// 用户查询自己的收货信息
export function delInfo(obj) {
    return http.get('/api/info/delete', obj);
}

// 查询C
export function delInfo(obj) {
    return http.get('/api/info/delete', obj);
}