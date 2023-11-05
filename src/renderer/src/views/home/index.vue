<template>
	<div>
		<h2>仪表盘</h2>

		<el-upload
			v-model:file-list="fileList"
			class="upload-demo"
			multiple
			:http-request='upload'
		>
			<el-button type="primary">Click to upload</el-button>
			<template #tip>
				<div class="el-upload__tip">
					jpg/png files with a size less than 500KB.
				</div>
			</template>
		</el-upload>
	</div>
</template>

<script setup name='仪表盘'>
import { ref } from 'vue'
// 工具类
import utils from '@utils'
//上传文件列表
const fileList = ref([]);
//上传操作
const upload = ( options )=>{
	utils.oss.upload( options.file );
}
</script>