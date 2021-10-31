import http from '@/utils/http'
// 获取验证码
export function code(obj) {
    return http.post('/api/admin/code', obj);
}

// 管理员登录
export function login(obj) {
    return http.post('/api/admin/login', obj);
}