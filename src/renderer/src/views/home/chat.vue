<template>
    <el-container>
        <el-header class="titleBar" height="40px">
            <div class="title">聊天窗口</div>
            <!-- 关闭 -->
            <el-icon class="close" size="large">
            <el-icon-close/>
            </el-icon>
        </el-header>
        <el-container>
        <!--  左  -->
            <el-aside width="240px">
                <el-tabs type="border-card" style="height: 428px;">
                    <el-tab-pane label="联系人">
                        <el-tree
                            ref="treeRef"
                            :data="treeList"
                            :expand-on-click-node="false"
                            highlight-current
                            default-expand-all
                            node-key="id"
                            @node-click="onNodeClick"
                        >
                            <template #default="{ node, data }">
                                <div v-if="data.type === '_type_unit'">{{ data.name }}</div>
                                <div v-if="data.type === '_type_user'" class="contacts-user-item">
                                    <el-avatar
                                        :src="data.avatar"
                                        size="small"
                                    />
                                    {{ data.realName }}
                                </div>
                            </template>
                        </el-tree>
                    </el-tab-pane>
                    <el-tab-pane label="会话列表">
                        <div class="session-list">
                            <div class="session-list-item" v-for="item in sessionList" :key="item.id" style="margin-bottom: 10px"
                                @click="goChat(item)" :id="item.id">
                                <template v-if="item.promoter == -1">
                                    <el-avatar circle src="/images/logo.png"/>
                                    <div class="info">
                                    <h4>系统消息</h4>
                                    <span class="info-text">{{ item.messages[0]?.messageBodyContent }}</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <el-avatar circle :src="item.promoter === userInfo.id ? item.partakerAvatar : item.promoterAvatar"/>
                                    <div class="info">
                                        <h4>{{ item.promoter === userInfo.id ? item.promoterUsername : item.promoterUsername }}</h4>
                                        <span class="info-text">{{ item.messages[0]?.messageBodyContent }}</span>
                                    </div>
                                    <span>[1]</span>
                                </template>
                                <div class="close-btn" text @click="deleteSession(item.id)">
                                    <el-icon><el-icon-close/></el-icon>
                                </div>
                            </div>
                        </div>
                        <div v-if="sessionList.length == 0 ">
                            <h3 style="text-align: center;">暂无聊天会话</h3>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-aside>
            <!--中间聊天框-->
            <el-main class="nopadding" v-if="currentSession">
                <div id="app">
                    <div class="chat-room">
                        <div class="chat-header" v-if="currentSession.promoter == -1">
                            <el-avatar src="/images/logo.png" size="default" circle/>
                            <h3>系统消息</h3>
                        </div>
                        <div class="chat-header" v-else>
                            <el-avatar
                                size="default"
                                circle
                                :src="currentSession.promoter === userInfo.id ? currentSession.partakerAvatar : currentSession.promoterAvatar"
                            />
                            <h3>正在与 {{
                                currentSession.promoter === userInfo.id ? currentSession.promoterRealname : currentSession.promoterRealname
                            }} 对话...</h3>
                        </div>
                        <div class="chat-body" ref="chatBody" @scroll="scrollTopHandler">
                            <div class="chat-message">
                            <ul class="chat-message-ul">
                                <li :id="message.id" v-for="(message, i) in currentSession.message" :key="i"
                                    :class="message.toUserId === userInfo.id  ? 'left_word' : 'right_word'"
                                >
                                <span>{{ message.messageBodyContent }}</span>
                                </li>
                            </ul>
                            </div>
                        </div>
                        <div class="chat-footer">
                            <el-input type="textarea" v-model="message" placeholder="说点什么..."
                                    @keyup.enter="sendMessage"></el-input>
                            <el-button type="primary" @click="sendMessage">发送</el-button>
                        </div>
                    </div>
                </div>
            </el-main>
            <el-main v-else>
                <h3 style="text-align: center; margin-top: 20px">请选择一个联系人来开始聊天</h3>
            </el-main>
            <!-- 右 -->
            <el-aside width="260px">
                <el-card :body-style="{ padding: '0px' }" style="height: 100%">
                    <div style="display: flex;flex-direction: column;align-items: center;margin-top: 20px">
                    <el-avatar size="large" :src="userInfo.avatar"/>
                    <h2 style="margin-top: 10px">{{ userInfo.username }}</h2>
                    <p style="margin-top: 5px">{{ userInfo.unit?.name }}</p>
                    </div>
                    <div style="margin:20px">
                    <el-text class="mx-1" type="info">
                        <el-icon>
                        <el-icon-user/>
                        </el-icon>
                        <span class="textUser">{{ userInfo.realName }}</span>
                    </el-text>
                    <el-text class="mx-1" type="info">
                        <el-icon>
                        <el-icon-iphone/>
                        </el-icon>
                        <span class="textUser">{{ userInfo.unit?.mobile }}</span>
                    </el-text>
                    <el-text class="mx-1" type="info">
                        <el-icon>
                        <el-icon-message/>
                        </el-icon>
                        <span class="textUser">{{ userInfo.email }}</span>
                    </el-text>
                    </div>
                </el-card>
            </el-aside>
        </el-container>
    </el-container>
