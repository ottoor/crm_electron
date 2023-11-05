import http from "@utils/request";

//角色列表
export function rolePage( data ){
    return http.get('/system/role/page',data,{loading:true});
}

//菜单权限树
export function menuTree(){
    return http.get('/system/menu/tree');
}

//添加角色
export function roleAdd( data ){
    return http.post('/system/role/add',data);
}

//删除角色
export function roleDel( data ){
    return http.get(`/system/role/delete/${data}`);
}

//角色详情
export function roleGet( data ){
    return http.get(`/system/role/get/${data}`);
}

//修改角色
export function roleUpdate( data ){
    return http.post('/system/role/update',data);
}