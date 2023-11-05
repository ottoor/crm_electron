const config = {
    //请求的地址
    api : import.meta.env.MODE == "development" ? '/api' : import.meta.env.RENDERER_VUE_APP_API_BASEURL,
    //AES密钥
    AES_KEY:'bGvnMc62sh5RV6zP',
    //AES偏移量
    AES_OFF:'1eZ43DLcYtV2xb3Y',
    //国际化
    LANG:[
        {name:"中文",value:'zh-cn'},
        {name:'英文',value:'en'}
    ],
    //权限信息
    PERMISSIONS:"*:*:*"
}

export default config