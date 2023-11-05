<template>
    <el-container>
        <el-header height="auto" class="no-flex">
            <el-button type="primary" icon="Plus">新建咨询</el-button>
            <el-button type="primary" icon="Plus">办理入学</el-button>
        </el-header>
        <el-container>
            <el-main>
                <el-row :gutter="20">
                    <el-col :span="16">
                        <el-card header="我的任务" style="height:100%">
                            <div class="time-box">
                                <div class="time-box-picker">
                                    <el-date-picker
                                        v-model="dates"
                                        @change="updateChange"
                                        type="date"
                                        placeholder="自定义时间"
                                        style="width: 120px;"
                                    />
                                </div>
                                <div class="time-box-text">{{ currentDate.dateStr }}</div>
                                <div class="time-box-btn">
                                    <el-link :underline="false" type="primary" @click="backToday">回到今天</el-link>
                                </div>
                            </div>
                            <div class="time-btn">
                                <div class="time-btn-item" @click="prevDate">
                                    <el-icon><el-icon-arrowLeft/></el-icon>
                                </div>
                                <div 
                                    class="time-btn-item" 
                                    v-for="item in weekList" 
                                    :key="item.date"
                                    :class="item.dateStr == currentDate.dateStr ? 'active':''"
                                    @click="currentDay(item)"
                                >   
                                    周{{ item.week }}
                                    {{ item.month }}.{{ item.dayOfMonth }}
                                </div>
                                <div class="time-btn-item" @click="nextDate">
                                    <el-icon><el-icon-arrowRight/></el-icon>
                                </div>
                            </div>
                            <div class="time-table" v-if="clientList.length > 0">
                                <el-table :data="clientList" border>
                                    <el-table-column label="序号" type="index" width="55" align="center"/>
                                    <el-table-column label="姓名" prop="name" align="center"/>
                                    <el-table-column label="手机号" prop="mobile" align="center"/>
                                    <el-table-column label="操作" width="140" fixed="right" align="center">
                                        <template #default="{row}">
                                            <el-link :underline="false" type="primary" icon="Edit">读出来</el-link>
                                            <el-link :underline="false" type="primary" icon="Edit">AI人出来</el-link>
                                            <el-link :underline="false" type="primary">{{ row.school }}</el-link>
                                            <!-- <el-link :underline="false" type="primary" icon="Avatar">办理报名</el-link>
                                            <el-link :underline="false" type="primary" icon="Edit">跟进信息</el-link>
                                            <el-link :underline="false" type="primary" icon="Edit">编辑信息</el-link> -->
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div v-else class="time-table-else">
                                <el-icon size="100px" color="#F2F5F7">
                                    <el-icon-folderDelete/>
                                </el-icon>
                                <p style="font-size: 16px;color:#a8b4b5">今天没有任务~</p>
                            </div>
                        </el-card>
                    </el-col>
                    <!---我的成交额-->
                    <el-col :span="8">
                        <el-card header="我的成交额" class="aside-card">
                            <el-date-picker
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="截止时间"
                                format="YYYY-MM-DD"
                                value-format="YYYY-MM-DD HH:mm:ss"
                                style="width: 100%"
                            />
                            <div class="aside-card-content">
                                <div class="aside-card-content-item">
                                    <div class="aside-card-content-item-icon">
                                    <el-icon size="40px" color="#24BCFF">
                                        <el-icon-monitor/>
                                    </el-icon>
                                    </div>
                                    <div style="margin-left: 5px">成交人数(人)<h2>11</h2></div>
                                </div>
                                <div class="aside-card-content-item">
                                    <div class="aside-card-content-item-icon">
                                    <el-icon size="40px" color="#FFA131">
                                        <el-icon-money/>
                                    </el-icon>
                                    </div>
                                    <div style="margin-left: 5px">应收成交额(元)<h2>22</h2></div>
                                </div>
                                <div class="aside-card-content-item">
                                    <div class="aside-card-content-item-icon">
                                    <el-icon size="40px" color="#5097FF">
                                        <el-icon-editPen/>
                                    </el-icon>
                                    </div>
                                    <div style="margin-left: 5px">成交订单(笔)<h2>33</h2></div>
                                </div>
                                <div class="aside-card-content-item">
                                    <div class="aside-card-content-item-icon">
                                    <el-icon size="40px" color="#FF279E">
                                        <el-icon-calendar/>
                                    </el-icon>
                                    </div>
                                    <div style="margin-left: 5px">订单实收(元)<h2>44</h2></div>
                                </div>
                            </div>
                        </el-card>
                        <el-card header="我的漏斗" class="aside-card">
                            <el-date-picker
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="截止时间"
                                format="YYYY-MM-DD"
                                value-format="YYYY-MM-DD HH:mm:ss"
                                style="width: 100%"
                            />
                            <div class="charts-box">
                                <div class="charts-box-left">
                                    <Funnel height="300px"></Funnel>
                                </div>
                                <div class="charts-box-right">
                                    <div>
                                    <h3>成功率:
                                        <el-text type="primary">11</el-text>
                                    </h3>
                                    <span>(已成交/全部咨询)</span>
                                    </div>
                                    <div>
                                    <h3>失败率:
                                        <el-text type="primary">22</el-text>
                                    </h3>
                                    <span>(已退款/全部咨询)</span>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
        <!-- <addFollow v-model="showAddFollow" ref="addFollowDialog" @close="handleClose"></addFollow>
        <editClient v-model="showEdit" ref="editDialog" @closeEdit="handleCloseEdit"></editClient> -->
    </el-container>
