<template>
    <el-dialog 
        v-model="show" 
        @close="close"
        :title="updateRow ? '修改角色' : '新增角色'"
        width="600px"
        :append-to-body="true"
        :destroy-on-close="true"
        :before-close="close"
    >
        <template #default>
            <el-form
                ref="formRef"
                label-width="80px"
                :model="form"
            >
                <el-form-item label="角色名称" prop="roleName">
                    <el-input placeholder="请输入角色名称" v-model="form.roleName"/>
                </el-form-item>

                <el-form-item label="权限字符" prop="rolePerm">
                    <el-input placeholder="请输入权限字符" v-model="form.rolePerm"/>
                </el-form-item>
                
                <el-form-item label="状态" prop="enabled">
                    <el-radio-group v-model="form.enabled">
                    <el-radio
                        v-for="item in dicts.system_global_status"
                        :key="item.v"
                        :label="form.enabled==item.v?form.enabled:item.v "
                    >
                        {{ item.k }}
                    </el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="菜单权限">
                    <div class="item-menu">
                        <el-checkbox
                            v-model="permission.openAll"
                            @change="toggleTreeCollapse"
                        >
                            展开/折叠
                        </el-checkbox>

                        <el-checkbox
                            v-model="permission.selectAll"
                            @change="toggleTreeChecked"
                        >
                            全选/全不选
                        </el-checkbox>
                        
                        <el-checkbox v-model="permission.linkage">
                            父子(联动/不联动)
                        </el-checkbox>
                        
                        <el-tree
                            ref="menuTreeRef"
                            :data="permission.treeList"
                            :props="permission.treeProps"
                            :check-strictly="!permission.linkage"
                            :default-expand-all="permission.openAll"
                            show-checkbox
                            default-expand-all
                            node-key="id"
                            class="tree"
                        /> 
                    </div>
                </el-form-item>

                <el-form-item label="备注" prop="descript">
                    <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="form.descript"
                        :maxlength="200"
                        show-word-limit
                    />
                </el-form-item>
            </el-form>
        </template>

        <template #footer>
        <span class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="onSubmit"> 确认 </el-button>
        </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref , reactive ,  getCurrentInstance , onBeforeMount } from 'vue'
//接收父组件值
const props = defineProps({
    show:Boolean,
    updateRow:String
})
//修改参数数据
let updateRow = ref(props.updateRow);
//api
import { menuTree , roleAdd , roleGet , roleUpdate } from './api'
//emit
const emit = defineEmits();
//dialog控制
const show = ref(props.show);
//treeDom
const menuTreeRef = ref(null);
//表单数据
const form = reactive({
    roleName:'',
    rolePerm:'',
    enabled:'1',
    descript:''
})
//菜单树
let permission = reactive({
    treeList:[],
    treeProps:{
        label:'name'
    },
    linkage:true,
    openAll:false
});
//生命周期
const { proxy } = getCurrentInstance();
onBeforeMount(async ()=>{
    //角色详情
    if( updateRow.value ){
        let roleData = await roleGet(updateRow.value);
        let { id , roleName, rolePerm , enabled , descript  } = roleData.data.role;
        form.id = id;
        form.roleName = roleName;
        form.rolePerm = rolePerm;
        form.enabled = enabled;
        form.descript = descript;
        menuTreeRef.value.setCheckedKeys( roleData.data.permissions );
    }
    //混入
    proxy.sendDicts(['system_global_status']);
    let res = await menuTree();
    permission.treeList = res.data;
})

//关闭dialog
const close = ()=>{
    emit('update:show',false);
}
//展开 & 折叠
const toggleTreeCollapse = ( e )=>{
    let nodeMap = menuTreeRef.value.store.nodesMap;
    Object.keys( nodeMap ).forEach(key=>{
         nodeMap[key].expanded = e; 
    })
}
//全选 & 全不选
const toggleTreeChecked = ( e )=>{
    let nodeMap = menuTreeRef.value.store.nodesMap;
    Object.keys( nodeMap ).forEach(key=>{
         nodeMap[key].checked = e; 
    })
}

//新增
const add = async ()=>{
    let res = await roleAdd({
        permissionIds: menuTreeRef.value.getCheckedKeys(),
        ...form,
    })
    if( res.code =='200' ) ElMessage({type:'success',message:'新增成功'})
}
//修改
const update = async ()=>{
    let res = await roleUpdate({
        permissionIds: menuTreeRef.value.getCheckedKeys(),
        ...form,
    })
    if( res.code =='200' ) ElMessage({type:'success',message:'修改成功'})
}
//确认
const onSubmit = async ()=>{
    if( updateRow.value ){
        await update();
    }else{
        await add();
    }
    show.value = false;
    //父给子传递自定义事件
    emit('change');
}
</script>

<style scoped>
.item-menu {
  width: 100%;
}
.tree {
  margin-top: 0.5rem;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>