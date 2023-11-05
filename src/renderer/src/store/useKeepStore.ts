import { defineStore } from 'pinia'

export const useKeepStore = defineStore('keepId', {
    state: () => {
        return {
            //要缓存的组件名称
            keepAliveRoute:[]
        }
    },
    getters:{},
    actions:{
        pushKeepAlive( name ){
            if( !this.keepAliveRoute.includes(name) ){
                this.keepAliveRoute.push( name );
            }
        }
    }
})