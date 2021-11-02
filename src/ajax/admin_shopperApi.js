import http from '@/utils/http'
// 查找所有shopper
export function findAllShopper(obj) {
    return http.get('/api/shopper/findAll', obj);
}

// 添加商户（管理员添加）
export function addShopper(obj) {
    return http.post('/api/shopper/add', obj);
}

// 删除商户
export function deleteById(obj) {
    return http.post('/api/shopper/deleteById', obj)
}

// 根据商户Id查找柜子
// export function findByShopperId(obj) {
//     return http.get('/api/cabinet/findByShopperId', obj)
// }