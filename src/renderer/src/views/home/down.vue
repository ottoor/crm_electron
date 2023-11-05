<template>
    <div class="down" :style="{ '--hover-color': hoverColor }">
        <header @mousedown="mousedown">
            <h4>任务列表</h4>
            <div @click="close">关闭</div>
        </header>
        <button @click="kiosk">加锁/解锁</button>
        <button @click="close" v-if="!isKiosk">关闭</button>
        <el-container>
            <el-main>
                <el-table 
                    :data="tableData" 
                    style="width: 100%" height="250"
                >
                    <el-table-column type="index" label="序号" width="180" />
                    <el-table-column prop="taskName" label="任务名称" width="180" />
                    <el-table-column label="状态">
                        <template #default="{row}">
                            <template v-for="item in dicts.system_global_status">
                                <el-tag v-if="row.status == item.v"> {{  item.k  }}</el-tag>
                            </template> 
                        </template>  
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间"/>
                    <el-table-column fixed="right" label="操作">
                        <template #default="{row}">
                            <el-button link type="primary" size="small" @click="download(row)">下载</el-button>
                            <el-button link type="primary" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import { ref ,onBeforeMount , getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance();
//api
import { taskPage } from '@api/home'
//查询数据
let tableData = ref([]);
//生命周期
onBeforeMount(async ()=>{
	//混入
	proxy.sendDicts(['system_global_status']);
	//table数据
	await getTableData();
})
const getTableData = async ()=>{
    let res = await taskPage();
    tableData.value = res.data.records;
}
//下载
const download = ( row )=>{

    //渲染进程 通信主进程
	electron.ipcRenderer.invoke('renderer-to-main',{
		name: 'download',
        data:{
            url:row.downloadUrl
        }
	})
}

//拖拽
let isKeyDown = ref(false);
let dinatesX = ref(0);
let dinatesY = ref(0);
const mousedown = ( e )=>{
    isKeyDown.value = true;
    dinatesX.value = e.x;
    dinatesY.value = e.y;
    document.onmousemove = (ev) => {
        if( isKeyDown.value ){
            const x = ev.screenX - dinatesX.value;
            const y = ev.screenY -dinatesY.value;
            //给主进程传入坐标
            let data = {
                appX:x,
                appY:y
            }
            electron.ipcRenderer.invoke('renderer-to-main',{
                name: 'custom-adsorption',
                data
            })
        }
    }
    document.onmouseup = (ev) => {
       isKeyDown.value = false;
    };
}


//窗口按钮操作 : 关闭
const close = ()=>{
    electron.ipcRenderer.invoke('renderer-to-main',{
        name: 'close-window'
    })
}

//窗口按钮操作 : 移入背景色
let hoverColor = ref('rgba(0,0,0,.5)');

//窗口按钮操作 : 锁定
let isKiosk = ref(false);
const kiosk = ()=>{
    isKiosk.value = !isKiosk.value;

    if( isKiosk.value ){
        hoverColor.value = '';
    }else{
        hoverColor.value = 'rgba(0,0,0,.5)';
    }
    electron.ipcRenderer.invoke('renderer-to-main',{
        name: 'kiosk',
        kiosk:isKiosk.value
    })
}
</script>

<style scoped>
.down:hover { 
    background-color: var(--hover-color); 
}

header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding:0 10px;
    background-color: #ccc;
}
</style>
