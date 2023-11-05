<template>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="0" size="large" @keyup.enter="login">
      <el-form-item prop="mobile">
        <el-input v-model="form.mobile" prefix-icon="iphone" placeholder="请输入手机号">
          <template #prepend>+86</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha" style="margin-bottom: 35px;">
        <div class="login-msg-yzm">
          <el-input v-model="form.captcha" prefix-icon="unlock" placeholder="验证码"></el-input>
          <el-button @click="getCode" :disabled="disabled">请输入验证码<span
              v-if="disabled"> ({{  time  }})</span></el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%;" :loading="islogin" round @click="login">
            登录
        </el-button>
      </el-form-item>
    </el-form>
</template>

<script setup>
import { ref , reactive  } from 'vue'
//api
import { sendCaptcha , loginByMobile  } from '@api/login'
//aes
import { Encrypt } from '@utils/aes'
//hooks
import useLogin from '@hooks/useLogin'
//表单
const form = reactive({
    mobile:'',
    captcha:''
})
//验证
const rules = reactive({

})
//发送验证码按钮
const disabled = ref(false);
//倒计时时间 
let time = ref(10);
//发送验证码
const getCode = async ()=>{
    
    let res = await sendCaptcha({mobile:Encrypt( form.mobile )});
    if( res.code !='200' ){
        return ElMessage({
            message: '发送失败，请检查网络...',
            type: 'error',
        })
    }
    ElMessage({
        message: '发送中...',
        type: 'success',
    })
    disabled.value = true;
    time.value = 10;
    let t = setInterval(() => {
        time.value -= 1;
        if (time.value < 1) {
            clearInterval(t)
            disabled.value  = false
            time.value  = 0
        }
    }, 1000)
}
//登录
const login = async ()=>{

    let res = await loginByMobile({
        mobile:Encrypt( form.mobile ),
        captcha:Encrypt( form.captcha ),
    })
    if( res.code == '200' ){
        //调用hooks
        useLogin( res.data );
    }

}
</script>