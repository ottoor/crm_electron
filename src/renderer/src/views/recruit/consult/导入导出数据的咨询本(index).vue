<template>
    <el-container>
        <el-header height="auto">
			<el-form
                class="role-top"
				:model="form" 
                inline
            >
                <el-form-item label="角色名称" prop="name">
                    <el-input placeholder="请输入角色名称" v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="角色编码" prop="perm">
                    <el-input placeholder="请输入角色编码" v-model="form.perm"></el-input>
                </el-form-item>
                
                <el-form-item label="状态">
                    <el-select v-model="form.enabled">
                        <el-option
                            v-for="item in dicts.system_global_status"
                            :key="item.v"
                            :label="item.k"
                            :value="item.v"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item style="display: block;">
                    <el-button icon="search">搜索</el-button>
                    <el-button icon="refresh">重置</el-button>
                </el-form-item>

            </el-form>
        </el-header>
        <el-main>
            <el-popover
                placement="top-start"
                :width="400"
                trigger="click"
                content="为了您正确使用导入功能，请先下载Excel模板。"
            >
                <template #reference>
                    <el-button type="default" icon="Upload">导入
                    </el-button>
                </template>
                <div>
                <el-alert title="为了您正确使用导入功能，请先下载Excel模板。" type="info" :closable="false"/>
                    <div style="display: flex;justify-content: space-between">
                        <el-button type="primary" icon="Download" @click="download">下载模板</el-button>
                            <el-upload
                                v-model:file-list="fileList"
                                action
                                :limit="3"
                                :show-file-list="false"
                                :http-request="upload"
                                :headers="headers"
                                style="margin-right: 5px;display: flex"
                            > 
                            <el-button type="primary" icon="Upload">上传</el-button>
                        </el-upload>
                    </div>
                </div>
            </el-popover>
            <el-table 
                :data="tableData" 
                width="100%" 
                border 
                stripe
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}"
            >
                <el-table-column label="序号" type="index" width="60" align="center" fixed="left"></el-table-column>
                <el-table-column label="意向度" width="150">
                    <template #default="scope">
                        <el-rate v-model="scope.row.purpose" disabled/>
                    </template>
                </el-table-column>
                <el-table-column label="学生姓名" prop="name" fixed="left"></el-table-column>
                <el-table-column label="联系电话" prop="mobile" width="100px"></el-table-column>
                <el-table-column label="微信" prop="wechat"></el-table-column>
                <el-table-column label="维护人" prop="whrName"></el-table-column>
                <el-table-column label="性别" prop="gender">
                    <template #default="{row}">
                        <template v-for="item in dicts.system_global_gender">
                            <el-text v-if="row.gender == item.v">{{ item.k }}</el-text>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="跟进时间" prop="followTime" :formatter="rendererDateTime"
                                width="150px"></el-table-column>
                <el-table-column label="领取人" prop="collectName"></el-table-column>
                <el-table-column label="领取时间" prop="collectTime" :formatter="rendererDateTime"
                                width="150px"></el-table-column>
                <el-table-column label="学历" prop="education" width="100px">
                    <template #default="{row}">
                        <template v-for="item in dicts.recruit_education_background">
                            <el-text v-if="row.education == item.v">
                                {{ item.k }}
                            </el-text>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="重要级别" prop="level" width="100px">
                    <template #default="{row}">
                        <template v-for="item in dicts.recruit_customer_level">
                            <el-text v-if="row.level == item.v">
                                {{ item.k }}
                            </el-text>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="所在区域" prop="province" width="180px">
                    <template #default="{row}">
                        <template v-if="row.provinceName && row.cityName && row.countyName">
                            <el-text>{{ row.provinceName + '-' + row.cityName + '-' + row.countyName }}</el-text>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="渠道" prop="source">
                    <template #default="scope">
                        <template v-for="item in channels">
                            <el-text v-if="scope.row.source == item.id">
                                {{ item.categoryName }}
                            </el-text>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="成交状态" prop="dealStatus" width="100px">
                    <template #default="{row}">
                        <template v-for="item in dicts.recruit_dealStatus">
                            <el-tag v-if="row.dealStatus == item.v">{{ item.k }}</el-tag>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="沟通内容" prop="followContent" width="200px">
                    <template #default="{row}">
                        <div class="content">
                        {{ row.followContent }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120" fixed="right">
                    <template #default="scope">
                        <el-link :underline="false" type="primary" icon="List">查看详情</el-link>
                        <el-link :underline="false" type="primary" icon="Avatar">办理报名</el-link>
                        <el-link :underline="false" type="primary" icon="Edit">跟进信息</el-link>
                        <el-link :underline="false" type="primary" icon="Edit">编辑信息</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer style="display: flex;justify-content: flex-start">
            <pagination 
                :pages="pages"
                @changeSize="handleSizeChange"
                @changeCurrent="handleCurrentChange"
            />
        </el-footer>
    </el-container>
</template>

<script lang="ts" setup name="角色管理">
import { ref , reactive , onBeforeMount , getCurrentInstance } from 'vue'
//api
import {  consultImport , consultPage  } from './api'
//搜索表单
const form = reactive({
	name:'',
	perm:'',
	enabled:''
})
//查询数据
let tableData = ref([]);
//组件
import pagination from '@components/pagination/pagination.vue'
import { electron } from 'process';
//分页数据
const pages = reactive({
    current:1,
    size:10,
    total:100
})
//每一页显示多少条数据
const handleSizeChange = async ( val )=>{
    pages.size = val;
    await getConsult();
}
//点击页码
const handleCurrentChange = async ( val )=>{
    pages.current = val;
    await getConsult();
}
//上传文件列表
const fileList = ref([]);
//上传文件请求头
const headers = reactive({"Content-Type": "multipart/form-data"})
const { proxy } = getCurrentInstance();
//生命周期
onBeforeMount(async ()=>{
	//混入
	proxy.sendDicts(['system_global_status']);
    //客户数据
    await getConsult();
})

//全部客户列表
const getConsult = async ()=>{
    let res = await consultPage(pages);
    pages.total = res.data.total;
    tableData.value = res.data.records;
}

//上传文件
const upload = async ( options ) => {
    let formDate = new FormData();
    formDate.append( 'file',options.file );
    let res = await consultImport( formDate );
    if( res.code =='200' ){
        await getConsult();
    }
}
//下载模版
const download = ()=>{
    let modelUrl = 'https://oss.xuexiluxian.cn/xiaoluxian-crm/1659133900536107008.xlsx';
    window.electron.ipcRenderer.invoke('renderer-to-main', {
        name: 'download-http-file',
        event: 'event',
        data: modelUrl
    })
}
</script>

<style scoped>
.inline {
  margin-right: 20px;
  display: inline-flex;
  vertical-align: middle;
  width: 35%;
}

:deep(.el-rate svg) {
  height: 2rem;
  width: 2rem;
}

.content {
  padding: 3px;
  overflow: hidden;
  width: 180px;
  height: 100%;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>