</template>

<script setup >
import { onBeforeMount , ref , reactive } from 'vue'
//api
import { chatContacts , chatSessions  , chatSession , chatHistory } from '@api/chat'
//pinia
import { storeToRefs } from 'pinia'
import { useUserStore } from '@store/useUserStore'
const { userInfo } = storeToRefs(useUserStore());
//token
let token = localStorage.getItem("TOKEN");
//Socket对象
let websocket = reactive(null);
//uuid
import { nanoid } from 'nanoid';
//当前联系人
let currentSession = ref({
    messages:[],
    promoterUsername:'',//和谁聊天【名称】
});
//生命周期
onBeforeMount(async ()=>{
    //1. 创建WebSocket对象
    websocket = new WebSocket('ws://uat.crm.xuexiluxian.cn/crm/websocket' , token );
    //2. 连接成功后的回调函数
    websocket.onopen = ()=>{
        console.log('链接成功');
    };
    //3. 从服务器接收信息时的回调函数
    websocket.onmessage = ( e )=>{

        const data = JSON.parse( e.data );
        currentSession.value.messages.push({
            id: data.id,
            event: data.event,
            fromUserId: data.fromUserId,
            toUserId: data.toUserId, 
            msgType: data.msgType,
            message: {
                type: data.message.type,
                content: data.message.content, 
            },
            messageBodyType: data.message.type,
            messageBodyContent:data.message.content,
        })
    };  
    //获取通讯录
    await getContacts();
    //获取会话列表
    await getSessions();
})

//获取通讯录
let treeList = ref([]);
const getContacts = async ()=>{
    let { data } = await chatContacts();
    treeList.value = data;
}
//获取会话列表
let sessionList = ref([]);
const getSessions = async ()=>{
    let res = await chatSessions();
    sessionList.value = res.data.records;
}
//点击联系人菜单
const onNodeClick = async ( node )=>{
    if( node.id == userInfo.value.id ) return console.log('不自己聊~');
    //1. 获取会话 : 第一个参数是对方，第二个参数是自己
    let { data } = await chatSession(  node.id, userInfo.value.id  );
    currentSession.value = data;
    //2. 获取聊天记录
    loadHistory();
}
//点击会话列表
const goChat = ( item )=>{
    currentSession.value = item;
    loadHistory();
}
//聊天记录
const loadHistory = async ()=>{
    let res = await chatHistory({
        sessionId:currentSession.value.id
    });
    currentSession.value.message = res.data.records;
}
//发送内容
let message = ref('');
//发送消息
const sendMessage = ()=>{
    if( message.value.trim() =='' ) return;

    const msg = {
        id: nanoid(),
        event: 'message',
        fromUserId: userInfo.value.id,//谁发消息的id
        toUserId: currentSession.value.promoter, //谁接收消息的id
        msgType: 'text',//打消息的类型
        message: {
            type: 'message',
            content: message.value, //当前发送的消息
        },
        messageBodyType: 'message',
        messageBodyContent: message.value,//当前发送的消息
    }
    //向服务端发送的消息
    websocket.send(  JSON.stringify(msg)  );
    //视图展示的消息
    currentSession.value.message.push( msg );
    message.value = '';
    getSessions();
}
</script>




