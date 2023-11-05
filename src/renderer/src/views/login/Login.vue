<template>
	<div class="login_bg">
    <div class="login_config">
      <div class="toolbar">
      	<!--黑白模式-->
        <el-button circle @click='configDark'>
        	<el-icon v-if='configs.dark=="dark"'><Sunny /></el-icon>
        	<el-icon v-else><Moon /></el-icon> 
        </el-button>
        <!--右上角按钮-->
        <el-dropdown trigger="click" @command="configLang">
          <el-button circle>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path d="M478.33 433.6l-90-218a22 22 0 0 0-40.67 0l-90 218a22 22 0 1 0 40.67 16.79L316.66 406h102.67l18.33 44.39A22 22 0 0 0 458 464a22 22 0 0 0 20.32-30.4zM334.83 362L368 281.65L401.17 362z" fill="currentColor"></path><path d="M267.84 342.92a22 22 0 0 0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73c39.65-53.68 62.11-114.75 71.27-143.49H330a22 22 0 0 0 0-44H214V70a22 22 0 0 0-44 0v20H54a22 22 0 0 0 0 44h197.25c-9.52 26.95-27.05 69.5-53.79 108.36c-31.41-41.68-43.08-68.65-43.17-68.87a22 22 0 0 0-40.58 17c.58 1.38 14.55 34.23 52.86 83.93c.92 1.19 1.83 2.35 2.74 3.51c-39.24 44.35-77.74 71.86-93.85 80.74a22 22 0 1 0 21.07 38.63c2.16-1.18 48.6-26.89 101.63-85.59c22.52 24.08 38 35.44 38.93 36.1a22 22 0 0 0 30.75-4.9z" fill="currentColor"></path></svg>
          </el-button>
          <!--中英文切换   -->
          <template #dropdown >
            <el-dropdown-menu>
              <el-dropdown-item
								v-for="item in config.LANG"
								:key="item.value"
								:command="item"
							  >{{  item.value }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!--关闭-->
        <el-button icon="close" circle type="default" @click="closeWindow"></el-button>
      </div>
    </div>
		<div class="login_adv" style="background: url('images/auth_banner.jpg');">
			<div class="login_adv__title">
				<h2>鹿线开源</h2>
				<h4> {{  $t('login.slogan')  }}</h4>
				<p>{{ $t('login.describe') }}</p>
			</div>
			<div class="login_adv__mask"></div>
			<div class="login_adv__bottom">
				© 小鹿线开源
			</div>
		</div>
        <!--  右边  -->
		<div class="login_main">
			<div class="login-form">
				<div class="login-header">
					<div class="logo">
						<img src="/images/logo.png">
						<label>小鹿线开源</label>
					</div>
				</div>
                <el-tabs v-model="activeName" class="demo-tabs">
                    <el-tab-pane label="帐号登录" name="user">
                        <User />
                    </el-tab-pane>
                    <el-tab-pane label="手机号登录" name="tel">
                        <Phone />
                    </el-tab-pane>
                </el-tabs>
                <!--微信扫码登录-->
                <el-divider>其他登录方式</el-divider>
                <div class="login-oauth">
                    <!--微信按钮-->
                    <el-button type="success" circle size="large">
                        <el-icon><ChatDotRound /></el-icon>
                    </el-button>
                </div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref , reactive , getCurrentInstance } from 'vue'
const activeName = ref('user');
import User from './module/User.vue'
import Phone from './module/Phone.vue'

//config 
import config from '@config'

const instance = getCurrentInstance();
let { proxy } = instance;
//切换语音
const configLang = ( item )=>{
	proxy.$i18n.locale = item.value;
	localStorage.setItem('lang',item.value);
}

//关闭
const closeWindow = ()=>{
	//渲染进程 通信主进程
	electron.ipcRenderer.invoke('renderer-to-main',{
		name: 'close-window',
	})
}


