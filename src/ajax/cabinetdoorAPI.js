import http from '@/utils/http';

//扫码查询柜门中货物信息
export function cabinetdoor_look(params) {
    return http.post('api/cabinetdoor/look', params);
}