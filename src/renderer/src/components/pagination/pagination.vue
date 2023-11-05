<template>
    <el-pagination
        :current-page="pages.current"
        :page-size="pages.size"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pages.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
</template>

<script setup>
//接收父组件值
const props = defineProps({
    pages:{
        default:{
            current:1,
            size:10,
            total:10
        },
        type:Object
    },
})
let peages = props.pages;
//emit
const emit = defineEmits();

const handleSizeChange = ( val )=>{
    emit('changeSize', val)
}
const handleCurrentChange = ( val )=>{
    emit('changeCurrent', val)
}

</script>