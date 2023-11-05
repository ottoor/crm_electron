import http from "@utils/request";

//导出科目
export function subjectExport(){
    return http.get('/crm/teach/subject/export');
}