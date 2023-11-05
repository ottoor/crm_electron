import http from "@utils/request";

//通讯录
export function chatContacts( data ){
    return http.get('/crm/chat/contacts',data,{})
}

//会话列表
export function chatSessions( data ){
    return http.get('/crm/chat/sessions',data,{})
}

//获取会话
export function chatSession( fromUserId , toUserId ){
    return http.get(`/crm/chat/session/${fromUserId}/${toUserId}`)
}

//聊天记录
export function chatHistory( data ){
    return http.get('/crm/chat/history',data)
}