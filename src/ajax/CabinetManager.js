import http from "@/utils/http";

export function cabinetdoor_add(params) {
    return http.post('/api/cabinetdoor/add', params);
}

export function cabinet_addInfo(params) {
    return http.post('/api/cabinet/addInfo', params);
}

export function cabinet_findInforByCabinetNum(params) {
    return http.post('/api/cabinet/findInforByCabinetNum', params);
}

export function cabinet_findPrice(params) {
    return http.get('/api/cabinet/findPrice', params);
}

export function cabinet_getQRcode(params) {
    return http.post('/api/cabinet/getQRcode', params);
}

export function cabinet_modifyPrice(params) {
    return http.post('/api/cabinet/modifyPrice', params);
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

export function setRate(params) {
    return http.post('/api/cabinetdoor/modifyrate', params);
}