<style lang="less" scoped>
  .titleBar {
    -webkit-app-region: drag;
    user-select: none;
  }
  
  .title {
    -webkit-app-region: no-drag;
    font-size: 14px;
    font-weight: bold;
    color: #3c4a54;
  }
  
  .close {
    -webkit-app-region: no-drag;
    cursor: pointer;
  }
  
  .session-list {
    list-style: none;
  
    .session-list-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
  
      .el-avatar {
        margin-right: 10px;
        width: 40px;
      }
  
      .info {
        width: calc(100% - 70px);
        flex: 1;
  
        h4 {
          height: 20px;
          line-height: 20px;
        }
  
        .info-text {
          display: inline-block;
          width: 100%;
          line-height: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #6b6d71;
        }
      }
  
      .close-btn {
        width: 20px;
      }
    }
  }
  
  :deep(.el-tree-node__content) {
    height: unset !important;
  }
  
  .offline {
    filter: grayscale(100%);
  }
  
  .mx-1 {
    display: block;
  }
  
  .textUser {
    margin-left: 10px;
  }
  
  .chat-room {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #f5f5f5;
  
    .chat-header {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background: #fff;
      border-bottom: #dddddd solid 1px;
  
      h3 {
        line-height: 50px;
        font-weight: normal;
        font-size: 16px;
      }
  
      .el-avatar {
        margin: 0 10px;
        width: 35px;
        height: 35px;
        border: #f2f2f2 solid 1px;
      }
    }
  
    .chat-body {
      width: 100%;
      height: 320px;
      overflow-y: auto;
      background: #ffffff;
  
      .chat-message-ul {
        display: flex;
        flex-direction: column;
  
        li {
          overflow: hidden;
          margin: 0 0 20px 0;
        }
  
        .left_word {
          span {
            float: left;
            background-color: #f2f2f2;
            padding: 10px;
            max-width: 290px;
            border-radius: 12px;
            font-size: 14px;
            color: #000;
            margin-left: 13px;
            position: relative;
            line-height: 24px;
            word-break: break-word;
          }
  
          span:before {
            content: '';
            position: absolute;
            left: -8px;
            top: 3px;
            width: 13px;
            height: 10px;
          }
        }
  
        .right_word {
          span {
            float: right;
            background-color: #a9ea79;
            padding: 10px;
            max-width: 290px;
            border-radius: 12px;
            font-size: 14px;
            color: #000;
            margin-right: 13px;
            position: relative;
            line-height: 24px;
            word-break: break-word;
          }
  
          span:before {
            content: '';
            position: absolute;
            right: -8px;
            top: 3px;
            width: 13px;
            height: 10px;
          }
        }
      }
    }
  
    .chat-footer {
      width: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      border-top: #dddddd solid 1px;
  
      .el-textarea {
        height: 100%;
  
        :deep(.el-textarea__inner) {
          height: 100% !important;
        }
      }
  
      .el-button {
        width: 100px;
        height: 100%;
      }
    }
  }
  
  .contacts-user-item {
    height: 40px;
    display: flex;
    align-items: center;
  
    .el-avatar {
      margin-right: 5px;
      border: #f2f2f2 solid 1px;
    }
  }
</style>