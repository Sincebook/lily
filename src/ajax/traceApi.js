import http from '@/utils/http';

// 测试接口
export function trace_add(params) {
  return http.post('api/trace/add', params);
}