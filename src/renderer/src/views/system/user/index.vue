<template>
    <div class="common-layout">
        <el-container >
            <el-container>
                <el-header class="no-flex" height="auto">
                    
                </el-header>
                <el-main class="nopadding">
                    <el-button type="primary" icon="plus" @click="addorupdate">新增</el-button>
                    <el-button type="primary" icon="delete" @click="delAll">删除</el-button>
                    <el-table 
                        :data="userList" 
                        height="auto" 
                        border
                        paginationLayout="total, prev, pager, next" 
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column align="center" type="selection"/>
                        <el-table-column label="用户姓名" prop="username"  align="center" />
                        <el-table-column label="真实姓名" prop="realName"  align="center" />
                        <el-table-column label="用户类型" prop="userType"  width="100px"  >
                            <template #default="{ row }">
                            <div v-if="row.userType == 0 ">普通账号</div>
                            <div v-if="row.userType == 1 ">超级管理员</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="手机号码" prop="phone"  width="150" />
                        <el-table-column label="用户性别" prop="gender"  align="center" >
                            <template #default="{row}">
                                <template v-for="item in dicts.system_global_gender">
                                    <div v-if="row.gender == item.v">{{item.k}}</div>
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column label="账号状态" prop="enabled"  align="center" >
                            <template #default="{row}">
                                <template v-for="item in dicts.system_global_status">
                                    <el-tag v-if="row.enabled == item.v">{{item.k}}</el-tag>
                                </template>
                            </template>
                        </el-table-column>
            
                        <el-table-column label="操作" align="center" width="180" fixed="right">
                            <template #default="{ row }">
                                <div class="sys-table-main-actions">
                                    <el-link
                                        icon="el-icon-edit"
                                        v-if="!row.userType == 1"
                                        type="primary"
                                        :underline="false"
                                        @click="addorupdate(row)"
                                    > 修改</el-link>

                                    <el-link
                                        icon="el-icon-delete"
                                        v-if="!row.userType == 1"
                                        style="margin-left: 10px"
                                        type="danger"
                                        :underline="false"
                                        @click="del(row)"
                                    >删除</el-link>
                                </div>
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
            </el-container>
        </el-container>
        <!--dialog-->
        <userDialog 
            v-if="userDiaglog.show"
            v-model:show="userDiaglog.show"
            @change="getUserData"
            :updateRow="updateRow"
        ></userDialog>
    </div>
</template>
  
<script setup name="用户管理">
import { ref , reactive , onBeforeMount , getCurrentInstance } from 'vue'
//api 
import { userPage ,userDelete } from './api'
//分页组件
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
    await getUserData();
}
//点击页码
const handleCurrentChange = async ( val )=>{
    pages.current = val;
    await getUserData();
}

//table数据
const userList = ref([]);
//dialog组件
import userDialog from './userDialog.vue'
//dialog数据
const userDiaglog = reactive({
    show:false
})
//生命周期
let {  proxy  } = getCurrentInstance();
onBeforeMount(()=>{
    //混入字典
	proxy.sendDicts(['system_global_gender','system_global_status']);
    //获取用户列表
    getUserData();
})
const getUserData = async ()=>{
    let res = await userPage({
        current:pages.current,
        size:pages.size
    });
    pages.total = res.data.total;
    userList.value = res.data.records;
} 
//修改数据
let updateRow = ref('');
//新增用户
const addorupdate = ( row )=>{
    if( row ){
        updateRow.value = row.id;
    }
    userDiaglog.show = true;
}
//删除
const del = async ( row )=>{
    let res = await userDelete(row.id);
    if( res.code =='200' ){
        getUserData();
        return ElMessage({type:'success',message:'修改成功'})
    }
}
//选中的元素
const multipleSelection = ref([]);
//批量选中
const handleSelectionChange = (val)=>{
    multipleSelection.value = val;
}
//批量删除
const delAll = ()=>{
    Promise.all(  multipleSelection.value.map(item=>userDelete(item.id))).then(async res=>{
        await getUserData();
    })
}
</script>
  
<style scoped>
  .common-layout{
    height: 100%;
  }
  .tree{
    padding-top: 1rem;
    height: 100%;
  }
  .sys-filters{
    margin-bottom: 1rem;
  }
  el-form-item {
    width: 300px;
  }
</style>
  
  