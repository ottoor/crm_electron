import { useUserStore } from '@store/useUserStore'
import { useMenuStore } from '@store/useMenuStore'
import config from '@config'
import { useRouter } from 'vue-router'
let router = null;

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//全局前置导航守卫
export const beforeEach = async ( to )=>{

    NProgress.start();

    router = useRouter();

    //判断是否已经在登录页面
    if( to.path =='/login' ){
        return;
    }

    //如果没有token，那么就跳转到登录页面
    if( !localStorage.getItem('TOKEN') ){
        return '/login'
    }   

    try{
        //进入后台管理系统
        const userStore = useUserStore();

        await userStore.initUserInfo();

        const menuStore = useMenuStore();

        //动态路由
        initRouter( menuStore.menuList );
        //不让第一次访问页面出现空白页
        if( to.matched.length == 0 ){
            router.push( to.fullPath );
        }

        //最高权限直接通行
        if( userStore.permissions ==  config.PERMISSIONS ){
            return true;
        }

        // console.log( menuStore.menuMap )
        
        //如果没有某一个路由，不能进入某页面
        if( !menuStore.menuMap.has( to.path ) ){
            ElMessage.error('sorry～没有此权限');
            router.replace('/');
            return false;
        }

        return true;

    }catch(e){
        console.log( e );
        return '/login'
    }

    return true;

}


//动态路由
const initRouter = ( menuList )=>{
    const newMenus = menuList || [];
    let menu = [...newMenus];

    //就是把原本menuList的数据中的component:字符串的形式，换成了懒加载路由可以对应组件的形式
    let menuRouter = filterAsyncRouter( menu );
    //1. 把所有的二级路由也变成了一级
    //2. 往route中，添加对应关系的一级和二级
    menuRouter = flatAsyncRoutes( menuRouter );

    //添加路由
    menuRouter.forEach(item=>{
        if( item.path !="http://www.xuexiluxian.cn" ){
            router.addRoute('layout',item);
        }
    })
}

//路由数组的数据重构 start
const filterAsyncRouter = ( routerMap )=>{
    const accessdRouters = [];
    routerMap.forEach(item=>{
        let route = {
            path:item.path,
            name:item.name,
            meta:item.meta,
            children:item.children ? filterAsyncRouter(item.children) : null,
            component:loadComponent(item.component)
        }
        accessdRouters.push(  route  );

    })
    return accessdRouters; 
}

//组件基本路径
const modules = import.meta.glob('@renderer/views/**/*.vue');
const modulesMap = {};
Object.keys( modules ).forEach(key=>{
    const componentName = key.replace('/src/views','').replace('.vue','').replace('/index','').replace('/','');
    if( key.includes('index') ){
        modulesMap[`${componentName}/index`] = modules[key];
    }
    modulesMap[ componentName ] = modules[key];
})


//包装动态路由组件路径
const loadComponent = ( component )=>{
    if( component ){
        return modulesMap[component]
    }
}

//给route的meta中添加children , 让route可以拿到本层所有路由信息
function flatAsyncRoutes(routes, breadcrumb=[]) {
    let res = []

    routes.forEach(route => {
        const tmp = {...route};
        if (tmp.children) {
            //把二级变成一级结构形式
            let childrenBreadcrumb = [...breadcrumb];
            childrenBreadcrumb.push(route);
            let tmpRoute = { ...route };
            tmpRoute.meta.breadcrumb = childrenBreadcrumb;
            delete tmpRoute.children;
            res.push(tmpRoute);
            let childrenRoutes = flatAsyncRoutes(tmp.children, childrenBreadcrumb);
            childrenRoutes.map(item => {
                res.push(item)
            })
        } else {
            //在layout渲染数据一级和二级的时候比较方便
            let tmpBreadcrumb = [...breadcrumb];
            tmpBreadcrumb.push(tmp);
            tmp.meta.breadcrumb = tmpBreadcrumb;
            res.push(tmp);
        }
    })
    return res;   
}


//全局后置导航守卫
export const afterEach = ()=>{
    NProgress.done();
    //console.log('后置222')
}