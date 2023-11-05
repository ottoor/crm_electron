import { defineStore } from 'pinia'


export const useTagStore = defineStore('tagId', {
    state: () => {
        return {
            tagList:[
                {name:'仪表盘',path:'/dashboard'}
            ]
        }
    },
    actions:{
        //添加标签
        addTag( route ){
            let { name , path } = route;
            let pathIndex = this.tagList.findIndex( item=>item.path );
            let target = this.tagList.find( item=>item.path == route.path );
            let isName = route.name;

            if( !target && isName ){

                if( pathIndex == -1 ){
                    this.tagList.push({name,path})
                }else{
                    this.tagList.splice( pathIndex+1,0,{name,path} );
                }
            }
        },
        //删除标签
        delTag( route ){
            if(  this.tagList.length == 1) return;
            this.tagList.forEach((item,index)=>{
                if( item.path == route.path ){
                    this.tagList.splice(index,1);
                }
            })
        }
    }
})

