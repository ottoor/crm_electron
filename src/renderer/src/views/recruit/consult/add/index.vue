<template>
    <div>
        <h1>新建XX组件</h1>
        <button v-auths="'system:user:add'">新建</button>
        <button v-auths="'system:user:del'">删除</button>
        <button v-auths="'system:user:update'">修改</button>
    </div>
</template>