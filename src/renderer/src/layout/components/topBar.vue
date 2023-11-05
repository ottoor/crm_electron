<template>
	<div class='top-bar'>
		<div class="left-panel">
			<el-breadcrumb v-for='item in hash' :key='item.path'>
				<el-icon>
					<component :is="item.meta.icon.replace('el-icon-','')" />
				</el-icon>
				{{ item.name }}
			</el-breadcrumb>
		</div>
		<div class='right-panel'>
			<slot />
		</div>
	</div>
</template>

<script setup>
import { ref , watch } from 'vue'

//router
import { useRoute , useRouter } from 'vue-router'
let route = useRoute();
let router = useRouter();

//导航数据
let hash = ref([]);

//监听路由
watch(()=>router.currentRoute.value.path,()=>{
	hash.value = route.meta.breadcrumb;
},{immediate:true})
</script>

<style scoped>
.top-bar{
	display: flex;
	justify-content: space-between;
	align-items: center;

	height: 50px;
	border-bottom: 1px solid #ebeef5;
	background: #fff;
	box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);

	-webkit-app-region: drag;
}
.left-panel{
	display: flex;
}
.right-panel{
	-webkit-app-region: no-drag;
}
.el-breadcrumb{
	margin-left: 16px;
	display: flex;
	align-items: center;
}
.el-breadcrumb i{
	margin-right:10px;
}

</style>