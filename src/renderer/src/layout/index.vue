<template>
    <div class="container">
        <!--一级菜单-->
        <div class="slider-split">
        	<div class='slider-split-t aminui-side-split-top'>
        		<router-link to='/'>
        			<img src='/images/logo.png' />
        		</router-link>
        	</div>
        	<div class='slider-split-scroll'>
        		<el-scrollbar>
        			<ul>
        				<li
        					v-for='item in menu'
        					@click='showMenu(item)'
                            :class='pmenu.path == item.path ? "active":""'
        				>
        					<el-icon>
        						<component :is="item.meta.icon.replace('el-icon-','')"></component>
        					</el-icon>
        					<span>{{ item.name }}</span>
        				</li>
        			</ul>
        		</el-scrollbar>
        	</div>
        </div>

        <!--二级菜单-->
        <div :class="menuStore.menuIsCollapse ? 'aminui-side isCollapse' : 'aminui-side' ">
            <div class='adminui-side-top' v-if='!menuStore.menuIsCollapse'>
                <h2>{{ pmenu.name }}</h2>
            </div>
            <div class='adminui-side-scroll'>
                <el-scrollbar>
                    <el-menu router :collapse='menuStore.menuIsCollapse'>
                        <nextMenu :nextMenuList='nextMenuList'></nextMenu>
                    </el-menu>
                </el-scrollbar>
            </div>
            <div class='adminui-side-bottom' @click='menuStore.toggle_nextMenu'>
                <el-icon>
                    <Expand v-if="menuStore.menuIsCollapse"/>    
                    <Fold v-else/>
                </el-icon>
            </div>
        </div>

        <!--主体内容-->
        <div class="main">
            <!--头部-->
            <topBar>
                <userBar></userBar>
            </topBar>
            <!--记录导航-->
            <tags></tags>
            <!--主体内容-->
            <div class="content">
                <router-view v-slot='{ Component }'>
                    <keep-alive :include='keepAliveRoute'>
                        <component :is='Component' :key='route.path' />
                    </keep-alive>
                </router-view>
            </div>
        </div>  
    </div>
</template>

<script setup>
import { ref , onBeforeMount } from 'vue'
//二级菜单组件
import nextMenu from './components/nextMenu.vue'
//右侧内容
import topBar from './components/topBar.vue'
import userBar from './components/userBar.vue'
import tags from './components/tags.vue'

//pinia
import { storeToRefs } from 'pinia'
import { useMenuStore } from '@store/useMenuStore'
let menuStore = useMenuStore();

import { useKeepStore } from '@store/useKeepStore'
let keepStore = useKeepStore();
const { keepAliveRoute } = storeToRefs( keepStore );

//router
import { useRoute , useRouter  } from 'vue-router'
let route = useRoute();

//当前菜单数据
let pmenu = ref(null);
//所有菜单数据
let menu = ref([]);
//二级菜单数据
let nextMenuList = ref([]);

//生命周期
onBeforeMount(()=>{
    //获取一级菜单
    menu.value = menuStore.menuList;
    console.log(  menu.value );
    //获取二级路由
    showRouter();
})

//点击一级菜单
const showMenu = ( item )=>{
    pmenu.value = item;
    nextMenuList.value = pmenu.value.children;
}

//获取二级路由
const showRouter = ()=>{
    pmenu.value = route.meta.breadcrumb ? route.meta.breadcrumb[0] : {};
    //二级菜单数据
    nextMenuList.value = pmenu.value.children;
}
</script>

<style scoped>
.el-container{
    padding-top:20px;
    background-color: #fff;
}
.container{
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
}
.slider-split{
    width:60px;
    height: 100%;
    background: #363B5A;
    cursor: pointer;
}
.slider-split-t{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top:10px;
}
.slider-split-t img{
    width:30px;
    height: 30px;
}
.slider-split-scroll{
    color:#fff;
}
.slider-split-scroll li{
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 14px;
}
.slider-split-scroll li i{
    font-size:20px;
}
.slider-split-scroll ul li{
    display: flex;
    width:60px;
    height: 65px;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.main{
    display: flex;
    flex-direction: column;
    flex:1;
}
.active{
    background-color: #409EFF;
}

.adminui-side-top{
    -webkit-app-region: drag;
}
::v-deep .el-menu{
    border:none;
}
.content{
    flex:1;
    overflow: auto;
}
</style>