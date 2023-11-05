import { useUserStore } from '@store/useUserStore'
import config from '@config'
export const AuthDirectives = {
    name:'auths',//自定义名称
    mounted( el , binding ){
        let map = new Map();
        map.set('system:user:add',11111111);
        map.set('system:user:update',11111111);
        console.log( useUserStore().permissions )
        let permissions = useUserStore().permissions;
        if( permissions.includes(config.PERMISSIONS)  ) return;

        //正常写法
        // if( !useUserStore().permissions.includes(binding.value) ){
        //     const parent = el.parentElement;
        //     parent && parent.removeChild( el );
        // }
        if( !map.has( binding.value ) ){
            //没有这个权限：就删除节点
            const parent = el.parentElement;
            parent && parent.removeChild( el );
        }        
    }
}