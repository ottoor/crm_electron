<template>
	<div class='adminui-tags'>
		<ul>
			<li 
				v-for='item in tagList'
				:key='item.path'
				:class='item.path == toPath.path ? "active":""'
			>
				<router-link :to='item.path'>
					<span>{{ item.name }}</span>
					<el-icon v-if="item.path!='/dashboard'" @click.prevent.stop='delTag(item)'><close /></el-icon>
				</router-link>
			</li>
		</ul>
	</div>
</template>


<script setup>
import { ref ,reactive, onBeforeMount , watch } from 'vue';

//router
import { useRouter } from 'vue-router'
let router = useRouter();

//pinia
import { useTagStore } from '@store/useTagStore';
let tagStore = useTagStore();
import { useKeepStore } from '@store/useKeepStore'
let keepStore = useKeepStore();
//tag数据
let tagList = ref([]);

//当前路径
let toPath = ref({});

onBeforeMount(()=>{
	tagList.value = tagStore.tagList;
})

//监听路由获取的值(跳转的路由)，传递给状态管理
const addTag = ( val)=>{
	tagStore.addTag( val );
}

//删除标签
const delTag = ( item )=>{
	tagStore.delTag( item );
}


//监听路由
watch(()=>router.currentRoute.value,(newVal)=>{

	toPath.value = newVal;
	
	addTag( newVal );
	//缓存组件
	keepStore.pushKeepAlive( newVal.name );

},{immediate:true})


</script>