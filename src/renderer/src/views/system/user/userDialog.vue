<template>
    <el-dialog 
        v-model="show" 
        @close="close"
        :title="updateRow ? '修改用户':'新增用户'"
        width="800px"
        :append-to-body="true"
        :destroy-on-close="true"
        :before-close="close"
    >
        <template #default>
            <div class="form-container">
                <el-form
                    ref="formRef"
                    :model="userForm"
                    label-width="90px"
                    class="user-editor-form"
                >
                    <div class="form-row">
                        <el-form-item label="用户名" prop="username" class="inline">
                            <el-input v-model="userForm.username" show-word-limit placeholder="请输入用户名" />
                        </el-form-item>

                        <el-form-item label="密码" prop="password" class="inline" v-if="!userForm.id">
                            <el-input v-model="userForm.password" show-word-limit placeholder="请输入用户密码" />
                        </el-form-item>

                        <el-form-item label="真实姓名" prop="realName" class="inline">
                            <el-input v-model="userForm.realName" placeholder="请输入真实姓名" />
                        </el-form-item>

                        <el-form-item label="邮箱" prop="email" class="inline" >
                            <el-input v-model="userForm.email" placeholder="请输入邮箱" />
                        </el-form-item>

                        <el-form-item label="性别" prop="gender" class="inline" >
                            <el-select v-model="userForm.gender" placeholder="请选择性别">
                                <el-option
                                    v-for="item in dicts.system_global_gender"
                                    :key="item.v"
                                    :label="item.k"
                                    :value="userForm.gender==item.v?userForm.gender:item.v "
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="手机号码" prop="phone" class="inline">
                            <el-input v-model="userForm.phone" placeholder="请输入手机号码" />
                        </el-form-item>

                        <el-form-item label="启用状态" prop="enabled" class="inline">
                            <el-radio-group v-model="userForm.enabled">
                                <el-radio
                                v-for="item in dicts.system_global_status"
                                :key="item.v"
                                :label="userForm.enabled == item.v ? userForm.enabled : item.v "
                                :value="item.v"
                                >
                                {{ item.k }}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="所属机构" prop="unitId" class="inline" >
                            <el-tree-select
                                class="treeList"
                                v-model="userForm.unitId"
                                placeholder="请选择所属机构"
                                :render-after-expand="false"
                                :data="unitTree"
                                :props="{ label: 'name' }"
                                :check-strictly="true"
                                :auto-expand-parent="true"
                                :default-expand-all="true"
                                node-key="id"
                            />
                        </el-form-item>

                        <el-form-item label="所属岗位" prop="postIds" class="inline">
                            <el-tree-select
                                class="treeList"
                                v-model="userForm.postIds"
                                placeholder="请选择所属岗位"
                                :render-after-expand="false"
                                :data="postTree"
                                :props="{ label: 'postName' }"
                                :auto-expand-parent="true"
                                :default-expand-all="true"
                                node-key="id"
                                show-checkbox
                                multiple
                            />
                        </el-form-item>

                        <el-form-item label="分配角色" prop="roleIds" class="inline">
                            <el-tree-select
                                class="treeList"
                                v-model="userForm.roleIds"
                                placeholder="请选择分配角色"
                                :render-after-expand="false"
                                :data="roleTree"
                                :props="{ label: 'roleName' }"
                                :auto-expand-parent="true"
                                :default-expand-all="true"
                                node-key="id"
                                show-checkbox
                                multiple
                            />
                        </el-form-item>

                        <el-form-item label="备注" prop="remark" >
                            <el-input
                                v-model="userForm.remark"
                                type="textarea"
                                placeholder="请输入用户备注"
                                :maxlength="200"
                                show-word-limit
                            />
                        </el-form-item>
                    </div>
                </el-form>
            </div>
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
//api
import { unitList , postPage , rolePage , userAdd , userGet , userUpdate } from './api'
//接收父组件值
const props = defineProps({
    show:Boolean,
    updateRow:String
})
//修改参数数据
let updateRow = ref(props.updateRow);
//emit
const emit = defineEmits();
//dialog控制
const show = ref(props.show);
//表单数据
const userForm = reactive({
    username:'',
    password:'',
    realName:'',
    email:'',
    gender:'1',
    phone:'',
    enabled:'1',
    unitTree:'',//所属机构
    postIds:'',//所属岗位
    remark:'',//备注
})
//所属机构
let unitTree = ref([]);
//所属岗位
let postTree = ref([]);
//角色列表
let roleTree = ref([]);
//生命周期
const { proxy } = getCurrentInstance();
onBeforeMount(async ()=>{
    //用户详情
    if( updateRow.value ){
        let res = await userGet(updateRow.value);
        let { id , username , password ,  realName , email , gender , avatar, remark,phone , enabled , unitId } = res.data.user;
        let { roleIds , postIds } = res.data;
        //数据赋值
        userForm.id = id;
        userForm.username = username;
        userForm.password = password;
        userForm.realName = realName;
        userForm.email = email;
        userForm.gender = gender;
        userForm.phone = phone;
        userForm.enabled = enabled;
        userForm.remark = remark;
        userForm.unitId = unitId;
        userForm.roleIds = roleIds;
        userForm.postIds = postIds;
    }
    //混入
    proxy.sendDicts(['system_global_status','system_global_gender']);
    //机构数据
    let unitData = await unitList();
    unitTree.value = unitData.data;
    //岗位数据
    let postData = await postPage();
    postTree.value = postData.data.records;
    //角色数据
    let roleData = await rolePage();
    roleTree.value =  roleData.data.records;
    console.log(  roleTree.value )
})

//关闭dialog
const close = ()=>{
    emit('update:show',false);
}

const add = async ()=>{
    let res = await userAdd(userForm);
    if( res.code =='200' ) ElMessage({type:'success',message:'修改成功'})
}
const update = async ()=>{
    let res = await userUpdate(userForm);
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

<style lang="scss" scoped>
.user-editor-form {
  :deep(.inline) {
    display: inline-flex;
    vertical-align: middle;
    width: 50%;
  }

  .treeList {
    padding: 2px;
    width: 100%;
  }
}
</style>