//换肤设置
const configs = reactive({
	dark:localStorage.getItem('dark') || false
})
//换肤
const configDark = () => {

	if( document.querySelector('html').className =='dark' ){
		document.querySelector('html').className='';
	}else{
		document.querySelector('html').className='dark';
	}

	configs.dark = document.querySelector('html').className;

	localStorage.setItem('dark',document.querySelector('html').className);
	
}
</script>

<style scoped>
.login_bg {width: 100%;height: 100%;background: #fff;display: flex;}
.login_adv {width: 40%;background-color: #555;background-size: cover;background-position: center center;background-repeat: no-repeat;position: relative;}
.login_adv__title {color: #fff;padding: 40px;position: absolute;top:0px;left:0px;right: 0px;z-index: 2;}
.login_adv__title h2 {font-size: 40px;}
.login_adv__title h4 {font-size: 18px;margin-top: 10px;font-weight: normal;}
.login_adv__title p {font-size: 14px;margin-top:10px;line-height: 1.8;color: rgba(255,255,255,0.6);}
.login_adv__title div {margin-top: 10px;display: flex;align-items: center;}
.login_adv__title div span {margin-right: 15px;}
.login_adv__title div i {font-size: 40px;}
.login_adv__title div i.add {font-size: 20px;color: rgba(255,255,255,0.6);}
.login_adv__bottom {position: absolute;left:0px;right: 0px;bottom: 0px;color: #fff;padding: 40px;background-image:linear-gradient(transparent, #000);z-index: 3;}
.login_adv__mask {position: absolute;top:0px;left:0px;right: 0px;bottom: 0px;background: rgba(0,0,0,0.5);z-index: 1;}

.login_main {flex: 1;overflow: auto;display:flex;}
.login-form {width: 400px;margin: auto;padding:80px 0 0 0;}
.login-header {margin-bottom: 40px;}
.login-header .logo {display: flex;align-items: center;justify-content: center}
.login-header .logo img {width: 40px;height: 40px;vertical-align: bottom;margin-right: 10px;}
.login-header .logo label {font-size: 26px;font-weight: bold;}
.login-oauth {display: flex;justify-content:space-around;}
.login-form .el-divider {margin-top:40px;}

.login-form:deep(.el-tabs) .el-tabs__header {margin-bottom: 25px;}
.login-form:deep(.el-tabs) .el-tabs__header .el-tabs__item {font-size: 14px;}

.login-form:deep(.login-forgot) {text-align: right;}
.login-form:deep(.login-forgot) a {color: var(--el-color-primary);}
.login-form:deep(.login-forgot) a:hover {color: var(--el-color-primary-light-3);}
.login-form:deep(.login-reg) {font-size: 14px;color: var(--el-text-color-primary);}
.login-form:deep(.login-reg) a {color: var(--el-color-primary);}
.login-form:deep(.login-reg) a:hover {color: var(--el-color-primary-light-3);}

.login_config {
position: absolute;
top: 0;
right: 0;
width: 100%;
z-index: 9999;
user-select: none;
-webkit-app-region: drag;
}
.login_config .toolbar{
display: flex;
justify-content: space-between;
align-items: center;
width: 120px;
margin: 10px 10px 0 0;
float: right;
user-select: none;
-webkit-app-region: no-drag;
}
.el-button + .el-dropdown {
	margin-left: 0;
}

.login-form:deep(.login-msg-yzm) {display: flex;width: 100%;}
.login-form:deep(.login-msg-yzm) .el-button {margin-left: 10px;--el-button-size:42px;}

.qrCodeLogin {text-align: center;position: relative;padding: 20px 0;}
.qrCodeLogin img.qrCode {background: #fff;padding:20px;border-radius:10px;}
.qrCodeLogin p.msg {margin-top: 15px;}
.qrCodeLogin .qrCodeLogin-result {position: absolute;top:0;left:0;right: 0;bottom: 0;text-align: center;background: var(--el-mask-color);}
</style>
