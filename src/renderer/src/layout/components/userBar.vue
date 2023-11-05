<template>
	<div class='user-bar'>
		<!--用户信息 + 切换用户-->
		<!--消息提醒-->
        <div class="panel-item" @click="chat">
			聊天通信
			<span v-if="socketNum">
				[{{ socketNum }}]
			</span>
		</div>

        <!--下载-->
        <div class="panel-item" @click='down'>异步下载</div>

        <!--最小化-->
        <div class="panel-item" @click='min'>
            <el-icon><Minus /></el-icon>
        </div>

        <!--最大化-->
        <div class="panel-item" @click='max'>
            <el-icon><FullScreen /></el-icon>
        </div>

        <!--关闭-->
        <div class="panel-item" @click='close'>
            <el-icon><Close /></el-icon>
        </div>

	</div>
</template>

<script setup>
import { reactive , onBeforeMount ,ref } from 'vue'
//Socket对象
let websocket = reactive(null);
//token
let token = localStorage.getItem("TOKEN");
//未读消息
let socketNum = ref(0);

onBeforeMount(()=>{
	socketNum.value = localStorage.getItem('socketNum');
	 //1. 创建WebSocket对象
	 websocket = new WebSocket('ws://uat.crm.xuexiluxian.cn/crm/websocket' , token );
    //2. 连接成功后的回调函数
    websocket.onopen = ()=>{
        console.log('链接成功');
    };
    //3. 从服务器接收信息时的回调函数
    websocket.onmessage = ( e )=>{
		console.log( e );
		if( e.isTrusted ){
			socketNum.value++;
			localStorage.setItem('socketNum',socketNum.value);
		}
	}
})

import utils from '@utils'
//下载 
const down = ()=>{

	//渲染进程 通信主进程
	electron.ipcRenderer.invoke('renderer-to-main',{
		name: 'open-window-down',
	})

}

//最小化
const min = ()=>{
	//渲染进程 通信主进程
	electron.ipcRenderer.invoke('renderer-to-main',{
		name: 'min-window',
	})
}
	

//最大化
const max = ()=>{
	//渲染进程 通信主进程
	// electron.ipcRenderer.invoke('renderer-to-main',{
	// 	name: 'max-window',
	// })
	//目前是否是放大
	utils.Fullscreen();
}
	
//关闭
const close = ()=>{
	//渲染进程 通信主进程
	electron.ipcRenderer.invoke('renderer-to-main',{
		name: 'quit-window',
	})
}

//聊天
const chat = ()=>{
	electron.ipcRenderer.invoke('renderer-to-main',{
		name: 'chat',
	})

	//消息个数
	localStorage.removeItem('socketNum');
	socketNum.value = 0;
}
</script>

<style scoped>
.user-bar{
	display: flex;
	align-items: center;
	margin-right: 16px;
}
.panel-item{
	padding: 0 16px;
}
</style>