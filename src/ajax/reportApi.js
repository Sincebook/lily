import http from '@/utils/http';

// 
export function findReport(params) {
    return http.get('api/report/findReport', params);
  }
export function findReports(params) {
  return http.get('api/report/findReports', params);
}
export function findRich(params) {
  return http.get('api/report/findRich', params);
}
export function findLucky(params) {
  return http.get('api/report/findLucky', params);
}
