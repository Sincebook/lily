import http from "@/utils/http";

export function cabinetdoor_findByCabinetNum(params) {
    return http.get('cabinetdoor/findByCabinetNum', params);
}
