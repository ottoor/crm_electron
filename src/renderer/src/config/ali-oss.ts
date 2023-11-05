//引入oss
import OSS from 'ali-oss'

//实例化 OSS ： 创建OSS对象
export const clint = new OSS({
    bucket: 'xiaoluxian-1302830050', //bucket名称
    region: 'oss-cn-beijing',  //区域
    endpoint: 'oss-cn-beijing.aliyuncs.com',//地域节点 ===> 外网访问
    accessKeyId: 'LTAI5t9m6NZe2GiCsFBiF2nT', //访问键ID
    accessKeySecret: 'EPnMPkHg41O7Tk3wZh212wLmQ6r7jA', //访问密钥
    secure:true, //如果是http默认就是false，如果是https就要写成true
});
