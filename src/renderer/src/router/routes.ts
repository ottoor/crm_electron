export const AppRoutes = [
    { 
        path: "/", 
        redirect:'/dashboard',
        name:'layout',
        component: ()=>import('@layout/index.vue') 
    },
    { 
        path: "/login", 
        meta:{
            title:'登录',
        },
        component: ()=>import('@views/login/Login.vue')
    },
    { 
        path: "/down", 
        meta:{
            title:'异步下载',
        },
        component: ()=>import('@views/home/down.vue')
    },
    { 
        path: "/chat", 
        meta:{
            title:'聊天',
        },
        component: ()=>import('@views/home/chat.vue')
    },
];

