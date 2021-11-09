import http from '@/utils/http';

// 
export function findReport(params) {
    return http.get('api/report/findReport', params);
  }
export function findReports(params) {
  return http.get('api/report/findReports', params);
}