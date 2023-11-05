<template>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="0" size="large" @keyup.enter="login">
        <el-form-item prop="user">
            <el-input v-model="form.username" prefix-icon="user" clearable placeholder="输入用户名">
            </el-input>
        </el-form-item>

        <el-form-item prop="password">
            <el-input v-model="form.password" prefix-icon="lock" clearable show-password placeholder="输入密码"></el-input>
        </el-form-item>
      
        <el-form-item>
            <div class="boxCode">
                <el-input v-model="form.captcha" prefix-icon="CircleCheck" clearable placeholder="请输入验证码" class="plinpnt"></el-input>
                <el-image :src="captcha.url" @click="getCodeApi" class="code"></el-image>
            </div>
        </el-form-item>
  
        <el-form-item style="margin-bottom: 10px;">
            <el-col :span="12">
                <el-checkbox v-model="checkPassword" @change="onMemoPassword">记住密码</el-checkbox>
            </el-col>
        </el-form-item>
    
        <el-form-item>
            <el-button type="primary" style="width: 100%;" round @click="login">登录</el-button>
        </el-form-item>

    </el-form>
  </template>
  
<script setup>
import { ref , reactive , onBeforeMount } from 'vue'
//api
import { captchaImg , loginByJson } from '@api/login'
//aes
import { Encrypt , Decrypt } from '@utils/aes'
//hooks
import useLogin from '@hooks/useLogin'
import useMemoPassword from '@hooks/useMemoPassword'

//表单数据
const form = reactive({
    username:'',
    password:'',
    captcha:''
})
//表单验证
const rules = reactive({
   
})
//验证码
let captcha = reactive({
    url:'',
    key:''
})
//生命周期
onBeforeMount(()=>{
    let userPwd = localStorage.getItem('user-pwd');
    if( userPwd ){
        let { username ,password } = JSON.parse( localStorage.getItem('user-pwd') );
        form.username = Decrypt(username);
        form.password = Decrypt(password);
    }
    //获取验证码
    getCodeApi();
})

//生成验证码
const getCodeApi = async ()=>{
    const key = new Date().getTime().toString();
    captcha.key = key;
    const res = await captchaImg({ key })
    let blob = new Blob([res],{type:'application/vnd.ms-excel'});
    let imgUrl = URL.createObjectURL( blob );
    captcha.url = imgUrl;
}

//登录
const login = async ()=>{
    let res = await loginByJson({
        username:Encrypt(form.username),
        password:Encrypt(form.password),
        key:captcha.key,
        captcha:form.captcha
    })
    if( res.code ==200 ){
        //调用hooks
        useLogin( res.data );
        //记住密码
        setMemoPassword();
    }
}

//hooks数据
let {  memoVal, onMemoPassword } = useMemoPassword();
//记住密码-数据
let checkPassword = ref( memoVal );
//记住密码
const setMemoPassword = ()=>{
    checkPassword.value ? localStorage.setItem('user-pwd',JSON.stringify({
        username:Encrypt(form.username),
        password:Encrypt(form.password),
    })) : localStorage.removeItem('user-pwd');
}
</script>

<style>
.boxCode{
    display: flex;
    align-items: center;
    width: 100%;
}
.code{
    margin-left: 10px;
    height: 40px;
    cursor: pointer;
}
</style>
  