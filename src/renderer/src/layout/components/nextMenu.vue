<template>
	<div v-if='nextMenuList.length <= 0'>
		没有子级菜单
	</div>
	<template 
		v-for='navItem in nextMenuList'
		:key='navItem'
	>
		<!--判断二级有没有三级-->
		<el-menu-item v-if='hasChildren(navItem)' :index='navItem.path'>
			有子
		</el-menu-item>

		<!--二级菜单渲染-->
		<el-menu-item v-else :index='navItem.path'>
			<el-icon>
				<component :is='navItem.meta.icon.replace("el-icon-","") || "user" ' />
			</el-icon>
			<template #title>
				<span>{{navItem.name}}</span>
			</template>
		</el-menu-item>
	</template>
</template>


<script setup>
import { reactive , onBeforeMount } from 'vue';

const props = defineProps({
	nextMenuList:Object
})

//生命周期
onBeforeMount(()=>{
	let nextMenuList = reactive( props.nextMenuList );
})

//判断当前二级下有没有三级
const hasChildren = ( item )=>{
	return item.children && !item.children.every( item=>item.meta.hidden );
}
</script>