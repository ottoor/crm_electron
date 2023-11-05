<template>
    <el-container>
        <el-header height="auto">
			<el-form
                class="role-top"
				:model="form" 
                inline
            >
                <el-form-item label="科目名称" prop="name">
                    <el-input placeholder="请输入科目名称" v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="科目状态">
                    <el-select v-model="form.enabled">
                        <el-option
                            v-for="item in dicts.system_global_status"
                            :key="item.v"
                            :label="item.k"
                            :value="item.v"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button icon="search">搜索</el-button>
                    <el-button icon="refresh">重置</el-button>
                </el-form-item>

            </el-form>
        </el-header>
        <el-main>
            <el-button type="primary" icon="plus">添加科目</el-button>
            <el-button type="primary" icon="delete" @click="exBtn">导出</el-button>
            <!-- <el-table 
                :data="tableData" 
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" />
                <el-table-column prop="roleName" label="角色名称" width="180" />
                <el-table-column prop="rolePerm" label="权限编码" width="180" />
                <el-table-column label="是否启用">
                    <template #default="{row}">
                        <template v-for="item in dicts.system_global_status">
                            <el-tag v-if="row.enabled == item.v"> {{  item.k  }}</el-tag>
                        </template> 
                    </template>  
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间"/>
                <el-table-column fixed="right" label="操作">
                    <template #default="{row}">
                        <el-button link type="primary" size="small" @click="del(row)">删除</el-button>
                        <el-button link type="primary" size="small" @click="addorupdate(row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table> -->
        </el-main>

        <el-footer style="display: flex;justify-content: flex-end">
            <pagination 
                :pages="pages"
                @changeSize="handleSizeChange"
                @changeCurrent="handleCurrentChange"
            />
        </el-footer>
    
        <!-- <roleDialog
            v-if="roleDiaglog.show"
            v-model:show="roleDiaglog.show"
            @change="getTableData"
            :updateRow="updateRow"
        ></roleDialog> -->
        
    </el-container>
</template>

<script lang="ts" setup name="科目管理">
import { ref , reactive , getCurrentInstance , onBeforeMount } from 'vue'
const { proxy } = getCurrentInstance();
//组件
import pagination from '@components/pagination/pagination.vue'
//api
import { subjectExport } from './api'

let form = reactive({
    name:'',
    enabled:'1'
})
//生命周期
onBeforeMount(async ()=>{
	//混入
	proxy.sendDicts(['system_global_status']);
})

//导出数据
const exBtn = async ()=>{
    let res = await subjectExport();
    if( res.code =='200' ) ElMessage({type:'success',message:res.data})
}

//分页数据
const pages = reactive({
    current:1,
    size:10,
    total:100
})
//每一页显示多少条数据
const handleSizeChange = async ( val )=>{
    pages.size = val;
}
//点击页码
const handleCurrentChange = async ( val )=>{
    pages.current = val;
}
</script>

<style scoped>
.el-footer{
    display: flex;
    justify-content:  flex-end;
}
</style>