</template>
  
<script setup>
import { ref  ,  reactive ,onBeforeMount } from 'vue'
//工具类
import utils from '@utils'
//api
import { consultPage , transaction , statisticFunnel  } from './api'
//echarts图表
import Funnel from '@components/charts/funnel/index.vue'
//当前时间
let currentDate = reactive({})
//时间选择
const dates = ref('');
//当周7天数组
let weekList = ref([]);
//本周时间
let weekData = reactive([
    {index:0,week:'日'},
    {index:1,week:'一'},
    {index:2,week:'二'},
    {index:3,week:'三'},
    {index:4,week:'四'},
    {index:5,week:'五'},
    {index:6,week:'六'},

])
//当前任务列表
const clientList = ref([]);
//生命周期
onBeforeMount(()=>{
    //修改当前时间
    changeData();
    //漏斗图
    //1. 封装
    //2. 请求
    //3. 修改时间==>请求
    //statisticFunnel()
})
//改变当前时间
const updateChange = ( e )=>{
    changeData( e );
}
//修改时间
const changeData = ( date=new Date()  )=>{    
    const dateStr = utils.getTime(date,'yyyy-MM-dd');
    currentDate = {
        date:date,//标准时间
        dateStr:dateStr,//转换后时间
        year:date.getFullYear(),
        month:date.getMonth()+1,
        dayOfMonth:date.getDate(),
        dayOfWeek:date.getDay()
    }
    //赋空
    weekList.value = [];
    //查询客户列表
    getConsultPage({
        startTime:dateStr+' 00:00:00',
        endTime:dateStr+' 23:59:59',
    })
    //展示tabs日期时间
    weekData.forEach(item=>{
        const diffDay = currentDate.dayOfWeek - item.index;
        const tagetDate = new Date();
        tagetDate.setFullYear(  currentDate.year  );
        tagetDate.setMonth( currentDate.month - 1   );
        tagetDate.setDate( currentDate.date.getDate() - diffDay );
        const trgetDateStr = utils.getTime(tagetDate,'yyyy-MM-dd');

        const date = {
            date:tagetDate,
            dateStr:trgetDateStr,
            year:tagetDate.getFullYear(),
            week:item.week,
            month:tagetDate.getMonth()+1,
            dayOfMonth:tagetDate.getDate()
        }
        weekList.value.push(date);
    })

}
//客户列表
const getConsultPage = async (params)=>{
    let res = await consultPage({
        isSelf:true,
        ...params
    })
    clientList.value = res.data.records;
}
//回到今天
const backToday = ()=>{
    changeData();
}
//上周时间 
const prevDate = ()=>{
    const prevWeekDate = new Date();
    prevWeekDate.setFullYear( currentDate.year  );
    prevWeekDate.setMonth( currentDate.month - 1 );
    prevWeekDate.setDate( currentDate.dayOfMonth - 7 );

    changeData( prevWeekDate );
}
//下周时间
const nextDate = ()=>{
    const prevWeekDate = new Date();
    prevWeekDate.setFullYear( currentDate.year  );
    prevWeekDate.setMonth( currentDate.month - 1 );
    prevWeekDate.setDate( currentDate.dayOfMonth + 7 );

    changeData( prevWeekDate );
}
//切换时间
const currentDay = ( time )=>{
    currentDate = time;
    getConsultPage({
        startTime:time.dateStr+' 00:00:00',
        endTime:time.dateStr+' 23:59:59',
    })
}

</script>
<style scoped lang="scss">
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
.charts-box-left {
    width: 100%;
    height: 220px
}

.charts-box-right {
    display: flex;
    justify-content: space-around;
    color: #5c6065;

    p {
    color: #72767b;
    }
}
}

.time-box {
display: flex;
justify-content: space-between;
align-items: center;

div {
    flex: 1;
}

.time-box-text {
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    color: #72767b;
}

.time-box-btn {
    text-align: right;
}
}


.time-btn {
margin-top: 20px;
display: flex;
justify-content: space-around;
}

.time-btn-item {
margin-left: 5px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
width: 90px;
height: 40px;
background: #F2F5F7;
border-radius: 4px 4px 4px 4px;
opacity: 1;
}

.active {
background-color: #409EFF;
color: #fff;
}

.aside-card-content {
margin-top: 10px;
display: flex;
flex-wrap: wrap;
align-items: center;

.aside-card-content-item {
    width: 50%;
    height: 50px;
    margin-top: 10px;
    display: flex;

    .aside-card-content-item-icon {
    width: 40px;
    height: 40px;
    }
}
}

.time-table {
margin-top: 20px;
}

.time-table-else {
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 100px;
}
</style>
  
  