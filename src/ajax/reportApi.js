import http from '@/utils/http';

// 
export function findReport(params) {
    return http.post('api/report/findReport', params);
  }
export function findReports(params) {
  return http.post('api/report/findReports', params);
}