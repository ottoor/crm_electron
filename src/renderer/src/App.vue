<template>
  <el-config-provider :locale="locale">
    <div style="width:100vw;height: 100vh;overflow: hidden;">
      <router-view />
    </div>
  </el-config-provider>
</template>

<script setup>
import { getCurrentInstance ,computed } from 'vue'
let { proxy } = getCurrentInstance();
let locale = computed(()=>{
  return proxy.$i18n.messages[proxy.$i18n.locale]?.el;
})
//消息个数
localStorage.setItem('socketNum',0);
</script>

<style lang='scss'>
@import '@renderer/assets/css/style.scss';
*{margin:0;padding:0;}
</style>

