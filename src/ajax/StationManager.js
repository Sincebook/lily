import http from "@/utils/http";

export function cabinet_findByShopperId(params) {
    return http.get('cabinet/findByShopperId', params);
}
