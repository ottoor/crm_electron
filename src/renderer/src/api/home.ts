import http from "@utils/request";

//任务列表
export const taskPage = ( )=>{
    return http.get('/crm/task/page')
}
