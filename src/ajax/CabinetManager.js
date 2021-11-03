import http from "@/utils/http";

export function cabinetdoor_add(params) {
    return http.post('/api/cabinetdoor/add', params);
}

export function cabinet_addInfo(params) {
    return http.post('/api/cabinet/addInfo', params);
}

export function cabinetdoor_findByCabinetNum(params) {
    return http.get('/api/cabinetdoor/findByCabinetNum', params);
}

export function cabinetdoor_get(params) {
    return http.post('/api/cabinetdoor/get', params);
}

export function goods_findByShopperId(params) {
    return http.get('/api/goods/findByShopperId', params);
}
