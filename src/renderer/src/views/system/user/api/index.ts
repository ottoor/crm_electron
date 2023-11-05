import http from "@utils/request";

//用户列表
export function userPage( data ){
    return http.get('/system/user/page', data)
}

//机构列表
export function unitList(){
    return http.get('/system/unit/list');
}

//岗位列表
export function postPage(){
    return http.get('/system/post/page');
}

//角色列表
export function rolePage(){
    return http.get('/system/role/page');
}

//添加用户
export function userAdd( data ){
    return http.post('/system/user/add',data);
}

//用户详情
export function userGet( data ){
    return http.get(`/system/user/get/${data}`);
}

//修改用户
export function userUpdate( data ){
    return http.post('/system/user/update',data);
}

//删除用户
export function userDelete( data ){
    return http.get(`/system/user/delete/${data}`);
}

