import http from "@/utils/http";

export function cabinetdoor_add(params) {
    return http.post('cabinetdoor/add', params);
}

export function cabinet_addInfo(params) {
    return http.post('cabinet/addInfo', params);
}

export function cabinetdoor_findByCabinetNum(params) {
    return http.get('cabinetdoor/findByCabinetNum', params);
}

export function goods_findByShopperId(params) {
    return http.get('goods/findByShopperId', params);
}
