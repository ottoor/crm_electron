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
            <el-button type="primary" icon="plus" @click="addorupdate">新增</el-button>
            <el-button type="primary" icon="delete" @click="delAll">删除</el-button>
            <el-table 
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
            </el-table>
        </el-main>

        <el-footer style="display: flex;justify-content: flex-end">
            <pagination 
                :pages="pages"
                @changeSize="handleSizeChange"
                @changeCurrent="handleCurrentChange"
            />
        </el-footer>
    
        <roleDialog 
            v-if="roleDiaglog.show"
            v-model:show="roleDiaglog.show"
            @change="getTableData"
            :updateRow="updateRow"
        ></roleDialog>
        
    </el-container>
</template>

<script lang="ts" setup name="角色管理">
import utils from '@utils'
import { ref , reactive , onBeforeMount , getCurrentInstance } from 'vue'
import { rolePage , roleDel } from './api'
//组件
import pagination from '@components/pagination/pagination.vue'
//分页数据
const pages = reactive({
    current:1,
    size:10,
    total:100
})
//每一页显示多少条数据
const handleSizeChange = async ( val )=>{
    pages.size = val;
    await getTableData();
}
//点击页码
const handleCurrentChange = async ( val )=>{
    pages.current = val;
    await getTableData();
}
const form = reactive({
	name:'',
	perm:'',
	enabled:''
})
//新增 & 修改 dialog
import roleDialog from './roleDialog.vue'
//查询数据
let tableData = ref([]);
const { proxy } = getCurrentInstance();
//生命周期
onBeforeMount(async ()=>{
	//混入
	proxy.sendDicts(['system_global_status']);
	//table数据
	await getTableData();
})
//请求table数据
const getTableData = async (val)=>{
    let res = await rolePage({
        current:pages.current,
        size:pages.size,
        ...val
    });
	tableData.value = res.data.records;
    //总数
    pages.total = res.data.total;
    //转换时间
    tableData.value.forEach(item=>{
        item.createTime = utils.getTime(item.createTime,'yyyy-MM-dd hh:mm');
    })
}
//dialog控制
const roleDiaglog = reactive({
    show:false
})
//修改数据
let updateRow = ref('');
//新增 && 修改
const addorupdate = ( row )=>{
    if( row ){
        updateRow.value = row.id;
    }
    if( roleDiaglog.show ) return;
    roleDiaglog.show = true;
}
//删除
const del = async (row)=>{
    let res = await roleDel( row.id );
    if( res.code != 200 ){
        return ElMessage.error({
            message:res.msg
        });
    }
    await getTableData();
    ElMessage.success({
        message:res.msg
    });
}
//选中的元素
const multipleSelection = ref([]);
//批量选中
const handleSelectionChange = ( val )=>{
    multipleSelection.value = val;
}
//批量删除
const delAll = ()=>{
    Promise.all(  multipleSelection.value.map(item=>roleDel(item.id))  ).then(async res=>{
        await getTableData();
    })
}
</script>

<style scoped>
.el-footer{
    display: flex;
    justify-content:  flex-end;
}
</style>