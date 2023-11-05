import { defineStore } from 'pinia'

import { getInfo } from '@api/login'
import { useMenuStore } from '@store/useMenuStore'

export const useUserStore = defineStore('userId', {
    state: () => {
        return {
            rolePerm:'',   //角色权限编码
            permissions:'',//当前用户权限信息
            userInfo:{},//用户信息
        }
    },
    getters:{},
    actions:{
        async getUserInfo(){
            let res = await getInfo();
            let data = res.data;
            this.permissions = data.permissions[0];
            this.rolePerm = res.data.roles[0].rolePerm;
        },
        //进入后台管理系统校验
        async initUserInfo(){
            let res = await getInfo();
            let data = res.data;
            this.permissions = data.permissions[0];
            this.rolePerm = res.data.roles[0].rolePerm;
            this.userInfo = data.userInfo;
            await useMenuStore().getMenu();
        },
    },
    persist: {
      enabled: true, //开启数据缓存
      strategies: [
        {
          storage: localStorage,//默认走session
          paths: ['rolePerm', 'permissions']
        }
      ]
    }
})