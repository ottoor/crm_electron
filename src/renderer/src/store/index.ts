import { defineStore } from 'pinia'

import { useUserStore  } from '@store/useUserStore'
import { useMenuStore } from '@store/useMenuStore'

export const useStore = defineStore('storeId', {
    state: () => {
        return {
            user:useUserStore(),//用户个人信息
            menu:useMenuStore(),//获取路由菜单
        }
    },
    getters:{},
    actions:{}
})

