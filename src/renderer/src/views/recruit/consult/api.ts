import http from "@utils/request";

//导入客户
export function consultImport( data ){
    return http.post('/crm/recruit/consult/import',data);
}

//客户列表
export function consultPage( data ){
    return http.get('/crm/recruit/consult/page',data);
}

//我的成交额
export function transaction( data ){
    return http.get('/crm/recruit/channel/statistic/transaction',data);
}

//漏斗图
export function statisticFunnel( data ){
    return http.get('/crm/recruit/channel/statistic/funnel',data);
}
