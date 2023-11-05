import axios from 'axios';

import config from '@config'

//loading
import {  showLoading,hideLoading } from './loading'

const request = axios.create({
    baseURL: config.api
});

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    if( config.loading ){
        showLoading();
    }
    if( localStorage.getItem('TOKEN') ){
        config.headers['Authorization'] = localStorage.getItem('TOKEN');
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    if( response.status ){
        hideLoading();
    }
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

let http = {
    get:(url,params={},config={})=>{
        return new Promise((resolve,reject)=>{
            request({
                url,
                method:'get',
                params,
                ...config
            }).then(res=>{
                resolve(res.data);
            }).catch((error)=>{
                reject( error );
            })
        })
    },
    post:(url,data={},config={})=>{
        return new Promise((resolve,reject)=>{
            request({
                url,
                method:'post',
                data,
                ...config
            }).then(res=>{
                resolve(res.data);
            }).catch((error)=>{
                reject( error );
            })
        })
    },
}

export default http;



