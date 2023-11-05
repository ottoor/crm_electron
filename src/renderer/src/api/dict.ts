import http from "@utils/request";

//查询字典项（批量）
export function queryBatch( data ){
    return http.post('/system/dict/item/queryBatch',data,{})
}