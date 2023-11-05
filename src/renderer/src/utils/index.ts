const utils = {};

import { nanoid  } from "nanoid";
import { clint } from '@config/ali-oss'
import { ElMessage } from "element-plus";
utils.oss = {
	//上传方法 
	upload( file ){
		const uuid = nanoid();
		//截取文件后缀名
		let index = file.name.lastIndexOf('.');
		const suffix = file.name.substring( index + 1 );
		//上传的文件名称
		let fileName = uuid +'.'+suffix;
		//当前时间
		let currentDate = utils.getTime( new Date() , 'yyyy-MM-dd' );
		//存放文件的路径
		let fileIpc = 'xiaoluxian-crm/'+currentDate+'/'+fileName;
		//参数1:存放路径
		//参数2:文件对象
		//参数3:是上传操作对象
		clint.multipartUpload(fileIpc,file,{
			progress: function (p, cpt, res) {
				console.log(p, cpt, res);
			}
		}).then(res=>{
			if( res.res.status == 200 ){
				ElMessage({
					message:'上传功能',
					type:'success'
				})
			}
		})
	}
}
//时间戳转换成标准时间
utils.getTime = ( date, fmt='yyyy-MM-dd hh:mm:ss' )=>{
	date = new Date(date);
	var o = {
		"M+" : date.getMonth()+1,                 //月份
		"d+" : date.getDate(),                    //日
		"h+" : date.getHours(),                   //小时
		"m+" : date.getMinutes(),                 //分
		"s+" : date.getSeconds(),                 //秒
		"q+" : Math.floor((date.getMonth()+3)/3), //季度
		"S"  : date.getMilliseconds()             //毫秒
	};
	if(/(y+)/.test(fmt)) {
		fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("("+ k +")").test(fmt)){
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
		}
	}
	return fmt;
}

//放大缩小窗口
utils.Fullscreen = ()=>{
    var isFull=!!(document.webkitIsFullScreen || document.mozFullScreen || 
        document.msFullscreenElement || document.fullscreenElement);
	if(  isFull  ){//缩小   
		if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}

	}else{//放大
		let element = document.documentElement;
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		}
	}
}

export default utils;