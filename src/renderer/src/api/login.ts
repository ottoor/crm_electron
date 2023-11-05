import http from "@utils/request";

//获取图形验证码
export const captchaImg = ( data )=>{
    return http.get('/captcha/image',data,{responseType:'arraybuffer',loading:true})
}
//用户登录
export const loginByJson = ( data )=>{
    return http.post('/u/loginByJson',data,{loading:true})
}

//个人信息
export const getInfo = ()=>{
    return http.get('/personal/getInfo',{},{loading:true});
}

//获取路由
export const getRouters = ( data )=>{
    return http.get(`/personal/getRouters/${data}`,{},{loading:true});
}

//登录动态验证码
export const sendCaptcha = ( data )=>{
    return http.get('/captcha/sendRegisterOrLoginCaptcha',data);
}

//手机验证码登录
export const loginByMobile = ( data )=>{
    return http.post('/u/loginByMobile',data);
}