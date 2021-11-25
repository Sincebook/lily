import http from '@/utils/http';

// 测试接口
export function test(params) {
  return http.post('api/admin/code', params);
}

// 查询可提现金额
export function canWithdraw(params) {
    return http.post('api/withdraw/canWithdraw',params)
}

// 提现
export function withdraw(params) {
    return http.post('api/withdraw/withdraw',params)
}

// 查询个人所有提现记录
export function findWithdraws(params) {
    return http.post('api/withdraw/findWithdraws',params)
}

// 给商户打款
export function payToShopper(params) {
    return http.post('api/withdraw/payToShopper',params)
}

// 查找所有商户提现记录(管理员查找)
export function findAll(params) {
    return http.post('api/withdraw/findAll',params)
}