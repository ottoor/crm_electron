import { defineStore } from 'pinia'

import { getRouters } from '@api/login'
import { useUserStore } from './useUserStore'

//路由表
import { AppRoutes } from '@router/routes'

export const useMenuStore = defineStore('menuId', {
    state: () => {
        return {
            rolePerm:'', //用户权限编码
            menuMap:null,//用户菜单权限扁平化数据
            menuList:[],//用户菜单数据
            menuIsCollapse:false,//二级菜单开关
        }
    },
    getters:{},
    actions:{
        async getMenu(){
            let res = await getRouters(useUserStore().rolePerm);
            if( res.code =='200' ){
                const menu = normalizeMenu( res.data );
                this.menuMap = menu.authMenuMap;
                this.menuList = menu.routes;
            }
        },
        //折叠二级菜单
        toggle_nextMenu(){
            this.menuIsCollapse = !this.menuIsCollapse;
        }
    },
    // persist: {
    //   enabled: true, //开启数据缓存
    //   strategies: [
    //     {
    //       storage: localStorage,//默认走session
    //       paths: ['menuMap','menuList']
    //     }
    //   ]
    // }
})

function normalizeMenu( routes ){

    const authMap = new Map();
    let router = [
        ...AppRoutes,
        ...routes
    ]
    const authMenuMap = normalizeMenuItem( router , authMap );
    return {
        routes,
        authMenuMap
    }

}

function normalizeMenuItem( routes , map ){

    routes.forEach(item=>{
        map.set( item.path , item );
        if( item.children ){
            return normalizeMenuItem( item.children , map );
        }
    })
    return map;
}










